"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[69384],{15680:(e,a,t)=>{t.d(a,{xA:()=>c,yg:()=>h});var n=t(96540);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=n.createContext({}),d=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},c=function(e){var a=d(e.components);return n.createElement(l.Provider,{value:a},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},g=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=d(t),g=r,h=p["".concat(l,".").concat(g)]||p[g]||u[g]||o;return t?n.createElement(h,i(i({ref:a},c),{},{components:t})):n.createElement(h,i({ref:a},c))}));function h(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=g;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[p]="string"==typeof e?e:r,i[1]=s;for(var d=2;d<o;d++)i[d]=t[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}g.displayName="MDXCreateElement"},70085:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var n=t(58168),r=(t(96540),t(15680));const o={title:"Change Capture Using AWS Database Migration Service and Hudi",excerpt:"In this blog, we will build an end-end solution for capturing changes from a MySQL instance running on AWS RDS to a Hudi table on S3, using capabilities in the Hudi 0.5.1 release.",author:"vinoth",category:"blog",image:"/assets/images/blog/change-capture-architecture.png",tags:["how-to","change data capture","cdc","apache hudi"]},i=void 0,s={permalink:"/blog/2020/01/20/change-capture-using-aws",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-01-20-change-capture-using-aws.md",source:"@site/blog/2020-01-20-change-capture-using-aws.md",title:"Change Capture Using AWS Database Migration Service and Hudi",description:"One of the core use-cases for Apache Hudi is enabling seamless, efficient database ingestion to your data lake. Even though a lot has been talked about and even users already adopting this model, content on how to go about this is sparse.",date:"2020-01-20T00:00:00.000Z",formattedDate:"January 20, 2020",tags:[{label:"how-to",permalink:"/blog/tags/how-to"},{label:"change data capture",permalink:"/blog/tags/change-data-capture"},{label:"cdc",permalink:"/blog/tags/cdc"},{label:"apache hudi",permalink:"/blog/tags/apache-hudi"}],readingTime:7.42,truncated:!0,authors:[{name:"vinoth"}],prevItem:{title:"Export Hudi datasets as a copy or as different formats",permalink:"/blog/2020/03/22/exporting-hudi-datasets"},nextItem:{title:"Delete support in Hudi",permalink:"/blog/2020/01/15/delete-support-in-hudi"}},l={authorsImageUrls:[void 0]},d=[{value:"Extracting Change logs from MySQL",id:"extracting-change-logs-from-mysql",children:[],level:3},{value:"Applying Change Logs using Hudi DeltaStreamer",id:"applying-change-logs-using-hudi-deltastreamer",children:[],level:2}],c={toc:d},p="wrapper";function u(e){let{components:a,...o}=e;return(0,r.yg)(p,(0,n.A)({},c,o,{components:a,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"One of the core use-cases for Apache Hudi is enabling seamless, efficient database ingestion to your data lake. Even though a lot has been talked about and even users already adopting this model, content on how to go about this is sparse."),(0,r.yg)("p",null,"In this blog, we will build an end-end solution for capturing changes from a MySQL instance running on AWS RDS to a Hudi table on S3, using capabilities in the Hudi  ",(0,r.yg)("strong",{parentName:"p"},"0.5.1 release")),(0,r.yg)("p",null,"We can break up the problem into two pieces."),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("strong",{parentName:"li"},"Extracting change logs from MySQL"),"  : Surprisingly, this is still a pretty tricky problem to solve and often Hudi users get stuck here. Thankfully, at-least for AWS users, there is a  ",(0,r.yg)("a",{parentName:"li",href:"https://aws.amazon.com/dms/"},"Database Migration service"),"  (DMS for short), that does this change capture and uploads them as parquet files on S3"),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("strong",{parentName:"li"},"Applying these change logs to your data lake table"),"  : Once there are change logs in some form, the next step is to apply them incrementally to your table. This mundane task can be fully automated using the Hudi  ",(0,r.yg)("a",{parentName:"li",href:"http://hudi.apache.org/docs/writing_data#deltastreamer"},"DeltaStreamer"),"  tool.")),(0,r.yg)("p",null,"The actual end-end architecture looks something like this.\n",(0,r.yg)("img",{alt:"enter image description here",src:t(67527).A})),(0,r.yg)("p",null,"Let's now illustrate how one can accomplish this using a simple ",(0,r.yg)("em",{parentName:"p"},"orders")," table, stored in MySQL (these instructions should broadly apply to other database engines like Postgres, or Aurora as well, though SQL/Syntax may change)"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"CREATE DATABASE hudi_dms;\nUSE hudi_dms;\n     \nCREATE TABLE orders(\n   order_id INTEGER,\n   order_qty INTEGER,\n   customer_name VARCHAR(100),\n   updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),\n   created_at TIMESTAMP DEFAULT NOW(),\n   CONSTRAINT orders_pk PRIMARY KEY(order_id)\n);\n \nINSERT INTO orders(order_id, order_qty, customer_name) VALUES(1, 10, 'victor');\nINSERT INTO orders(order_id, order_qty, customer_name) VALUES(2, 20, 'peter');\n")),(0,r.yg)("p",null,"In the table, ",(0,r.yg)("em",{parentName:"p"},"order_id")," is the primary key which will be enforced on the Hudi table as well. Since a batch of change records can contain changes to the same primary key, we also include ",(0,r.yg)("em",{parentName:"p"},"updated_at")," and ",(0,r.yg)("em",{parentName:"p"},"created_at")," fields, which are kept upto date as writes happen to the table."),(0,r.yg)("h3",{id:"extracting-change-logs-from-mysql"},"Extracting Change logs from MySQL"),(0,r.yg)("p",null,"Before we can configure DMS, we first need to ",(0,r.yg)("a",{parentName:"p",href:"https://aws.amazon.com/premiumsupport/knowledge-center/enable-binary-logging-aurora/"},"prepare the MySQL instance"),"  for change capture, by ensuring backups are enabled and binlog is turned on.\n",(0,r.yg)("img",{src:t(53261).A})),(0,r.yg)("p",null,"Now, proceed to create endpoints in DMS that capture MySQL data and  ",(0,r.yg)("a",{parentName:"p",href:"https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3"},"store in S3, as parquet files"),"."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Source ",(0,r.yg)("em",{parentName:"li"},"hudi-source-db")," endpoint, points to the DB server and provides basic authentication details"),(0,r.yg)("li",{parentName:"ul"},"Target ",(0,r.yg)("em",{parentName:"li"},"parquet-s3")," endpoint, points to the bucket and folder on s3 to store the change logs records as parquet files\n",(0,r.yg)("img",{src:t(13755).A}),(0,r.yg)("img",{src:t(35424).A}),(0,r.yg)("img",{src:t(70239).A}))),(0,r.yg)("p",null,"Then proceed to create a migration task, as below. Give it a name, connect the source to the target and be sure to pick the right ",(0,r.yg)("em",{parentName:"p"},"Migration type")," as shown below, to ensure ongoing changes are continuously replicated to S3. Also make sure to specify, the rules using which DMS decides which MySQL schema/tables to replicate. In this example, we simply whitelist ",(0,r.yg)("em",{parentName:"p"},"orders")," table under the ",(0,r.yg)("em",{parentName:"p"},"hudi_dms")," schema, as specified in the table SQL above."),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(98847).A}),"\n",(0,r.yg)("img",{src:t(85284).A})),(0,r.yg)("p",null,"Starting the DMS task and should result in an initial load, like below."),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(73700).A})),(0,r.yg)("p",null,"Simply reading the raw initial load file, shoud give the same values as the upstream table"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-scala"},'scala> spark.read.parquet("s3://hudi-dms-demo/orders/hudi_dms/orders/*").sort("updated_at").show\n \n+--------+---------+-------------+-------------------+-------------------+\n|order_id|order_qty|customer_name|         updated_at|         created_at|\n+--------+---------+-------------+-------------------+-------------------+\n|       2|       10|        peter|2020-01-20 20:12:22|2020-01-20 20:12:22|\n|       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|\n+--------+---------+-------------+-------------------+-------------------+\n\n')),(0,r.yg)("h2",{id:"applying-change-logs-using-hudi-deltastreamer"},"Applying Change Logs using Hudi DeltaStreamer"),(0,r.yg)("p",null,"Now, we are ready to start consuming the change logs. Hudi DeltaStreamer runs as Spark job on your favorite workflow scheduler (it also supports a continuous mode using ",(0,r.yg)("em",{parentName:"p"},"--continuous")," flag, where it runs as a long running Spark job), that tails a given path on S3 (or any DFS implementation) for new files and can issue an ",(0,r.yg)("em",{parentName:"p"},"upsert")," to a target hudi dataset. The tool automatically checkpoints itself and thus to repeatedly ingest, all one needs to do is to keep executing the DeltaStreamer periodically."),(0,r.yg)("p",null,"With an initial load already on S3, we then run the following command (deltastreamer command, here on) to ingest the full load first and create a Hudi dataset on S3."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"spark-submit --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer  \\\n  --packages org.apache.spark:spark-avro_2.11:2.4.4 \\\n  --master yarn --deploy-mode client \\\n  hudi-utilities-bundle_2.11-0.5.1-SNAPSHOT.jar \\\n  --table-type COPY_ON_WRITE \\\n  --source-ordering-field updated_at \\\n  --source-class org.apache.hudi.utilities.sources.ParquetDFSSource \\\n  --target-base-path s3://hudi-dms-demo/hudi_orders --target-table hudi_orders \\\n  --transformer-class org.apache.hudi.utilities.transform.AWSDmsTransformer \\\n  --payload-class org.apache.hudi.payload.AWSDmsAvroPayload \\\n  --hoodie-conf hoodie.datasource.write.recordkey.field=order_id,hoodie.datasource.write.partitionpath.field=customer_name,hoodie.deltastreamer.source.dfs.root=s3://hudi-dms-demo/orders/hudi_dms/orders\n")),(0,r.yg)("p",null,"A few things are going on here"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"First, we specify the ",(0,r.yg)("em",{parentName:"li"},"--table-type")," as COPY_ON_WRITE. Hudi also supports another _MERGE_ON_READ ty_pe you can use if you choose from."),(0,r.yg)("li",{parentName:"ul"},"To handle cases where the input parquet files contain multiple updates/deletes or insert/updates to the same record, we use ",(0,r.yg)("em",{parentName:"li"},"updated_at")," as the ordering field. This ensures that the change record which has the latest timestamp will be reflected in Hudi."),(0,r.yg)("li",{parentName:"ul"},"We specify a target base path and a table table, all needed for creating and writing to the Hudi table"),(0,r.yg)("li",{parentName:"ul"},"We use a special payload class - ",(0,r.yg)("em",{parentName:"li"},"AWSDMSAvroPayload")," , to handle the different change operations correctly. The parquet files generated have an ",(0,r.yg)("em",{parentName:"li"},"Op")," field, that indicates whether a given change record is an insert (I), delete (D) or update (U) and the payload implementation uses this field to decide how to handle a given change record."),(0,r.yg)("li",{parentName:"ul"},"You may also notice a special transformer class ",(0,r.yg)("em",{parentName:"li"},"AWSDmsTransformer")," , being specified. The reason here is tactical, but important. The initial load file does not contain an ",(0,r.yg)("em",{parentName:"li"},"Op")," field, so this adds one to Hudi table schema additionally."),(0,r.yg)("li",{parentName:"ul"},"Finally, we specify the record key for the Hudi table as same as the upstream table. Then we specify partitioning by ",(0,r.yg)("em",{parentName:"li"},"customer_name"),"  and also the root of the DMS output.")),(0,r.yg)("p",null,"Once the command is run, the Hudi table should be created and have same records as the upstream table (with all the _hoodie fields as well)."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-scala"},'scala> spark.read.format("org.apache.hudi").load("s3://hudi-dms-demo/hudi_orders/*/*.parquet").show\n+-------------------+--------------------+------------------+----------------------+--------------------+--------+---------+-------------+-------------------+-------------------+---+\n|_hoodie_commit_time|_hoodie_commit_seqno|_hoodie_record_key|_hoodie_partition_path|   _hoodie_file_name|order_id|order_qty|customer_name|         updated_at|         created_at| Op|\n+-------------------+--------------------+------------------+----------------------+--------------------+--------+---------+-------------+-------------------+-------------------+---+\n|     20200120205028|  20200120205028_0_1|                 2|                 peter|af9a2525-a486-40e...|       2|       10|        peter|2020-01-20 20:12:22|2020-01-20 20:12:22|   |\n|     20200120205028|  20200120205028_1_1|                 1|                victor|8e431ece-d51c-4c7...|       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|   |\n+-------------------+--------------------+------------------+----------------------+--------------------+--------+---------+-------------+-------------------+-------------------+---+\n')),(0,r.yg)("p",null,"Now, let's do an insert and an update"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"INSERT INTO orders(order_id, order_qty, customer_name) VALUES(3, 30, 'sandy');\nUPDATE orders set order_qty = 20 where order_id = 2;\n")),(0,r.yg)("p",null,"This will add a new parquet file to the DMS output folder and when the deltastreamer command is run again, it will go ahead and apply these to the Hudi table."),(0,r.yg)("p",null,"So, querying the Hudi table now would yield 3 rows and the ",(0,r.yg)("em",{parentName:"p"},"hoodie_commit_time")," accurately reflects when these writes happened. You can notice that order_qty for order_id=2, is updated from 10 to 20!"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n|_hoodie_commit_time|_hoodie_commit_seqno|_hoodie_record_key|_hoodie_partition_path|   _hoodie_file_name| Op|order_id|order_qty|customer_name|         updated_at|         created_at|\n+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n|     20200120211526|  20200120211526_0_1|                 2|                 peter|af9a2525-a486-40e...|  U|       2|       20|        peter|2020-01-20 21:11:47|2020-01-20 20:12:22|\n|     20200120211526|  20200120211526_1_1|                 3|                 sandy|566eb34a-e2c5-44b...|  I|       3|       30|        sandy|2020-01-20 21:11:24|2020-01-20 21:11:24|\n|     20200120205028|  20200120205028_1_1|                 1|                victor|8e431ece-d51c-4c7...|   |       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|\n+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n")),(0,r.yg)("p",null,"A nice debugging aid would be read all of the DMS output now and sort it by update_at, which should give us a sequence of changes that happened on the upstream table. As we can see, the Hudi table above is a compacted snapshot of this raw change log."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"+----+--------+---------+-------------+-------------------+-------------------+\n|  Op|order_id|order_qty|customer_name|         updated_at|         created_at|\n+----+--------+---------+-------------+-------------------+-------------------+\n|null|       2|       10|        peter|2020-01-20 20:12:22|2020-01-20 20:12:22|\n|null|       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|\n|   I|       3|       30|        sandy|2020-01-20 21:11:24|2020-01-20 21:11:24|\n|   U|       2|       20|        peter|2020-01-20 21:11:47|2020-01-20 20:12:22|\n+----+--------+---------+-------------+-------------------+-------------------+\n")),(0,r.yg)("p",null,"Initial load with no ",(0,r.yg)("em",{parentName:"p"},"Op")," field value , followed by an insert and an update."),(0,r.yg)("p",null,"Now, lets do deletes an inserts"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"DELETE FROM orders WHERE order_id = 2;\nINSERT INTO orders(order_id, order_qty, customer_name) VALUES(4, 40, 'barry');\nINSERT INTO orders(order_id, order_qty, customer_name) VALUES(5, 50, 'nathan');\n")),(0,r.yg)("p",null,"This should result in more files on S3, written by DMS , which the DeltaStreamer command will continue to process incrementally (i.e only the newly written files are read each time)"),(0,r.yg)("p",null,(0,r.yg)("img",{src:t(23608).A})),(0,r.yg)("p",null,"Running the deltastreamer command again, would result in the follow state for the Hudi table. You can notice the two new records and that the ",(0,r.yg)("em",{parentName:"p"},"order_id=2")," is now gone"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n|_hoodie_commit_time|_hoodie_commit_seqno|_hoodie_record_key|_hoodie_partition_path|   _hoodie_file_name| Op|order_id|order_qty|customer_name|         updated_at|         created_at|\n+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n|     20200120212522|  20200120212522_1_1|                 5|                nathan|3da94b20-c70b-457...|  I|       5|       50|       nathan|2020-01-20 21:23:00|2020-01-20 21:23:00|\n|     20200120212522|  20200120212522_2_1|                 4|                 barry|8cc46715-8f0f-48a...|  I|       4|       40|        barry|2020-01-20 21:22:49|2020-01-20 21:22:49|\n|     20200120211526|  20200120211526_1_1|                 3|                 sandy|566eb34a-e2c5-44b...|  I|       3|       30|        sandy|2020-01-20 21:11:24|2020-01-20 21:11:24|\n|     20200120205028|  20200120205028_1_1|                 1|                victor|8e431ece-d51c-4c7...|   |       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|\n+-------------------+--------------------+------------------+----------------------+--------------------+---+--------+---------+-------------+-------------------+-------------------+\n")),(0,r.yg)("p",null,"Our little informal change log query yields the following."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"+----+--------+---------+-------------+-------------------+-------------------+\n|  Op|order_id|order_qty|customer_name|         updated_at|         created_at|\n+----+--------+---------+-------------+-------------------+-------------------+\n|null|       2|       10|        peter|2020-01-20 20:12:22|2020-01-20 20:12:22|\n|null|       1|       10|       victor|2020-01-20 20:12:31|2020-01-20 20:12:31|\n|   I|       3|       30|        sandy|2020-01-20 21:11:24|2020-01-20 21:11:24|\n|   U|       2|       20|        peter|2020-01-20 21:11:47|2020-01-20 20:12:22|\n|   D|       2|       20|        peter|2020-01-20 21:11:47|2020-01-20 20:12:22|\n|   I|       4|       40|        barry|2020-01-20 21:22:49|2020-01-20 21:22:49|\n|   I|       5|       50|       nathan|2020-01-20 21:23:00|2020-01-20 21:23:00|\n+----+--------+---------+-------------+-------------------+-------------------+\n")),(0,r.yg)("p",null,"Note that the delete and update have the same ",(0,r.yg)("em",{parentName:"p"},"updated_at,")," value. thus it can very well order differently here.. In short this way of looking at the changelog has its caveats. For a true changelog of the Hudi table itself, you can issue an ",(0,r.yg)("a",{parentName:"p",href:"http://hudi.apache.org/docs/querying_data"},"incremental query"),"."),(0,r.yg)("p",null,"And Life goes on ..... Hope this was useful to all the data engineers out there!"))}u.isMDXComponent=!0},67527:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/change-capture-architecture-dc9c69c50296a6a38721ec93fee9ba71.png"},53261:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/change-logs-mysql-a76f7760403ba59c5d11ba48b12cd4d6.png"},23608:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/dms-demo-files-2c926cf6a9fb12b5e9bc44a65df8e2b7.png"},73700:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/dms-task-cf605b4a3c85bea264a16a20a1645608.png"},13755:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/s3-endpoint-configuration-1-6246a9d09772ac527a13f5b26a6fb38e.png"},35424:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/s3-endpoint-configuration-2-b275c182ed2fa52e4c7a33bffba394d5.png"},70239:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/s3-endpoint-list-8d89e05bd7f4d82958a6c11a0cc0c8ea.png"},98847:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/s3-migration-task-1-61e22d0e163cf67bb9a9dd0879222177.png"},85284:(e,a,t)=>{t.d(a,{A:()=>n});const n=t.p+"assets/images/s3-migration-task-2-797ea4b89d2a3be41d476785040e2886.png"}}]);