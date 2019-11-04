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

import org.apache.hadoop.fs.FileSystem;
import org.apache.hudi.common.model.FileSlice;
import org.apache.hudi.common.model.HoodieDataFile;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.TableFileSystemView.RealtimeView;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieException;
import org.apache.hudi.table.HoodieTable;

/**
 * Base class for read operations done logically on the file group.
 */
public abstract class HoodieReadHandle<T extends HoodieRecordPayload> extends HoodieIOHandle {

  protected final Pair<String, String> partitionPathFilePair;

  public HoodieReadHandle(HoodieWriteConfig config, String instantTime, HoodieTable<T> hoodieTable,
      Pair<String, String> partitionPathFilePair) {
    super(config, instantTime, hoodieTable);
    this.partitionPathFilePair = partitionPathFilePair;
  }

  @Override
  protected FileSystem getFileSystem() {
    return hoodieTable.getMetaClient().getFs();
  }

  public Pair<String, String> getPartitionPathFilePair() {
    return partitionPathFilePair;
  }

  public String getFileId() {
    return partitionPathFilePair.getRight();
  }

  protected HoodieDataFile getLatestDataFile() {
    return hoodieTable.getROFileSystemView()
        .getLatestDataFile(partitionPathFilePair.getLeft(), partitionPathFilePair.getRight()).get();
  }

  protected FileSlice getLatestMergedFileSlice() {
    HoodieInstant lastInstant = hoodieTable.getMetaClient().getCommitsAndCompactionTimeline().lastInstant().get();
    RealtimeView rtView = hoodieTable.getRTFileSystemView();
    Option<FileSlice> fileSliceOpt = Option.fromJavaOptional(
        rtView.getLatestMergedFileSlicesBeforeOrOn(partitionPathFilePair.getLeft(), lastInstant.getTimestamp())
            .filter(slice -> slice.getFileId().equals(partitionPathFilePair.getRight())).findFirst());
    return fileSliceOpt.orElseThrow(() ->
        new HoodieException("Unable to find a file slice for partition path/file group :" + partitionPathFilePair));
  }

}
