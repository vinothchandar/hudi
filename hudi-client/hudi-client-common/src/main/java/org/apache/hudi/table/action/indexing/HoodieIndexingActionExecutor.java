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

package org.apache.hudi.table.action.indexing;

import org.apache.hudi.avro.model.HoodieIndexingMetadata;
import org.apache.hudi.avro.model.HoodieIndexingPlan;
import org.apache.hudi.common.config.SerializableConfiguration;
import org.apache.hudi.common.data.HoodieData;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.HoodieTableMetaClient;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.table.timeline.TimelineMetadataUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ValidationUtils;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieException;
import org.apache.hudi.metadata.HoodieBackedTableMetadataWriter;
import org.apache.hudi.metadata.HoodieMetadataPayload;
import org.apache.hudi.metadata.MetadataPartitionType;
import org.apache.hudi.table.HoodieTable;
import org.apache.hudi.table.action.BaseActionExecutor;

import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import static org.apache.hudi.metadata.HoodieTableMetadata.METADATA_TABLE_NAME_SUFFIX;
import static org.apache.hudi.metadata.HoodieTableMetadata.INIT_COMMIT_TIMESTAMP;

public class HoodieIndexingActionExecutor<T extends HoodieRecordPayload, I, K, O> extends BaseActionExecutor<T, I, K, O, HoodieIndexingMetadata> {

  private static final Logger LOG = LogManager.getLogger(HoodieIndexingActionExecutor.class);

  protected String tableName;
  private HoodieWriteConfig metadataWriteConfig;

  public HoodieIndexingActionExecutor(HoodieEngineContext context,
                                      HoodieWriteConfig config,
                                      HoodieTable<T, I, K, O> table,
                                      String instantTime) {
    super(context, config, table, instantTime);
    this.tableName = config.getTableName() + METADATA_TABLE_NAME_SUFFIX;
    this.metadataWriteConfig = HoodieBackedTableMetadataWriter.createMetadataWriteConfig(tableName, config);
  }

  @Override
  public HoodieIndexingMetadata execute() {
    // read out the plan for the indexing instant.
    ValidationUtils.checkArgument(table.getIndexingTimeline().filterInflightsAndRequested().containsInstant(instantTime),
        "Cannot find pending indexing instant " + instantTime);
    final HoodieInstant requestedInstant = new HoodieInstant(HoodieInstant.State.REQUESTED, HoodieTimeline.INDEXING_ACTION, instantTime);
    final HoodieTableMetaClient dataMetaClient = table.getMetaClient();
    try {
      HoodieIndexingPlan indexingPlan = TimelineMetadataUtils.deserializeIndexingPlan(
          table.getActiveTimeline().getInstantDetails(requestedInstant).get()
      );

      // List all partitions in the basePath of the containing dataset
      LOG.info("Initializing metadata table by using file listings in " + config.getBasePath());
      List<HoodieBackedTableMetadataWriter.DirectoryInfo> dirInfoList = listAllPartitions(dataMetaClient);

      // During bootstrap, the list of files to be committed can be huge. So creating a HoodieCommitMetadata out of these
      // large number of files and calling the existing update(HoodieCommitMetadata) function does not scale well.
      // Hence, we have a special commit just for the bootstrap scenario.
      bootstrapCommit(dirInfoList);
      return null;
    } catch (IOException e) {
      LOG.error("Error executing ", e);
      throw new HoodieException("Error executing indexing instant " + instantTime, e);
    }
  }

