"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[12134],{15680:(e,a,n)=>{n.d(a,{xA:()=>c,yg:()=>g});var r=n(96540);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function i(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?i(Object(n),!0).forEach((function(a){t(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function s(e,a){if(null==e)return{};var n,r,t=function(e,a){if(null==e)return{};var n,r,t={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var l=r.createContext({}),p=function(e){var a=r.useContext(l),n=a;return e&&(n="function"==typeof e?e(a):o(o({},a),e)),n},c=function(e){var a=p(e.components);return r.createElement(l.Provider,{value:a},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},m=r.forwardRef((function(e,a){var n=e.components,t=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=t,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(g,o(o({ref:a},c),{},{components:n})):r.createElement(g,o({ref:a},c))}));function g(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[u]="string"==typeof e?e:t,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},85904:(e,a,n)=>{n.r(a),n.d(a,{contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(58168),t=(n(96540),n(15680));const i={title:"Deployment",keywords:["hudi","administration","operation","devops","deployment"],summary:"This section offers an overview of tools available to operate an ecosystem of Hudi",toc:!0,last_modified_at:new Date("2019-12-30T19:59:57.000Z")},o=void 0,s={unversionedId:"deployment",id:"version-0.11.1/deployment",title:"Deployment",description:"This section provides all the help you need to deploy and operate Hudi tables at scale.",source:"@site/versioned_docs/version-0.11.1/deployment.md",sourceDirName:".",slug:"/deployment",permalink:"/docs/0.11.1/deployment",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.11.1/deployment.md",tags:[],version:"0.11.1",frontMatter:{title:"Deployment",keywords:["hudi","administration","operation","devops","deployment"],summary:"This section offers an overview of tools available to operate an ecosystem of Hudi",toc:!0,last_modified_at:"2019-12-30T19:59:57.000Z"},sidebar:"docs",previous:{title:"Performance",permalink:"/docs/0.11.1/performance"},next:{title:"CLI",permalink:"/docs/0.11.1/cli"}},l=[{value:"Deploying",id:"deploying",children:[{value:"DeltaStreamer",id:"deltastreamer",children:[],level:3},{value:"Spark Datasource Writer Jobs",id:"spark-datasource-writer-jobs",children:[],level:3}],level:2},{value:"Upgrading",id:"upgrading",children:[],level:2},{value:"Migrating",id:"migrating",children:[],level:2}],p={toc:l},c="wrapper";function u(e){let{components:a,...n}=e;return(0,t.yg)(c,(0,r.A)({},p,n,{components:a,mdxType:"MDXLayout"}),(0,t.yg)("p",null,"This section provides all the help you need to deploy and operate Hudi tables at scale.\nSpecifically, we will cover the following aspects."),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("a",{parentName:"li",href:"#deploying"},"Deployment Model")," : How various Hudi components are deployed and managed."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("a",{parentName:"li",href:"#upgrading"},"Upgrading Versions")," : Picking up new releases of Hudi, guidelines and general best-practices."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("a",{parentName:"li",href:"#migrating"},"Migrating to Hudi")," : How to migrate your existing tables to Apache Hudi.")),(0,t.yg)("h2",{id:"deploying"},"Deploying"),(0,t.yg)("p",null,"All in all, Hudi deploys with no long running servers or additional infrastructure cost to your data lake. In fact, Hudi pioneered this model of building a transactional distributed storage layer\nusing existing infrastructure and its heartening to see other systems adopting similar approaches as well. Hudi writing is done via Spark jobs (DeltaStreamer or custom Spark datasource jobs), deployed per standard Apache Spark ",(0,t.yg)("a",{parentName:"p",href:"https://spark.apache.org/docs/latest/cluster-overview"},"recommendations"),".\nQuerying Hudi tables happens via libraries installed into Apache Hive, Apache Spark or PrestoDB and hence no additional infrastructure is necessary. "),(0,t.yg)("p",null,"A typical Hudi data ingestion can be achieved in 2 modes. In a single run mode, Hudi ingestion reads next batch of data, ingest them to Hudi table and exits. In continuous mode, Hudi ingestion runs as a long-running service executing ingestion in a loop."),(0,t.yg)("p",null,"With Merge_On_Read Table, Hudi ingestion needs to also take care of compacting delta files. Again, compaction can be performed in an asynchronous-mode by letting compaction run concurrently with ingestion or in a serial fashion with one after another."),(0,t.yg)("h3",{id:"deltastreamer"},"DeltaStreamer"),(0,t.yg)("p",null,(0,t.yg)("a",{parentName:"p",href:"/docs/0.11.1/hoodie_deltastreamer#deltastreamer"},"DeltaStreamer")," is the standalone utility to incrementally pull upstream changes\nfrom varied sources such as DFS, Kafka and DB Changelogs and ingest them to hudi tables.  It runs as a spark application in two modes."),(0,t.yg)("p",null,"To use DeltaStreamer in Spark, the ",(0,t.yg)("inlineCode",{parentName:"p"},"hudi-utilities-bundle")," is required, by adding\n",(0,t.yg)("inlineCode",{parentName:"p"},"--packages org.apache.hudi:hudi-utilities-bundle_2.11:0.11.1")," to the ",(0,t.yg)("inlineCode",{parentName:"p"},"spark-submit")," command. From 0.11.0 release, we start\nto provide a new ",(0,t.yg)("inlineCode",{parentName:"p"},"hudi-utilities-slim-bundle")," which aims to exclude dependencies that can cause conflicts and compatibility\nissues with different versions of Spark.  The ",(0,t.yg)("inlineCode",{parentName:"p"},"hudi-utilities-slim-bundle")," should be used along with a Hudi Spark bundle\ncorresponding to the Spark version used, e.g.,\n",(0,t.yg)("inlineCode",{parentName:"p"},"--packages org.apache.hudi:hudi-utilities-slim-bundle_2.12:0.11.1,org.apache.hudi:hudi-spark3.1-bundle_2.12:0.11.1"),",\nif using ",(0,t.yg)("inlineCode",{parentName:"p"},"hudi-utilities-bundle")," solely in Spark encounters compatibility issues."),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("strong",{parentName:"li"},"Run Once Mode"),' : In this mode, Deltastreamer performs one ingestion round which includes incrementally pulling events from upstream sources and ingesting them to hudi table. Background operations like cleaning old file versions and archiving hoodie timeline are automatically executed as part of the run. For Merge-On-Read tables, Compaction is also run inline as part of ingestion unless disabled by passing the flag "--disable-compaction". By default, Compaction is run inline for every ingestion run and this can be changed by setting the property "hoodie.compact.inline.max.delta.commits". You can either manually run this spark application or use any cron trigger or workflow orchestrator (most common deployment strategy) such as Apache Airflow to spawn this application. See command line options in ',(0,t.yg)("a",{parentName:"li",href:"/docs/0.11.1/hoodie_deltastreamer#deltastreamer"},"this section")," for running the spark application.")),(0,t.yg)("p",null,"Here is an example invocation for reading from kafka topic in a single-run mode and writing to Merge On Read table type in a yarn cluster."),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'[hoodie]$ spark-submit --packages org.apache.hudi:hudi-utilities-bundle_2.11:0.11.1 \\\n --master yarn \\\n --deploy-mode cluster \\\n --num-executors 10 \\\n --executor-memory 3g \\\n --driver-memory 6g \\\n --conf spark.driver.extraJavaOptions="-XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/varadarb_ds_driver.hprof" \\\n --conf spark.executor.extraJavaOptions="-XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/varadarb_ds_executor.hprof" \\\n --queue hadoop-platform-queue \\\n --conf spark.scheduler.mode=FAIR \\\n --conf spark.yarn.executor.memoryOverhead=1072 \\\n --conf spark.yarn.driver.memoryOverhead=2048 \\\n --conf spark.task.cpus=1 \\\n --conf spark.executor.cores=1 \\\n --conf spark.task.maxFailures=10 \\\n --conf spark.memory.fraction=0.4 \\\n --conf spark.rdd.compress=true \\\n --conf spark.kryoserializer.buffer.max=200m \\\n --conf spark.serializer=org.apache.spark.serializer.KryoSerializer \\\n --conf spark.memory.storageFraction=0.1 \\\n --conf spark.shuffle.service.enabled=true \\\n --conf spark.sql.hive.convertMetastoreParquet=false \\\n --conf spark.ui.port=5555 \\\n --conf spark.driver.maxResultSize=3g \\\n --conf spark.executor.heartbeatInterval=120s \\\n --conf spark.network.timeout=600s \\\n --conf spark.eventLog.overwrite=true \\\n --conf spark.eventLog.enabled=true \\\n --conf spark.eventLog.dir=hdfs:///user/spark/applicationHistory \\\n --conf spark.yarn.max.executor.failures=10 \\\n --conf spark.sql.catalogImplementation=hive \\\n --conf spark.sql.shuffle.partitions=100 \\\n --driver-class-path $HADOOP_CONF_DIR \\\n --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer \\\n --table-type MERGE_ON_READ \\\n --source-class org.apache.hudi.utilities.sources.JsonKafkaSource \\\n --source-ordering-field ts  \\\n --target-base-path /user/hive/warehouse/stock_ticks_mor \\\n --target-table stock_ticks_mor \\\n --props /var/demo/config/kafka-source.properties \\\n --schemaprovider-class org.apache.hudi.utilities.schema.FilebasedSchemaProvider\n')),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("strong",{parentName:"li"},"Continuous Mode")," :  Here, deltastreamer runs an infinite loop with each round performing one ingestion round as described in ",(0,t.yg)("strong",{parentName:"li"},"Run Once Mode"),'. The frequency of data ingestion can be controlled by the configuration "--min-sync-interval-seconds". For Merge-On-Read tables, Compaction is run in asynchronous fashion concurrently with ingestion unless disabled by passing the flag "--disable-compaction". Every ingestion run triggers a compaction request asynchronously and this frequency can be changed by setting the property "hoodie.compact.inline.max.delta.commits". As both ingestion and compaction is running in the same spark context, you can use resource allocation configuration in DeltaStreamer CLI such as ("--delta-sync-scheduling-weight", "--compact-scheduling-weight", ""--delta-sync-scheduling-minshare", and "--compact-scheduling-minshare") to control executor allocation between ingestion and compaction.')),(0,t.yg)("p",null,"Here is an example invocation for reading from kafka topic in a continuous mode and writing to Merge On Read table type in a yarn cluster."),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'[hoodie]$ spark-submit --packages org.apache.hudi:hudi-utilities-bundle_2.11:0.11.1 \\\n --master yarn \\\n --deploy-mode cluster \\\n --num-executors 10 \\\n --executor-memory 3g \\\n --driver-memory 6g \\\n --conf spark.driver.extraJavaOptions="-XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/varadarb_ds_driver.hprof" \\\n --conf spark.executor.extraJavaOptions="-XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintGCTimeStamps -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/varadarb_ds_executor.hprof" \\\n --queue hadoop-platform-queue \\\n --conf spark.scheduler.mode=FAIR \\\n --conf spark.yarn.executor.memoryOverhead=1072 \\\n --conf spark.yarn.driver.memoryOverhead=2048 \\\n --conf spark.task.cpus=1 \\\n --conf spark.executor.cores=1 \\\n --conf spark.task.maxFailures=10 \\\n --conf spark.memory.fraction=0.4 \\\n --conf spark.rdd.compress=true \\\n --conf spark.kryoserializer.buffer.max=200m \\\n --conf spark.serializer=org.apache.spark.serializer.KryoSerializer \\\n --conf spark.memory.storageFraction=0.1 \\\n --conf spark.shuffle.service.enabled=true \\\n --conf spark.sql.hive.convertMetastoreParquet=false \\\n --conf spark.ui.port=5555 \\\n --conf spark.driver.maxResultSize=3g \\\n --conf spark.executor.heartbeatInterval=120s \\\n --conf spark.network.timeout=600s \\\n --conf spark.eventLog.overwrite=true \\\n --conf spark.eventLog.enabled=true \\\n --conf spark.eventLog.dir=hdfs:///user/spark/applicationHistory \\\n --conf spark.yarn.max.executor.failures=10 \\\n --conf spark.sql.catalogImplementation=hive \\\n --conf spark.sql.shuffle.partitions=100 \\\n --driver-class-path $HADOOP_CONF_DIR \\\n --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer \\\n --table-type MERGE_ON_READ \\\n --source-class org.apache.hudi.utilities.sources.JsonKafkaSource \\\n --source-ordering-field ts  \\\n --target-base-path /user/hive/warehouse/stock_ticks_mor \\\n --target-table stock_ticks_mor \\\n --props /var/demo/config/kafka-source.properties \\\n --schemaprovider-class org.apache.hudi.utilities.schema.FilebasedSchemaProvider \\\n --continuous\n')),(0,t.yg)("h3",{id:"spark-datasource-writer-jobs"},"Spark Datasource Writer Jobs"),(0,t.yg)("p",null,"As described in ",(0,t.yg)("a",{parentName:"p",href:"/docs/writing_data#spark-datasource-writer"},"Writing Data"),', you can use spark datasource to ingest to hudi table. This mechanism allows you to ingest any spark dataframe in Hudi format. Hudi Spark DataSource also supports spark streaming to ingest a streaming source to Hudi table. For Merge On Read table types, inline compaction is turned on by default which runs after every ingestion run. The compaction frequency can be changed by setting the property "hoodie.compact.inline.max.delta.commits". '),(0,t.yg)("p",null,"Here is an example invocation using spark datasource"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-java"},'inputDF.write()\n       .format("org.apache.hudi")\n       .options(clientOpts) // any of the Hudi client opts can be passed in as well\n       .option(DataSourceWriteOptions.RECORDKEY_FIELD_OPT_KEY(), "_row_key")\n       .option(DataSourceWriteOptions.PARTITIONPATH_FIELD_OPT_KEY(), "partition")\n       .option(DataSourceWriteOptions.PRECOMBINE_FIELD_OPT_KEY(), "timestamp")\n       .option(HoodieWriteConfig.TABLE_NAME, tableName)\n       .mode(SaveMode.Append)\n       .save(basePath);\n')),(0,t.yg)("h2",{id:"upgrading"},"Upgrading"),(0,t.yg)("p",null,"New Hudi releases are listed on the ",(0,t.yg)("a",{parentName:"p",href:"/releases/download"},"releases page"),", with detailed notes which list all the changes, with highlights in each release.\nAt the end of the day, Hudi is a storage system and with that comes a lot of responsibilities, which we take seriously. "),(0,t.yg)("p",null,"As general guidelines, "),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"We strive to keep all changes backwards compatible (i.e new code can read old data/timeline files) and when we cannot, we will provide upgrade/downgrade tools via the CLI"),(0,t.yg)("li",{parentName:"ul"},"We cannot always guarantee forward compatibility (i.e old code being able to read data/timeline files written by a greater version). This is generally the norm, since no new features can be built otherwise.\nHowever any large such changes, will be turned off by default, for smooth transition to newer release. After a few releases and once enough users deem the feature stable in production, we will flip the defaults in a subsequent release."),(0,t.yg)("li",{parentName:"ul"},"Always upgrade the query bundles (mr-bundle, presto-bundle, spark-bundle) first and then upgrade the writers (deltastreamer, spark jobs using datasource). This often provides the best experience and it's easy to fix\nany issues by rolling forward/back the writer code (which typically you might have more control over)"),(0,t.yg)("li",{parentName:"ul"},"With large, feature rich releases we recommend migrating slowly, by first testing in staging environments and running your own tests. Upgrading Hudi is no different than upgrading any database system.")),(0,t.yg)("p",null,"Note that release notes can override this information with specific instructions, applicable on case-by-case basis."),(0,t.yg)("h2",{id:"migrating"},"Migrating"),(0,t.yg)("p",null,"Currently migrating to Hudi can be done using two approaches "),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("strong",{parentName:"li"},"Convert newer partitions to Hudi")," : This model is suitable for large event tables (e.g: click streams, ad impressions), which also typically receive writes for the last few days alone. You can convert the last\nN partitions to Hudi and proceed writing as if it were a Hudi table to begin with. The Hudi query side code is able to correctly handle both hudi and non-hudi data partitions."),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("strong",{parentName:"li"},"Full conversion to Hudi")," : This model is suitable if you are currently bulk/full loading the table few times a day (e.g database ingestion). The full conversion of Hudi is simply a one-time step (akin to 1 run of your existing job),\nwhich moves all of the data into the Hudi format and provides the ability to incrementally update for future writes.")),(0,t.yg)("p",null,"For more details, refer to the detailed ",(0,t.yg)("a",{parentName:"p",href:"/docs/migration_guide"},"migration guide"),". In the future, we will be supporting seamless zero-copy bootstrap of existing tables with all the upsert/incremental query capabilities fully supported."))}u.isMDXComponent=!0}}]);