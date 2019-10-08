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

import java.io.FileDescriptor;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;
import org.apache.avro.generic.GenericRecord;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.ByteBufferReadable;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.PositionedReadable;
import org.apache.hadoop.fs.ReadOption;
import org.apache.hadoop.fs.Seekable;
import org.apache.hadoop.io.ByteBufferPool;
import org.apache.hudi.common.HoodieTestDataGenerator;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.parquet.avro.AvroParquetReader;
import org.apache.parquet.avro.AvroParquetWriter;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.util.Progressable;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.parquet.hadoop.metadata.CompressionCodecName;

public class ParquetLogging {



  public static class InlineFsDataInputStream extends FSDataInputStream {

    private final int startOffset;
    private final FSDataInputStream outerStream;
    private final int length;

    public InlineFsDataInputStream(int startOffset, FSDataInputStream outerStream, int length) {
      super(outerStream.getWrappedStream());
      this.startOffset = startOffset;
      this.outerStream = outerStream;
      this.length = length;
    }

    @Override
    public void seek(long desired) throws IOException {
      outerStream.seek(startOffset + desired);
    }

    @Override
    public long getPos() throws IOException {
      return outerStream.getPos() - startOffset;
    }

    @Override
    public int read(long position, byte[] buffer, int offset, int length) throws IOException {
      return outerStream.read(startOffset + position, buffer, offset, length);
    }

    @Override
    public void readFully(long position, byte[] buffer, int offset, int length) throws IOException {
      outerStream.readFully(startOffset + position, buffer, offset, length);
    }

    @Override
    public void readFully(long position, byte[] buffer)
        throws IOException {
      outerStream.readFully(startOffset + position, buffer, 0, buffer.length);
    }

    @Override
    public boolean seekToNewSource(long targetPos) throws IOException {
      return outerStream.seekToNewSource(startOffset + targetPos);
    }

    @Override
    public int read(ByteBuffer buf) throws IOException {
      return outerStream.read(buf);
    }

    @Override
    public FileDescriptor getFileDescriptor() throws IOException {
      return outerStream.getFileDescriptor();
    }

    @Override
    public void setReadahead(Long readahead) throws IOException, UnsupportedOperationException {
      outerStream.setReadahead(readahead);
    }

    @Override
    public void setDropBehind(Boolean dropBehind) throws IOException, UnsupportedOperationException {
      outerStream.setDropBehind(dropBehind);
    }

    @Override
    public ByteBuffer read(ByteBufferPool bufferPool, int maxLength, EnumSet<ReadOption> opts)
        throws IOException, UnsupportedOperationException {
      return outerStream.read(bufferPool, maxLength, opts);
    }

    @Override
    public void releaseBuffer(ByteBuffer buffer) {
      outerStream.releaseBuffer(buffer);
    }

    @Override
    public void unbuffer() {
      outerStream.unbuffer();
    }
  }



  /**
   * Enables storing any file (something that is written using using FileSystem apis) "inline" into another file
   *
   *  - Writing an inlined file at a given path, simply writes it to an in-memory buffer and returns it as byte[]
   *  - Reading an inlined file at a given offset, length, read it out as if it were an independent file of that length
   *    Inlined path is of the form "inlinefs:///path/to/outer/file/<outer_file_scheme>/<start_offset>/<length>
   *
   *  TODO: The reader/writer may try to use relative paths based on the inlinepath and it may not work. Need to handle this gracefully
   *        eg. the parquet summary metadata reading.
   *  TODO: If this shows promise, also support directly writing the inlined file to the underneath file without buffer
   */
  public static class InlineFileSystem extends FileSystem {

    public static final String SCHEME = "inlinefs";

    // TODO: this needs to be per path to support num_cores > 1, and we should release the buffer once done
    ByteArrayOutputStream bos;

    // TODO: Should probably be ThreadLocal.
    static Configuration CONF = null;

    InlineFileSystem() {
      bos = new ByteArrayOutputStream();
    }

    private FileSystem getOuterFileSystem(Path inlinePath) throws IOException {
      Path outerPath = outerPath(inlinePath);
      return outerPath.getFileSystem(CONF);
    }

    private Path outerPath(Path inlinePath) {
      String scheme = inlinePath.getParent().getParent().getName();
      Path basePath = inlinePath.getParent().getParent().getParent();
      return new Path(basePath.toString().replaceFirst(getScheme() + ":", scheme + ":"));
    }

    private int startOffset(Path inlinePath) {
      return Integer.parseInt(inlinePath.getParent().getName());
    }

    private int length(Path inlinePath) {
      return Integer.parseInt(inlinePath.getName());
    }

    @Override
    public URI getUri() {
      return URI.create(getScheme());
    }

    public String getScheme() {
      return SCHEME;
    }

    public byte[] getFileAsBytes() {
      return bos.toByteArray();
    }

