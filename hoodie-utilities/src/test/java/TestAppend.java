import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

public class TestAppend {


  public static void main(String[] args) throws Exception {

    Configuration conf = new Configuration();
    conf.set("fs.igfs.impl", "org.apache.ignite.hadoop.fs.v1.IgniteHadoopFileSystem");
    conf.set("fs.defaultFS", "igfs://igfs@/");
    FileSystem fs = FileSystem.get(conf);

    Path testFolder = new Path("igfs:///appendtest");
    fs.delete(testFolder, true);
    fs.mkdirs(testFolder);

    Path appendFile = new Path(testFolder, "testfile");
    fs.create(appendFile, true).close();

    // open, append, close
    for (int i = 0; i < 200; i++) {
      FSDataOutputStream dos = fs.append(appendFile);
      PrintStream appendStream = new PrintStream(dos);
      appendStream.println("test line:" + i);
      appendStream.flush();
      dos.hsync();
      dos.hflush();
      dos.close();
    }

    FileStatus[] statuses = fs.listStatus(testFolder);

    BufferedReader reader = new BufferedReader(new InputStreamReader(fs.open(appendFile)));
    String line = null;
    while ((line = reader.readLine()) != null) {
      System.out.println(line);
    }
  }

}
