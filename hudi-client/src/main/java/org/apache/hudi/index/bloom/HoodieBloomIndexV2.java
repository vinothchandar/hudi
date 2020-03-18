/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.index.bloom;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.hudi.client.WriteStatus;
import org.apache.hudi.client.utils.LazyIterableIterator;
import org.apache.hudi.common.bloom.filter.BloomFilter;
import org.apache.hudi.common.model.HoodieBaseFile;
import org.apache.hudi.common.model.HoodieKey;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.HoodieRecordLocation;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.util.DefaultSizeEstimator;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.ExternalSpillableMap;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.index.HoodieIndex;
import org.apache.hudi.io.HoodieBloomRangeInfoHandle;
import org.apache.hudi.io.HoodieKeyLookupHandle;
import org.apache.hudi.table.HoodieTable;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

/**
 * Simplified re-implementation of {@link HoodieBloomIndex} that does not rely on caching, or
 * incurs the overhead of auto-tuning parallelism.
 */
public class HoodieBloomIndexV2<T extends HoodieRecordPayload> extends HoodieIndex<T> {

  private static final Logger LOG = LogManager.getLogger(HoodieBloomIndexV2.class);

  public HoodieBloomIndexV2(HoodieWriteConfig config) {
    super(config);
  }

  /**
   * Given an iterator of hoodie records, returns a pair of candidate HoodieRecord, FileID pairs.
   */
  class LazyRangeBloomChecker extends
      LazyIterableIterator<HoodieRecord<T>, List<Pair<HoodieRecord<T>, String>>> {

    private HoodieTable<T> table;
    private String currentPartitionPath;
    private Set<String> fileIDs;
    private IndexFileFilter indexFileFilter;
    private ExternalSpillableMap<String, BloomFilter> fileIDToBloomFilter;

    public LazyRangeBloomChecker(Iterator<HoodieRecord<T>> in, final HoodieTable<T> table) {
      super(in);
      this.table = table;
    }

    private void cleanup() {
      if (this.fileIDToBloomFilter != null) {
        this.fileIDToBloomFilter.clear();
      }
    }

    private void populateFileIDs() {
      Option<HoodieInstant> latestCommitTime = table.getMetaClient().getCommitsTimeline().filterCompletedInstants().lastInstant();
      this.fileIDs = latestCommitTime.map(commitTime ->
        table.getBaseFileOnlyView()
            .getLatestBaseFilesBeforeOrOn(currentPartitionPath, commitTime.getTimestamp())
            .map(HoodieBaseFile::getFileId)
            .collect(Collectors.toSet())
      ).orElse(Collections.EMPTY_SET);
    }

    private void populateRangeAndBloomFilters() throws IOException {
      this.fileIDToBloomFilter = new ExternalSpillableMap<>(1000000000L,
          config.getSpillableMapBasePath(), new DefaultSizeEstimator<>(), new DefaultSizeEstimator<>());
      List<BloomIndexFileInfo> fileInfos = fileIDs.stream().map(fileID -> {
        HoodieBloomRangeInfoHandle<T> indexMetadataHandle = new HoodieBloomRangeInfoHandle<T>(
            config, table, Pair.of(currentPartitionPath, fileID));
        this.fileIDToBloomFilter.put(fileID, indexMetadataHandle.getBloomFilter());
        return indexMetadataHandle.getRangeInfo();
      }).collect(Collectors.toList());
      this.indexFileFilter = new IntervalTreeBasedIndexFileFilter(Collections.singletonMap(currentPartitionPath, fileInfos));
    }

    private void initIfNeeded(String partitionPath) throws IOException {
      if (!Objects.equals(partitionPath, currentPartitionPath)) {
        cleanup();
        this.currentPartitionPath = partitionPath;
        populateFileIDs();
        populateRangeAndBloomFilters();
      }
    }

    @Override
    protected void start() {}

    @Override
    protected List<Pair<HoodieRecord<T>, String>> computeNext() {
      List<Pair<HoodieRecord<T>, String>> candidates = new ArrayList<>();
      if (inputItr.hasNext()) {
        HoodieRecord<T> record = inputItr.next();
        try {
          initIfNeeded(record.getPartitionPath());
        } catch (IOException e) {
          throw new HoodieIOException(
              "Error reading index metadata for " + record.getPartitionPath(), e);
        }

        indexFileFilter
            .getMatchingFilesAndPartition(record.getPartitionPath(), record.getRecordKey())
            .forEach(partitionFileIdPair -> {
              BloomFilter filter = fileIDToBloomFilter.get(partitionFileIdPair.getRight());
              if (filter.mightContain(record.getRecordKey())) {
                candidates.add(Pair.of(record, partitionFileIdPair.getRight()));
              }
            });

        if (candidates.size() == 0) {
          candidates.add(Pair.of(record, ""));
        }
      }

      return candidates;
    }

    @Override
    protected void end() {
      cleanup();
    }
  }

