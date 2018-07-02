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

package com.uber.hoodie.utilities.parallelmerge;

import com.beust.jcommander.IStringConverter;
import com.beust.jcommander.JCommander;
import com.beust.jcommander.Parameter;
import com.beust.jcommander.ParameterException;
import com.uber.hoodie.common.util.FSUtils;
import com.uber.hoodie.exception.HoodieException;
import com.uber.hoodie.func.ParquetReaderIterator;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.IndexedRecord;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.parquet.avro.AvroParquetReader;
import org.apache.parquet.avro.AvroParquetWriter;
import org.apache.parquet.avro.AvroReadSupport;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.spark.sql.SparkSession;

/**
 * Proof of concept implementation for parallel sort-mereg performance instead of hash merging the base and log files.
 *
 * Sample usage : java -cp $SPARK_HOME/jars/*:target/hoodie-utilities-0.4.3-SNAPSHOT-bin.jar \
 * com.uber.hoodie.utilities.parallelmerge.ParallelParquetMergeTest --command DATAGEN
 */
public class ParallelParquetMergeTest {

  enum Command {
    DATAGEN,
    BASE_READ,
    ALL_READ,
    INTERLEAVED_READ,
    MERGED_READ,
    PARALLEL_MERGED_READ
  }

  public class OutputConverter implements IStringConverter<Command> {

    @Override
    public Command convert(String value) {
      Command convertedValue = Command.valueOf(value);
      if (convertedValue == null) {
        throw new ParameterException("Value " + value + "can not be converted to Command enum. ");
      }
      return convertedValue;
    }
  }

  static class Config implements Serializable {

    @Parameter(names = {"--target-dir"})
    public String targetDir = "/tmp/merge-test";

    @Parameter(names = {"--num-records"})
    public Integer numRecords = 100000;

    @Parameter(names = {"--num-log-files"})
    public Integer numLogFiles = 4;

    @Parameter(names = {"--col-list"})
    public List<String> colList;

    @Parameter(names = {"--command"}, required = true)
    public Command command;

    @Parameter(names = {"--help", "-h"}, help = true)
    public Boolean help = false;
  }

  /**
   */
  private static ParquetReaderIterator<IndexedRecord> getParquetIterator(Configuration configuration, Path filePath,
      Schema projectedSchema) throws IOException {
    AvroReadSupport.setAvroReadSchema(configuration, projectedSchema);
    AvroReadSupport.setRequestedProjection(configuration, projectedSchema);
    ParquetReader<IndexedRecord> reader = AvroParquetReader.builder(filePath).withConf(configuration).build();
    return new ParquetReaderIterator(reader);
  }

  private static Schema generateProjectionSchema(Schema writeSchema, List<String> fieldNames) {
    List<Schema.Field> projectedFields = new ArrayList<>();
    for (String fn : fieldNames) {
      Schema.Field field = writeSchema.getField(fn);
      if (field == null) {
        throw new HoodieException("Field " + fn + " not found in schema. Query cannot proceed!");
      }
      projectedFields
          .add(new Schema.Field(field.name(), field.schema(), field.doc(), field.defaultValue()));
    }

    Schema schema = Schema.createRecord(writeSchema.getName(), "", "", false);
    schema.setFields(projectedFields);
    return schema;
  }

  private static FileStatus[] getParquetFilesForRead(FileSystem fs, Path targetDirPath) throws IOException {
    return fs.globStatus(new Path(targetDirPath, "*/*.parquet"));
  }

  public static void generateParquetFiles(FileSystem fs, Schema schema, Path targetDirPath, Config cfg)
      throws Exception {

    SparkSession spark = SparkSession.builder().master("local[4]").getOrCreate();

    if (fs.exists(targetDirPath)) {
      fs.delete(targetDirPath, true);
    }

    // Generate some data and split it amongst the log files
    SampleTripGenerator tripGenerator = new SampleTripGenerator(schema);
    AvroParquetWriter<GenericRecord>[] writers = new AvroParquetWriter[cfg.numLogFiles];
    for (int i = 0; i < cfg.numLogFiles; i++) {
      writers[i] = new AvroParquetWriter<>(new Path(targetDirPath, i + "-log-unsorted.parquet"), schema);
    }
    for (int i = 0; i < cfg.numRecords; i++) {
      int wInd = i % cfg.numLogFiles;
      GenericRecord rec = tripGenerator.nextAvroRecord();
      writers[wInd].write(rec);
    }
    for (int i = 0; i < cfg.numLogFiles; i++) {
      // sort and save each parquet file
      writers[i].close();
      spark.read().parquet(new Path(targetDirPath, i + "-log-unsorted.parquet").toString()).sort("trip_uuid")
          .coalesce(1).write().format("parquet").save(new Path(targetDirPath, "log-" + i).toString());
    }

    // generate a base sorted file
    spark.read().parquet(targetDirPath.toString() + "/*/*.parquet").sort("trip_uuid")
        .coalesce(1).write().format("parquet").save(new Path(targetDirPath, "base").toString());
    spark.close();
  }

