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

package org.apache.hudi.common.util;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.avro.Schema;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hudi.common.model.HoodieLogFile;
import org.apache.hudi.common.table.HoodieTableMetaClient;
import org.apache.hudi.common.table.HoodieTimeline;
import org.apache.hudi.common.table.log.HoodieLogFormat;
import org.apache.hudi.common.table.log.HoodieLogFormat.Reader;
import org.apache.hudi.common.table.log.block.HoodieAvroDataBlock;
import org.apache.hudi.common.table.log.block.HoodieLogBlock;
import org.apache.hudi.common.table.log.block.HoodieLogBlock.BlockMetadataType;
import org.apache.hudi.common.table.timeline.HoodieActiveTimeline;


/**
 * Utils class for performing various log file reading operations
 */
public class LogReaderUtils {

  public static Schema readLatestSchemaFromLogFiles(String basePath, List<String> deltaFilePaths, JobConf jobConf)
      throws IOException {
    HoodieTableMetaClient metaClient = new HoodieTableMetaClient(jobConf, basePath);
    Map<BlockMetadataType, String> blockMetadata = readLatestMetadataFromLogFiles(
        deltaFilePaths.stream().map(s -> new HoodieLogFile(new Path(s))),
        metaClient, HoodieAvroDataBlock::getLogBlockHeader);

    if (blockMetadata != null) {
      return new Schema.Parser().parse(blockMetadata.get(BlockMetadataType.SCHEMA));
    }
    return null;
  }

  private static Map<BlockMetadataType, String> readLatestMetadataFromLogFileInReverse(
      FileSystem fs, HoodieActiveTimeline activeTimeline, Path path,
      Function<HoodieAvroDataBlock, Map<BlockMetadataType, String>> extractorFn)
      throws IOException {
    try (Reader reader = HoodieLogFormat.newReader(fs, new HoodieLogFile(path), null, true, true)) {
      HoodieTimeline completedTimeline = activeTimeline.getCommitsTimeline()
          .filterCompletedInstants();
      while (reader.hasPrev()) {
        HoodieLogBlock block = reader.prev();
        if (block instanceof HoodieAvroDataBlock && block != null) {
          HoodieAvroDataBlock lastBlock = (HoodieAvroDataBlock) block;
          if (completedTimeline
              .containsOrBeforeTimelineStarts(
                  lastBlock.getLogBlockHeader().get(BlockMetadataType.INSTANT_TIME))) {
            return extractorFn.apply(lastBlock);
          }
        }
      }
    }
    return null;
  }

  public static Map<BlockMetadataType, String> readLatestMetadataFromLogFiles(
      Stream<HoodieLogFile> deltaFilePaths, HoodieTableMetaClient metaClient,
      Function<HoodieAvroDataBlock, Map<BlockMetadataType, String>> extractorFn)
      throws IOException {
    List<HoodieLogFile> sortedDeltaPaths = deltaFilePaths.sorted(HoodieLogFile.getReverseLogFileComparator())
        .collect(Collectors.toList());
    if (sortedDeltaPaths.size() > 0) {
      for (HoodieLogFile logPath : sortedDeltaPaths) {
        FileSystem fs = metaClient.getFs();
        Map<BlockMetadataType, String> metadataMap = readLatestMetadataFromLogFileInReverse(
            fs, metaClient.getActiveTimeline(), logPath.getPath(), extractorFn);
        if (metadataMap != null) {
          return metadataMap;
        }
      }
    }
    return null;
  }
}
