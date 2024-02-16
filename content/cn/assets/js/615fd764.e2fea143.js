"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[69844],{15680:(e,a,t)=>{t.d(a,{xA:()=>p,yg:()=>h});var n=t(96540);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=n.createContext({}),c=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):o(o({},a),e)),t},p=function(e){var a=c(e.components);return n.createElement(l.Provider,{value:a},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(t),u=r,h=d["".concat(l,".").concat(u)]||d[u]||m[u]||i;return t?n.createElement(h,o(o({ref:a},p),{},{components:t})):n.createElement(h,o({ref:a},p))}));function h(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=u;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[d]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=t[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},80328:(e,a,t)=>{t.r(a),t.d(a,{contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=t(58168),r=(t(96540),t(15680));const i={title:"Use Cases",keywords:["hudi","data ingestion","etl","real time","use cases"],summary:"Following are some sample use-cases for Hudi, which illustrate the benefits in terms of faster processing & increased efficiency",toc:!0,last_modified_at:new Date("2019-12-30T19:59:57.000Z")},o=void 0,s={unversionedId:"use_cases",id:"use_cases",title:"Use Cases",description:"Near Real-Time Ingestion",source:"@site/learn/use_cases.md",sourceDirName:".",slug:"/use_cases",permalink:"/cn/learn/use_cases",tags:[],version:"current",frontMatter:{title:"Use Cases",keywords:["hudi","data ingestion","etl","real time","use cases"],summary:"Following are some sample use-cases for Hudi, which illustrate the benefits in terms of faster processing & increased efficiency",toc:!0,last_modified_at:"2019-12-30T19:59:57.000Z"},sidebar:"defaultSidebar"},l=[{value:"Near Real-Time Ingestion",id:"near-real-time-ingestion",children:[],level:2},{value:"Data Deletion",id:"data-deletion",children:[],level:2},{value:"Unified Storage For Analytics",id:"unified-storage-for-analytics",children:[],level:2},{value:"Incremental Processing Pipelines",id:"incremental-processing-pipelines",children:[],level:2}],c={toc:l},p="wrapper";function d(e){let{components:a,...t}=e;return(0,r.yg)(p,(0,n.A)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"near-real-time-ingestion"},"Near Real-Time Ingestion"),(0,r.yg)("p",null,"Hudi offers some great benefits across ingestion of all kinds. Hudi helps ",(0,r.yg)("strong",{parentName:"p"},"enforces a minimum file size on DFS"),". This helps\nsolve the ",(0,r.yg)("a",{parentName:"p",href:"https://blog.cloudera.com/blog/2009/02/the-small-files-problem/"},'"small files problem"')," for HDFS and Cloud Stores alike,\nsignificantly improving query performance. Hudi adds the much needed ability to atomically commit new data, shielding queries from\never seeing partial writes and helping ingestion recover gracefully from failures."),(0,r.yg)("p",null,"Ingesting data from OLTP sources like (event logs, databases, external sources) into a ",(0,r.yg)("a",{parentName:"p",href:"http://martinfowler.com/bliki/DataLake"},"Data Lake"),' is a common problem,\nthat is unfortunately solved in a piecemeal fashion, using a medley of ingestion tools. This "raw data" layer of the data lake often forms the bedrock on which\nmore value is created.'),(0,r.yg)("p",null,"For RDBMS ingestion, Hudi provides ",(0,r.yg)("strong",{parentName:"p"},"faster loads via Upserts"),", as opposed costly & inefficient bulk loads. It's very common to use a change capture solution like\n",(0,r.yg)("a",{parentName:"p",href:"http://debezium.io/"},"Debezium")," or ",(0,r.yg)("a",{parentName:"p",href:"https://docs.confluent.io/platform/current/connect/index"},"Kafka Connect")," or\n",(0,r.yg)("a",{parentName:"p",href:"https://sqoop.apache.org/docs/1.4.2/SqoopUserGuide#_incremental_imports"},"Sqoop Incremental Import")," and apply them to an\nequivalent Hudi table on DFS. For NoSQL datastores like ",(0,r.yg)("a",{parentName:"p",href:"http://cassandra.apache.org/"},"Cassandra")," / ",(0,r.yg)("a",{parentName:"p",href:"http://www.project-voldemort.com/voldemort/"},"Voldemort")," / ",(0,r.yg)("a",{parentName:"p",href:"https://hbase.apache.org/"},"HBase"),",\neven moderately big installations store billions of rows. It goes without saying that ",(0,r.yg)("strong",{parentName:"p"},"full bulk loads are simply infeasible")," and more efficient approaches\nare needed if ingestion is to keep up with the typically high update volumes."),(0,r.yg)("p",null,"Even for immutable data sources like ",(0,r.yg)("a",{parentName:"p",href:"https://kafka.apache.org"},"Kafka"),", there is often a need to de-duplicate the incoming events against what's stored on DFS.\nHudi achieves this by ",(0,r.yg)("a",{parentName:"p",href:"http://hudi.apache.org/blog/hudi-indexing-mechanisms/"},"employing indexes")," of different kinds, quickly and efficiently."),(0,r.yg)("p",null,"All of this is seamlessly achieved by the Hudi DeltaStreamer tool, which is maintained in tight integration with rest of the code\nand we are always trying to add more capture sources, to make this easier for the users. The tool also has a continuous mode, where it\ncan self-manage clustering/compaction asynchronously, without blocking ingestion, significantly improving data freshness."),(0,r.yg)("h2",{id:"data-deletion"},"Data Deletion"),(0,r.yg)("p",null,"Hudi also offers ability to delete the data stored in the data lake, and more so provides efficient ways of dealing with\nlarge write amplification, resulting from random deletes based on user_id (or any secondary key), by way of the ",(0,r.yg)("inlineCode",{parentName:"p"},"Merge On Read")," table types.\nHudi's elegant log based concurrency control, ensures that the ingestion/writing can continue happening,as a background compaction job\namortizes the cost of rewriting data/enforcing deletes."),(0,r.yg)("p",null,"Hudi also unlocks special capabilities like data clustering, which allow users to optimize the data layout for deletions. Specifically,\nusers can cluster older event log data based on user_id, such that, queries that evaluate candidates for data deletion can do so, while\nmore recent partitions are optimized for query performance and clustered on say timestamp."),(0,r.yg)("h2",{id:"unified-storage-for-analytics"},"Unified Storage For Analytics"),(0,r.yg)("p",null,"The world we live in is polarized - even on data analytics storage - into real-time and offline/batch storage. Typically, real-time ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Data_mart"},"datamarts"),"\nare powered by specialized analytical stores such as ",(0,r.yg)("a",{parentName:"p",href:"http://druid.io/"},"Druid")," or ",(0,r.yg)("a",{parentName:"p",href:"http://www.memsql.com/"},"Memsql")," or ",(0,r.yg)("a",{parentName:"p",href:"https://clickhouse.tech/"},"Clickhouse"),", fed by event buses like\n",(0,r.yg)("a",{parentName:"p",href:"https://kafka.apache.org"},"Kafka")," or ",(0,r.yg)("a",{parentName:"p",href:"https://pulsar.apache.org"},"Pulsar"),". This model is prohibitively expensive, unless a small fraction of your data lake data\nneeds sub-second query responses such as system monitoring or interactive real-time analysis."),(0,r.yg)("p",null,"The same data gets ingested into data lake storage much later (say every few hours or so) and then runs through batch ETL pipelines, with intolerable data freshness\nto do any kind of near-realtime analytics. On the other hand, the data lakes provide access to interactive SQL engines like Presto/SparkSQL, which can horizontally scale\neasily and provide return even more complex queries, within few seconds. "),(0,r.yg)("p",null,"By bringing streaming primitives to data lake storage, Hudi opens up new possibilities by being able to ingest data within few minutes and also author incremental data\npipelines that are orders of magnitude faster than traditional batch processing. By bringing ",(0,r.yg)("strong",{parentName:"p"},"data freshness to a few minutes"),", Hudi can provide a much efficient alternative,\nfor a large class of data applications, compared to real-time datamarts. Also, Hudi has no upfront server infrastructure investments\nand thus enables faster analytics on much fresher analytics, without increasing the operational overhead. This external ",(0,r.yg)("a",{parentName:"p",href:"https://www.analyticsinsight.net/can-big-data-solutions-be-affordable/"},"article"),"\nfurther validates this newer model."),(0,r.yg)("h2",{id:"incremental-processing-pipelines"},"Incremental Processing Pipelines"),(0,r.yg)("p",null,"Data Lake ETL typically involves building a chain of tables derived from each other via DAGs expressed as workflows. Workflows often depend on new data being output by\nmultiple upstream workflows and traditionally, availability of new data is indicated by a new DFS Folder/Hive Partition.\nLet's take a concrete example to illustrate this. An upstream workflow ",(0,r.yg)("inlineCode",{parentName:"p"},"U")," can create a Hive partition for every hour, with data for that hour (event_time) at the end of each hour (processing_time), providing effective freshness of 1 hour.\nThen, a downstream workflow ",(0,r.yg)("inlineCode",{parentName:"p"},"D"),", kicks off immediately after ",(0,r.yg)("inlineCode",{parentName:"p"},"U")," finishes, and does its own processing for the next hour, increasing the effective latency to 2 hours."),(0,r.yg)("p",null,"The above paradigm simply ignores late arriving data i.e when ",(0,r.yg)("inlineCode",{parentName:"p"},"processing_time")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"event_time")," drift apart.\nUnfortunately, in today's post-mobile & pre-IoT world, ",(0,r.yg)("strong",{parentName:"p"},"late data from intermittently connected mobile devices & sensors are the norm, not an anomaly"),".\nIn such cases, the only remedy to guarantee correctness is to reprocess the last few hours worth of data, over and over again each hour,\nwhich can significantly hurt the efficiency across the entire ecosystem. For e.g; imagine reprocessing TBs worth of data every hour across hundreds of workflows."),(0,r.yg)("p",null,"Hudi comes to the rescue again, by providing a way to consume new data (including late data) from an upstream Hudi table ",(0,r.yg)("inlineCode",{parentName:"p"},"HU")," at a record granularity (not folders/partitions),\napply the processing logic, and efficiently update/reconcile late data with a downstream Hudi table ",(0,r.yg)("inlineCode",{parentName:"p"},"HD"),". Here, ",(0,r.yg)("inlineCode",{parentName:"p"},"HU")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"HD")," can be continuously scheduled at a much more frequent schedule\nlike 15 mins, and providing an end-end latency of 30 mins at ",(0,r.yg)("inlineCode",{parentName:"p"},"HD"),"."),(0,r.yg)("p",null,"To achieve this, Hudi has embraced similar concepts from stream processing frameworks like ",(0,r.yg)("a",{parentName:"p",href:"https://spark.apache.org/docs/latest/streaming-programming-guide#join-operations"},"Spark Streaming")," , Pub/Sub systems like ",(0,r.yg)("a",{parentName:"p",href:"http://kafka.apache.org/documentation/#theconsumer"},"Kafka"),"\n",(0,r.yg)("a",{parentName:"p",href:"https://flink.apache.org"},"Flink")," or database replication technologies like ",(0,r.yg)("a",{parentName:"p",href:"https://docs.oracle.com/cd/E11882_01/server.112/e16545/xstrm_cncpt.htm#XSTRM187"},"Oracle XStream"),".\nFor the more curious, a more detailed explanation of the benefits of Incremental Processing can be found ",(0,r.yg)("a",{parentName:"p",href:"https://www.oreilly.com/ideas/ubers-case-for-incremental-processing-on-hadoop"},"here")))}d.isMDXComponent=!0}}]);