    @Override
    public FSDataInputStream open(Path inlinePath, int bufferSize) throws IOException {
      FileSystem outerFs = getOuterFileSystem(inlinePath);
      FSDataInputStream outerStream = outerFs.open(outerPath(inlinePath), bufferSize);
      return new InlineFsDataInputStream(startOffset(inlinePath), outerStream, length(inlinePath));
    }

    @Override
    public FSDataOutputStream create(Path path, FsPermission fsPermission, boolean b, int i, short i1, long l,
        Progressable progressable) throws IOException {
      return new FSDataOutputStream(bos, new Statistics(getScheme()));
    }

    @Override
    public FSDataOutputStream append(Path path, int i, Progressable progressable) throws IOException {
      return null;
    }

    @Override
    public boolean rename(Path path, Path path1) throws IOException {
      throw new UnsupportedOperationException("Can't rename files");
    }

    @Override
    public boolean delete(Path path, boolean b) throws IOException {
      throw new UnsupportedOperationException("Can't delete files");
    }

    @Override
    public FileStatus[] listStatus(Path inlinePath) throws FileNotFoundException, IOException {
      return new FileStatus[] { getFileStatus(inlinePath) };
    }

    @Override
    public void setWorkingDirectory(Path path) {
      throw new UnsupportedOperationException("Can't set working directory");
    }

    @Override
    public Path getWorkingDirectory() {
      return null;
    }

    @Override
    public boolean mkdirs(Path path, FsPermission fsPermission) throws IOException {
      return false;
    }

    @Override
    public boolean exists(Path f) throws IOException {
      try {
        return getFileStatus(f) != null;
      } catch (Exception e) {
        return false;
      }
    }

    @Override
    public FileStatus getFileStatus(Path inlinePath) throws IOException {
      FileSystem outerFs = getOuterFileSystem(inlinePath);
      FileStatus status = outerFs.getFileStatus(outerPath(inlinePath));
      return new FileStatus(length(inlinePath), status.isDirectory(), status.getReplication(), status.getBlockSize(),
          status.getModificationTime(), status.getAccessTime(), status.getPermission(), status.getOwner(),
          status.getGroup(), inlinePath);
    }
  }

  public static void main(String[] args) throws Exception {

    HoodieTestDataGenerator dataGenerator = new HoodieTestDataGenerator();
    String commitTime = "001";
    List<HoodieRecord> hoodieRecords = dataGenerator.generateInsertsWithHoodieAvroPayload(commitTime, 1000);
    Path memoryBufferPath = new Path(InlineFileSystem.SCHEME + ":///tmp/file1");
    Configuration conf = new Configuration();
    conf.set("fs."+ InlineFileSystem.SCHEME + ".impl", InlineFileSystem.class.getName());

    // TODO: this is ugly, but since we don't control filesystem init, there is no way to pass this to InlineFileSystem
    // TODO: This is needed for being able to properly read the outer file based on scheme (s3, gs, hdfs etc)
    InlineFileSystem.CONF = conf;

    // Initialize parquet writer & write date
    AvroParquetWriter parquetWriter = new AvroParquetWriter(memoryBufferPath, HoodieTestDataGenerator.avroSchema,
        CompressionCodecName.GZIP, 100 *1024 * 1024, 1024 *1024, true, conf);
    for (HoodieRecord record : hoodieRecords) {
      parquetWriter.write(record.getData().getInsertValue(HoodieTestDataGenerator.avroSchema).get());
    }
    parquetWriter.close();
    InlineFileSystem inlineFs = (InlineFileSystem) memoryBufferPath.getFileSystem(conf);
    byte[] parquetBytes = inlineFs.getFileAsBytes();

    // Wrap it into a file with a 8 byte header, parquet bytes, 8 byte footer
    Path wrapperFile = new Path("file:///tmp/outerfile");
    FSDataOutputStream wrappedOut = wrapperFile.getFileSystem(conf).create(wrapperFile, true);
    wrappedOut.writeUTF("[header]");
    wrappedOut.writeInt(parquetBytes.length);
    long startOffset = wrappedOut.getPos();
    wrappedOut.write(parquetBytes);
    wrappedOut.writeUTF("[footer]");
    wrappedOut.hsync();
    wrappedOut.close();


    // Try reading it using Parquet Reader with projections etc
    Path offsetedPath = new Path(InlineFileSystem.SCHEME + ":///tmp/outerfile/file/" + startOffset + "/" + parquetBytes.length);
    FileSystem readFs = offsetedPath.getFileSystem(conf);
    FileStatus status = readFs.getFileStatus(offsetedPath);
    System.out.println(status);

    ParquetReader reader = AvroParquetReader.builder(offsetedPath).build();
    Object obj = reader.read();
    while (obj != null) {
      if (obj instanceof GenericRecord) {
        System.out.println(obj);
      }
      obj = reader.read();
    }
    reader.close();
  }
}