  /**
   * Function to find hoodie partitions and list files in them in parallel.
   *
   * @param datasetMetaClient data set meta client instance.
   * @return Map of partition names to a list of FileStatus for all the files in the partition
   */
  private List<HoodieBackedTableMetadataWriter.DirectoryInfo> listAllPartitions(HoodieTableMetaClient datasetMetaClient) {
    List<Path> pathsToList = new LinkedList<>();
    pathsToList.add(new Path(config.getBasePath()));

    List<HoodieBackedTableMetadataWriter.DirectoryInfo> partitionsToBootstrap = new LinkedList<>();
    final int fileListingParallelism = config.getFileListingParallelism();
    SerializableConfiguration conf = new SerializableConfiguration(datasetMetaClient.getHadoopConf());
    final String dirFilterRegex = config.getMetadataConfig().getDirectoryFilterRegex();
    final String datasetBasePath = datasetMetaClient.getBasePath();

    while (!pathsToList.isEmpty()) {
      // In each round we will list a section of directories
      int numDirsToList = Math.min(fileListingParallelism, pathsToList.size());
      // List all directories in parallel
      List<HoodieBackedTableMetadataWriter.DirectoryInfo> processedDirectories = context.map(pathsToList.subList(0,  numDirsToList), path -> {
        FileSystem fs = path.getFileSystem(conf.get());
        String relativeDirPath = FSUtils.getRelativePartitionPath(new Path(datasetBasePath), path);
        return new HoodieBackedTableMetadataWriter.DirectoryInfo(relativeDirPath, fs.listStatus(path));
      }, numDirsToList);

      pathsToList = new LinkedList<>(pathsToList.subList(numDirsToList, pathsToList.size()));

      // If the listing reveals a directory, add it to queue. If the listing reveals a hoodie partition, add it to
      // the results.
      for (HoodieBackedTableMetadataWriter.DirectoryInfo dirInfo : processedDirectories) {
        if (!dirFilterRegex.isEmpty()) {
          final String relativePath = dirInfo.getRelativePath();
          if (!relativePath.isEmpty()) {
            Path partitionPath = new Path(datasetBasePath, relativePath);
            if (partitionPath.getName().matches(dirFilterRegex)) {
              LOG.info("Ignoring directory " + partitionPath + " which matches the filter regex " + dirFilterRegex);
              continue;
            }
          }
        }

        if (dirInfo.isHoodiePartition()) {
          // Add to result
          partitionsToBootstrap.add(dirInfo);
        } else {
          // Add sub-dirs to the queue
          pathsToList.addAll(dirInfo.getSubDirectories());
        }
      }
    }
    return partitionsToBootstrap;
  }

  /**
   * This is invoked to bootstrap metadata table for a dataset. Bootstrap Commit has special handling mechanism due to its scale compared to
   * other regular commits.
   */
  private void bootstrapCommit(List<HoodieBackedTableMetadataWriter.DirectoryInfo> partitionInfoList) {
    List<String> partitions = partitionInfoList.stream().map(HoodieBackedTableMetadataWriter.DirectoryInfo::getRelativePath).collect(Collectors.toList());
    final int totalFiles = partitionInfoList.stream().mapToInt(HoodieBackedTableMetadataWriter.DirectoryInfo::getTotalFiles).sum();

    // Record which saves the list of all partitions
    HoodieRecord allPartitionRecord = HoodieMetadataPayload.createPartitionListRecord(partitions);
    if (partitions.isEmpty()) {
      // in case of boostrapping of a fresh table, there won't be any partitions, but we need to make a boostrap commit
      HoodieBackedTableMetadataWriter.commit(context.parallelize(Collections.singletonList(allPartitionRecord), 1), MetadataPartitionType.FILES.partitionPath(),
          org.apache.hudi.metadata.HoodieTableMetadata.INIT_COMMIT_TIMESTAMP, false);
      return;
    }
    HoodieData<HoodieRecord> partitionRecords = context.parallelize(Collections.singletonList(allPartitionRecord), 1);
    if (!partitionInfoList.isEmpty()) {
      HoodieData<HoodieRecord> fileListRecords = context.parallelize(partitionInfoList, partitionInfoList.size()).map(partitionInfo -> {
        // Record which saves files within a partition
        return HoodieMetadataPayload.createPartitionFilesRecord(
            partitionInfo.getRelativePath(), Option.of(partitionInfo.getFileNameToSizeMap()), Option.empty());
      });
      partitionRecords = partitionRecords.union(fileListRecords);
    }

    LOG.info("Committing " + partitions.size() + " partitions and " + totalFiles + " files to metadata");
    ValidationUtils.checkState(partitionRecords.count() == (partitions.size() + 1));
    commit(partitionRecords, MetadataPartitionType.FILES.partitionPath(), org.apache.hudi.metadata.HoodieTableMetadata.INIT_COMMIT_TIMESTAMP, false);
  }
}
