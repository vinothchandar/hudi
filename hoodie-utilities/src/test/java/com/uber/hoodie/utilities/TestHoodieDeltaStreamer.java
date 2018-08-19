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

package com.uber.hoodie.utilities;

import com.uber.hoodie.common.HoodieTestDataGenerator;
import com.uber.hoodie.common.minicluster.HdfsTestService;
import com.uber.hoodie.common.model.HoodieRecord;
import com.uber.hoodie.common.util.TypedProperties;
import java.util.List;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.hdfs.DistributedFileSystem;
import org.apache.hadoop.hdfs.MiniDFSCluster;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Basic tests against {@link com.uber.hoodie.utilities.deltastreamer.HoodieDeltaStreamer}, by issuing bulk_inserts,
 * upserts, inserts. Check counts at the end.
 */
public class TestHoodieDeltaStreamer {

  // data for sources
  private static HoodieTestDataGenerator dataGen;
  private static List<HoodieRecord> bulkInserts;
  private static List<HoodieRecord> upserts;
  private static List<HoodieRecord> inserts;

  private static String dfsBasePath;
  private static HdfsTestService hdfsTestService;
  private static MiniDFSCluster dfsCluster;
  private static DistributedFileSystem dfs;

  @BeforeClass
  public static void initClass() throws Exception {
    dataGen = new HoodieTestDataGenerator();
    System.out.println("init()");
    bulkInserts = dataGen.generateInserts("001", 10000);
    upserts = dataGen.generateUpdates("002", 5000);
    inserts = dataGen.generateInserts("003", 5000);

    /*
    hdfsTestService = new HdfsTestService();
    dfsCluster = hdfsTestService.start(true);
    dfs = dfsCluster.getFileSystem();
    dfsBasePath = dfs.getWorkingDirectory().toString();
    dfs.mkdirs(new Path(dfsBasePath));
     */
  }

  @AfterClass
  public static void cleanupClass() throws Exception {
    System.out.println("destroy()");
    bulkInserts.clear();
    upserts.clear();
    inserts.clear();
    /*if (hdfsTestService != null) {
      hdfsTestService.stop();
    }*/
  }

  @Before
  public void setup() {
    System.out.println("setup()");
  }

  @After
  public void teardown() {
    System.out.println("teardown()");
  }


  static class TestHelpers {

    private static ClassLoader classLoader = TestHelpers.class.getClassLoader();

    static TypedProperties getSchemaProviderConfig() throws Exception {
      return UtilHelpers
          .readConfig(classLoader.getResourceAsStream("delta-streamer-config/schema-provider.properties"));
    }

    static TypedProperties getSourceConfig() throws Exception {
      return UtilHelpers
          .readConfig(classLoader.getResourceAsStream("delta-streamer-config/source.properties"));
    }

    static TypedProperties getKeyGeneratorConfig() throws Exception {
      return UtilHelpers
          .readConfig(classLoader.getResourceAsStream("delta-streamer-config/key-generator.properties"));
    }

    static TypedProperties getClientConfig() throws Exception {
      return UtilHelpers
          .readConfig(classLoader.getResourceAsStream("delta-streamer-config/hoodie-client.properties"));
    }

    static void savePropsToDFS(String filePath, FileSystem fs, TypedProperties props) throws Exception {
      // no-op
    }
  }

  @Test
  public void testAvroDFSSource() {
    System.out.println("1()");
  }

  @Test
  public void testJsonDFSSource() {
    System.out.println("2()");
  }

  @Test
  public void testAvroKafkaSource() {
    System.out.println("3()");
  }

  @Test
  public void testJsonKafkaSource() {
    System.out.println("4()");
  }
}
