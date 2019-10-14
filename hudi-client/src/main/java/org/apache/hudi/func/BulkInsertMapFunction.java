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

package org.apache.hudi.func;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import org.apache.avro.Schema;
import org.apache.hudi.WriteStatus;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.io.HoodieCreateHandle;
import org.apache.hudi.io.HoodieWriteHandle;
import org.apache.hudi.table.HoodieTable;
import org.apache.spark.api.java.function.Function2;


/**
 * Map function that takes an iterator of HoodieRecords, write them out to storage per insert
 * semantics.
 *
 * By default, we have N open writers one for each partition involved.
 * if sortMode = true, then the incoming iterator is already sorted such that adjacent records
 * belong to the same partition and thus reducing memory pressure significantly.
 *
 */
public class BulkInsertMapFunction<T extends HoodieRecordPayload> implements
    Function2<Integer, Iterator<HoodieRecord<T>>, Iterator<List<WriteStatus>>> {

  private String commitTime;
  private HoodieWriteConfig config;
  private HoodieTable<T> hoodieTable;
  private List<String> fileIDPrefixes;
  private boolean sortMode;

  private Map<String, CopyOnWriteInsertHandler> parallelWritersMap;
  private AtomicInteger fileCounter;
  private String idPrefix;
  private Schema schema;



  protected String getNextFileId(String idPfx) {
    return String.format("%s-%d", idPfx, fileCounter.getAndIncrement());
  }


  class CopyOnWriteInsertHandler {

    protected final List<WriteStatus> statuses = new ArrayList<>();
    protected HoodieWriteHandle handle;

    protected void consumeOneRecord(HoodieRecord insertRecord) throws IOException {
      // lazily initialize the handle, for the first time
      if (handle == null) {
        handle = new HoodieCreateHandle(config, commitTime, hoodieTable, insertRecord.getPartitionPath(),
            getNextFileId(idPrefix));
      }

      if (handle.canWrite(insertRecord)) {
        // write the payload, if the handle has capacity
        handle.write(insertRecord, insertRecord.getData().getInsertValue(schema));
      } else {
        // handle is full.
        statuses.add(handle.close());
        // Need to handle the rejected payload & open new handle
        handle = new HoodieCreateHandle(config, commitTime, hoodieTable, insertRecord.getPartitionPath(),
            getNextFileId(idPrefix));
        handle.write(insertRecord, insertRecord.getData().getInsertValue(schema));
      }
    }

    protected  List<WriteStatus> finish() {
      if (handle != null) {
        statuses.add(handle.close());
      }
      handle = null;
      assert statuses.size() > 0;
      return statuses;
    }
  }

  public BulkInsertMapFunction(String commitTime, HoodieWriteConfig config,
      HoodieTable<T> hoodieTable, List<String> fileIDPrefixes, boolean sortMode) {
    this.commitTime = commitTime;
    this.config = config;
    this.hoodieTable = hoodieTable;
    this.fileIDPrefixes = fileIDPrefixes;
    this.sortMode = sortMode;
    this.parallelWritersMap = new HashMap<>();
    this.fileCounter = new AtomicInteger();
  }

  @Override
  public Iterator<List<WriteStatus>> call(Integer partition, Iterator<HoodieRecord<T>> recordIterator) {
    if (sortMode) {
      return new CopyOnWriteLazyInsertIterable<>(recordIterator, config, commitTime, hoodieTable,
          fileIDPrefixes.get(partition));
    } else {
      this.idPrefix = fileIDPrefixes.get(partition);
      this.schema = new Schema.Parser().parse(config.getSchema());
      while (recordIterator.hasNext()) {
        HoodieRecord<T> hoodieRecord = recordIterator.next();
        if (!parallelWritersMap.containsKey(hoodieRecord.getPartitionPath())) {
          parallelWritersMap.put(hoodieRecord.getPartitionPath(), new CopyOnWriteInsertHandler());
        }
        try {
          parallelWritersMap.get(hoodieRecord.getPartitionPath()).consumeOneRecord(hoodieRecord);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }

      List<List<WriteStatus>> statuses = new ArrayList<>();
      for (CopyOnWriteInsertHandler handler : parallelWritersMap.values()) {
        statuses.add(handler.finish());
      }
      return statuses.iterator();
    }
  }
}
