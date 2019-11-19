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

package org.apache.hudi.io;

import java.io.IOException;
import java.util.Map;
import org.apache.hadoop.fs.Path;
import org.apache.hudi.common.BloomFilter;
import org.apache.hudi.common.model.FileSlice;
import org.apache.hudi.common.model.HoodieDataFile;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.model.HoodieTableType;
import org.apache.hudi.common.table.log.block.HoodieAvroDataBlock;
import org.apache.hudi.common.table.log.block.HoodieLogBlock.BlockMetadataType;
import org.apache.hudi.common.util.LogReaderUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ParquetUtils;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.exception.HoodieNotSupportedException;
import org.apache.hudi.index.bloom.IndexInfo;
import org.apache.hudi.table.HoodieTable;

/**
 * Extract all the index information out of the latest file slice for the given file group id
 * and partition path.
 */
public class HoodieIndexInfoHandle<T extends HoodieRecordPayload> extends HoodieReadHandle<T> {

  private IndexInfo indexInfo;

  public HoodieIndexInfoHandle(HoodieWriteConfig config, HoodieTable<T> hoodieTable,
      Pair<String, String> partitionPathFilePair) {
    super(config, null, hoodieTable, partitionPathFilePair);
    this.indexInfo = new IndexInfo();
    if (hoodieTable.getMetaClient().getTableType() == HoodieTableType.MERGE_ON_READ
        && hoodieTable.getIndex().canIndexLogFiles()) {
      readIndexInfoFromLatestLogBlock();
    } else if (hoodieTable.getMetaClient().getTableType() == HoodieTableType.COPY_ON_WRITE) {
      readIndexInfoFromDataFile();
    } else {
      throw new HoodieNotSupportedException("Unknown table type");
    }
  }

  private void readIndexInfoFromDataFile() {
    HoodieDataFile dataFile = getLatestDataFile();
    Map<String, String> parquetFooters = ParquetUtils.readAllIndexInfo(
        hoodieTable.getHadoopConf(), new Path(dataFile.getPath()));
    indexInfo.setBloomFilter(ParquetUtils.readBloomFilterFromParquetFooters(parquetFooters));
    indexInfo.setMinMaxKeyRange(ParquetUtils.readMinMaxRecordKeysFromFooter(parquetFooters));
  }

  private void readIndexInfoFromLatestLogBlock() {
    // FIXME(vc): could there be a case where there is no base file and also the logs have no
    // FIXME(vc): Should we have an IndexInfo that denotes empty?
    try {
      FileSlice mergedSlice = getLatestMergedFileSlice();
        Map<BlockMetadataType, String> blockFooterMetadata = LogReaderUtils
            .readLatestMetadataFromLogFiles(mergedSlice.getLogFiles(), hoodieTable.getMetaClient(),
                HoodieAvroDataBlock::getLogBlockFooter);
        if (blockFooterMetadata != null) {
          // FIXME(VC): Need to handle the case where these headers are not present.
          indexInfo.setBloomFilter(new BloomFilter(blockFooterMetadata.get(BlockMetadataType.BLOOM_FILTER)));
          indexInfo.setMinMaxKeyRange(Option.of(Pair.of(blockFooterMetadata.get(BlockMetadataType.MIN_RECORD_KEY),
              blockFooterMetadata.get(BlockMetadataType.MAX_RECORD_KEY))));
        } else {
        readIndexInfoFromDataFile();
      }
    } catch (IOException ioe) {
      throw new HoodieIOException("Unable to read index info from log blocks.", ioe);
    }
  }

  public IndexInfo getIndexInfo() {
    return indexInfo;
  }
}
