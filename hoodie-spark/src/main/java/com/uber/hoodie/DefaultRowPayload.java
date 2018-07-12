/*
 *  Copyright (c) 2018 Uber Technologies, Inc. (hoodie-dev-group@uber.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

package com.uber.hoodie;

import com.uber.hoodie.common.model.HoodieRecordPayload;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Optional;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.IndexedRecord;
import org.apache.spark.sql.Row;
import scala.Function1;

/**
 * Base class for all custom payload implementations for the Spark datasource.
 */
public abstract class DefaultRowPayload implements Serializable, HoodieRecordPayload<DefaultRowPayload> {

  private static HashMap<String, Function1<Object, Object>> convertorMap = new HashMap<>();

  /**
   * Returns a function that can convert rows to generic records
   */
  protected Function1<Object, Object> getConvertor(Schema schema, Row row) {
    String key = String.format("%s-%s", schema.getNamespace(), schema.getName());
    if (!convertorMap.containsKey(key)) {
      convertorMap.put(key,
          AvroConversionUtils.createConverterToAvro(row.schema(), schema.getName(), schema.getNamespace()));
    }
    return convertorMap.get(key);
  }

  /**
   * Spark row, extracted from source.
   */
  protected Row row;

  /**
   * For purposes of preCombining
   */
  protected final Comparable orderingVal;


  protected DefaultRowPayload(Row row, Comparable orderingVal) {
    this.row = row;
    this.orderingVal = orderingVal;
  }

  /**
   * just return this payload. This has the effect of selecting one of the many payloads randomly during precombine
   *
   * @param another cast this to the subclass as needed, when overriding
   */
  @Override
  public DefaultRowPayload preCombine(DefaultRowPayload another) {
    return this;
  }

  @Override
  public Optional<IndexedRecord> combineAndGetUpdateValue(IndexedRecord currentValue, Schema schema)
      throws IOException {
    return getInsertValue(schema);
  }

  @Override
  public Optional<IndexedRecord> getInsertValue(Schema schema) throws IOException {
    Object rec = getConvertor(schema, row).apply(row);
    return Optional.of((GenericRecord) rec);
  }
}
