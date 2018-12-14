package com.uber.hoodie.utilities;

import org.apache.avro.generic.GenericRecord;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.parquet.avro.AvroParquetWriter;

public class LogParquet {

  public static void main(String[] args) throws Exception {

    AvroParquetWriter<GenericRecord> writer;

    ByteArrayFileSystem bfs = new ByteArrayFileSystem();

    FSDataOutputStream dos = bfs.create(null, null, true, 0, Short.valueOf("0"), 0L, null);

    String hello = "hello";

    dos.writeBytes(hello);

    System.out.println(new String(bfs.getFileAsBytes()));


  }
}
