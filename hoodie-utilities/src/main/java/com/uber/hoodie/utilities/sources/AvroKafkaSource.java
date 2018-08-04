/*
 *  Copyright (c) 2017 Uber Technologies, Inc. (hoodie-dev-group@uber.com)
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

package com.uber.hoodie.utilities.sources;

import com.uber.hoodie.utilities.schema.SchemaProvider;
import io.confluent.kafka.serializers.KafkaAvroDecoder;
import kafka.serializer.StringDecoder;
import org.apache.avro.generic.GenericRecord;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.apache.spark.streaming.kafka.OffsetRange;

/**
 * Reads avro serialized Kafka data, based on the confluent schema-registry
 */
public class AvroKafkaSource extends KafkaSource {

  public AvroKafkaSource(PropertiesConfiguration config, JavaSparkContext sparkContext, SchemaProvider schemaProvider) {
    super(config, sparkContext, schemaProvider);
  }

  @Override
  protected JavaRDD<GenericRecord> toAvroRDD(OffsetRange[] offsetRanges, AvroConvertor avroConvertor) {
    JavaRDD<GenericRecord> recordRDD = KafkaUtils
        .createRDD(sparkContext, String.class, Object.class, StringDecoder.class, KafkaAvroDecoder.class, kafkaParams,
            offsetRanges).values().map(obj -> (GenericRecord) obj);
    return recordRDD;
  }
}