  private static long consumeIterator(Iterator itr, long limit) {
    long count = 0;
    while (itr.hasNext()) {
      itr.next();
      count++;
      if (count >= limit) {
        break;
      }
    }
    return count;
  }

  private static long consumeIterator(Iterator itr) {
    return consumeIterator(itr, Long.MAX_VALUE);
  }


  public static void main(String[] args) throws Exception {
    final Config cfg = new Config();
    JCommander cmd = new JCommander(cfg, args);
    if (cfg.help) {
      cmd.usage();
      System.exit(1);
    }

    // Initialization
    InputStream is = ParallelParquetMergeTest.class
        .getClassLoader().getResourceAsStream("hoodie-sample-schema.avsc");
    Schema schema = new Schema.Parser().parse(is);

    Path targetDirPath = new Path(cfg.targetDir);
    FileSystem fs = FSUtils.getFs(targetDirPath.toString(), new Configuration());

    if (cfg.command == Command.DATAGEN) {
      generateParquetFiles(fs, schema, targetDirPath, cfg);
    } else {

      FileStatus[] parquetFiles = getParquetFilesForRead(fs, targetDirPath);
      Path baseFilePath = null;
      for (FileStatus fileStatus : parquetFiles) {
        if (fileStatus.getPath().getParent().getName().contains("base")) {
          baseFilePath = fileStatus.getPath();
        }
      }
      System.out.println(baseFilePath);
      Schema projectedSchema = generateProjectionSchema(schema, cfg.colList);
      List<ParquetReaderIterator<IndexedRecord>> readerList = new ArrayList<>();
      for (FileStatus status : parquetFiles) {
        readerList.add(getParquetIterator(fs.getConf(), status.getPath(), projectedSchema));
      }

      long startMs = System.currentTimeMillis();
      if (cfg.command == Command.BASE_READ) {
        ParquetReaderIterator<IndexedRecord> readerItr = getParquetIterator(fs.getConf(),
            baseFilePath,
            projectedSchema);
        System.out.println("Read " + consumeIterator(readerItr) + " base rows");
        readerItr.close();
      } else if (cfg.command == Command.ALL_READ) {
        long count = 0;
        for (ParquetReaderIterator<IndexedRecord> reader : readerList) {
          count += consumeIterator(reader);
          reader.close();
        }
        System.out.println("Read " + count + " all rows");
      } else if (cfg.command == Command.INTERLEAVED_READ) {
        final long batchSize = 2;
        while (readerList.size() > 0) {
          Iterator<ParquetReaderIterator<IndexedRecord>> rdrItr = readerList.iterator();
          while (rdrItr.hasNext()) {
            long count = consumeIterator(rdrItr.next(), batchSize);
            if (count < batchSize) {
              rdrItr.remove();
            }
          }
        }
      } else if (cfg.command == Command.MERGED_READ) {
        ParquetSortMergeIterator mergeIterator = new ParquetSortMergeIterator("trip_uuid", readerList);
        System.out.println("Read " + consumeIterator(mergeIterator) + " merged rows");
      } else if (cfg.command == Command.PARALLEL_MERGED_READ) {
        ParquetParallelSortMergeIterator mergeIterator = new ParquetParallelSortMergeIterator("trip_uuid", readerList);
        System.out.println("Read " + consumeIterator(mergeIterator) + " parallel merged rows");
      } else {
        System.err.println("Unrecognized command :" + cfg.command);
      }
      System.out.println("Elapsed (ms): " + (System.currentTimeMillis() - startMs));
    }
  }
}