  class LazyKeyChecker extends LazyIterableIterator<Pair<HoodieRecord<T>, String>, Option<HoodieRecord<T>>> {

    private HoodieKeyLookupHandle<T> currHandle = null;
    private HoodieTable<T> table;

    public LazyKeyChecker(Iterator<Pair<HoodieRecord<T>, String>> in, HoodieTable<T> table) {
      super(in);
      this.table = table;
    }

    @Override
    protected void start() {}

    @Override
    protected Option<HoodieRecord<T>> computeNext() {
      if (!inputItr.hasNext()) {
        return Option.empty();
      }

      final Pair<HoodieRecord<T>, String> recordAndFileId = inputItr.next();
      final Option<String> fileIdOpt = recordAndFileId.getRight().length() > 0
          ? Option.of(recordAndFileId.getRight())
          : Option.empty();
      final HoodieRecord<T> record = recordAndFileId.getLeft();
      return fileIdOpt.map(fileId -> {
        if (currHandle == null || !currHandle.getFileId().equals(fileId)) {
          currHandle = new HoodieKeyLookupHandle<>(config, table, Pair.of(record.getPartitionPath(), fileId));
        }
        Option<HoodieRecordLocation> location = currHandle.containsKey(record.getRecordKey())
            ? Option.of(new HoodieRecordLocation(currHandle.getBaseInstantTime(), currHandle.getFileId()))
            : Option.empty();
        return Option.of(getTaggedRecord(record, location));
      }).orElse(Option.of(record));
    }

    @Override
    protected void end() {}
  }

  @Override
  public JavaRDD<HoodieRecord<T>> tagLocation(JavaRDD<HoodieRecord<T>> recordRDD,
                                              JavaSparkContext jsc,
                                              HoodieTable<T> hoodieTable) {
    return recordRDD.sortBy((record) -> String.format("%s-%s", record.getPartitionPath(), record.getRecordKey()),
        true, config.getBloomIndexV2Parallelism())
        .mapPartitions((itr) -> new LazyRangeBloomChecker(itr, hoodieTable))
        .flatMap(List::iterator)
        .sortBy(Pair::getRight, true, config.getBloomIndexV2Parallelism())
        .mapPartitions((itr) -> new LazyKeyChecker(itr, hoodieTable))
        .filter(Option::isPresent)
        .map(Option::get);
  }

  @Override
  public JavaPairRDD<HoodieKey, Option<Pair<String, String>>> fetchRecordLocation(JavaRDD<HoodieKey> hoodieKeys,
      JavaSparkContext jsc, HoodieTable<T> hoodieTable) {
    throw new UnsupportedOperationException("Not yet implemented");
  }

  @Override
  public boolean rollbackCommit(String commitTime) {
    // Nope, don't need to do anything.
    return true;
  }

  /**
   * This is not global, since we depend on the partitionPath to do the lookup.
   */
  @Override
  public boolean isGlobal() {
    return false;
  }

  /**
   * No indexes into log files yet.
   */
  @Override
  public boolean canIndexLogFiles() {
    return false;
  }

  /**
   * Bloom filters are stored, into the same data files.
   */
  @Override
  public boolean isImplicitWithStorage() {
    return true;
  }

  HoodieRecord<T> getTaggedRecord(HoodieRecord<T> inputRecord, Option<HoodieRecordLocation> location) {
    HoodieRecord<T> record = inputRecord;
    if (location.isPresent()) {
      // When you have a record in multiple files in the same partition, then rowKeyRecordPairRDD
      // will have 2 entries with the same exact in memory copy of the HoodieRecord and the 2
      // separate filenames that the record is found in. This will result in setting
      // currentLocation 2 times and it will fail the second time. So creating a new in memory
      // copy of the hoodie record.
      record = new HoodieRecord<>(inputRecord);
      record.unseal();
      record.setCurrentLocation(location.get());
      record.seal();
    }
    return record;
  }

  @Override
  public JavaRDD<WriteStatus> updateLocation(JavaRDD<WriteStatus> writeStatusRDD, JavaSparkContext jsc,
                                             HoodieTable<T> hoodieTable) {
    return writeStatusRDD;
  }
}
