"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[94065],{15680:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>m});var n=a(96540);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(a),h=i,m=d["".concat(p,".").concat(h)]||d[h]||u[h]||r;return a?n.createElement(m,o(o({ref:t},c),{},{components:a})):n.createElement(m,o({ref:t},c))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var l=2;l<r;l++)o[l]=a[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},84270:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=a(58168),i=(a(96540),a(15680));const r={title:"Comparison",keywords:["apache","hudi","kafka","kudu","hive","hbase","stream processing"],last_modified_at:new Date("2019-12-30T19:59:57.000Z")},o=void 0,s={unversionedId:"comparison",id:"version-0.14.0/comparison",title:"Comparison",description:"Apache Hudi fills a big void for processing data on top of DFS, and thus mostly co-exists nicely with these technologies. However,",source:"@site/versioned_docs/version-0.14.0/comparison.md",sourceDirName:".",slug:"/comparison",permalink:"/cn/docs/0.14.0/comparison",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.14.0/comparison.md",tags:[],version:"0.14.0",frontMatter:{title:"Comparison",keywords:["apache","hudi","kafka","kudu","hive","hbase","stream processing"],last_modified_at:"2019-12-30T19:59:57.000Z"}},p=[{value:"Kudu",id:"kudu",children:[],level:2},{value:"Hive Transactions",id:"hive-transactions",children:[],level:2},{value:"HBase",id:"hbase",children:[],level:2},{value:"Stream Processing",id:"stream-processing",children:[],level:2}],l={toc:p},c="wrapper";function d(e){let{components:t,...a}=e;return(0,i.yg)(c,(0,n.A)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"Apache Hudi fills a big void for processing data on top of DFS, and thus mostly co-exists nicely with these technologies. However,\nit would be useful to understand how Hudi fits into the current big data ecosystem, contrasting it with a few related systems\nand bring out the different tradeoffs these systems have accepted in their design."),(0,i.yg)("h2",{id:"kudu"},"Kudu"),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"https://kudu.apache.org"},"Apache Kudu")," is a storage system that has similar goals as Hudi, which is to bring real-time analytics on petabytes of data via first\nclass support for ",(0,i.yg)("inlineCode",{parentName:"p"},"upserts"),". A key differentiator is that Kudu also attempts to serve as a datastore for OLTP workloads, something that Hudi does not aspire to be.\nConsequently, Kudu does not support incremental pulling (as of early 2017), something Hudi does to enable incremental processing use cases."),(0,i.yg)("p",null,"Kudu diverges from a distributed file system abstraction and HDFS altogether, with its own set of storage servers talking to each  other via RAFT.\nHudi, on the other hand, is designed to work with an underlying Hadoop compatible filesystem (HDFS,S3 or Ceph) and does not have its own fleet of storage servers,\ninstead relying on Apache Spark to do the heavy-lifting. Thus, Hudi can be scaled easily, just like other Spark jobs, while Kudu would require hardware\n& operational support, typical to datastores like HBase or Vertica. We have not at this point, done any head to head benchmarks against Kudu (given RTTable is WIP).\nBut, if we were to go with results shared by ",(0,i.yg)("a",{parentName:"p",href:"https://db-blog.web.cern.ch/blog/zbigniew-baranowski/2017-01-performance-comparison-different-file-formats-and-storage-engines"},"CERN")," ,\nwe expect Hudi to positioned at something that ingests parquet with superior performance."),(0,i.yg)("h2",{id:"hive-transactions"},"Hive Transactions"),(0,i.yg)("p",null,(0,i.yg)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions"},"Hive Transactions/ACID")," is another similar effort, which tries to implement storage like\n",(0,i.yg)("inlineCode",{parentName:"p"},"merge-on-read"),", on top of ORC file format. Understandably, this feature is heavily tied to Hive and other efforts like ",(0,i.yg)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/Hive/LLAP"},"LLAP"),".\nHive transactions does not offer the read-optimized storage option or the incremental pulling, that Hudi does. In terms of implementation choices, Hudi leverages\nthe full power of a processing framework like Spark, while Hive transactions feature is implemented underneath by Hive tasks/queries kicked off by user or the Hive metastore.\nBased on our production experience, embedding Hudi as a library into existing Spark pipelines was much easier and less operationally heavy, compared with the other approach.\nHudi is also designed to work with non-hive engines like PrestoDB/Spark and will incorporate file formats other than parquet over time."),(0,i.yg)("h2",{id:"hbase"},"HBase"),(0,i.yg)("p",null,"Even though ",(0,i.yg)("a",{parentName:"p",href:"https://hbase.apache.org"},"HBase")," is ultimately a key-value store for OLTP workloads, users often tend to associate HBase with analytics given the proximity to Hadoop.\nGiven HBase is heavily write-optimized, it supports sub-second upserts out-of-box and Hive-on-HBase lets users query that data. However, in terms of actual performance for analytical workloads,\nhybrid columnar storage formats like Parquet/ORC handily beat HBase, since these workloads are predominantly read-heavy. Hudi bridges this gap between faster data and having\nanalytical storage formats. From an operational perspective, arming users with a library that provides faster data, is more scalable, than managing a big farm of HBase region servers,\njust for analytics. Finally, HBase does not support incremental processing primitives like ",(0,i.yg)("inlineCode",{parentName:"p"},"commit times"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"incremental pull")," as first class citizens like Hudi."),(0,i.yg)("h2",{id:"stream-processing"},"Stream Processing"),(0,i.yg)("p",null,'A popular question, we get is : "How does Hudi relate to stream processing systems?", which we will try to answer here. Simply put, Hudi can integrate with\nbatch (',(0,i.yg)("inlineCode",{parentName:"p"},"copy-on-write table"),") and streaming (",(0,i.yg)("inlineCode",{parentName:"p"},"merge-on-read table"),") jobs of today, to store the computed results in Hadoop. For Spark apps, this can happen via direct\nintegration of Hudi library with Spark/Spark streaming DAGs. In case of Non-Spark processing systems (eg: Flink, Hive), the processing can be done in the respective systems\nand later sent into a Hudi table via a Kafka topic/DFS intermediate file. In more conceptual level, data processing\npipelines just consist of three components : ",(0,i.yg)("inlineCode",{parentName:"p"},"source"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"processing"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"sink"),", with users ultimately running queries against the sink to use the results of the pipeline.\nHudi can act as either a source or sink, that stores data on DFS. Applicability of Hudi to a given stream processing pipeline ultimately boils down to suitability\nof PrestoDB/SparkSQL/Hive for your queries."),(0,i.yg)("p",null,"More advanced use cases revolve around the concepts of ",(0,i.yg)("a",{parentName:"p",href:"https://www.oreilly.com/ideas/ubers-case-for-incremental-processing-on-hadoop"},"incremental processing"),", which effectively\nuses Hudi even inside the ",(0,i.yg)("inlineCode",{parentName:"p"},"processing")," engine to speed up typical batch pipelines. For e.g: Hudi can be used as a state store inside a processing DAG (similar\nto how ",(0,i.yg)("a",{parentName:"p",href:"https://ci.apache.org/projects/flink/flink-docs-release-1.2/ops/state_backends#the-rocksdbstatebackend"},"rocksDB")," is used by Flink). This is an item on the roadmap\nand will eventually happen as a ",(0,i.yg)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/HUDI-60"},"Beam Runner")))}d.isMDXComponent=!0}}]);