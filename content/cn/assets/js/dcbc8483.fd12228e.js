"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[66338],{15680:(e,t,a)=>{a.d(t,{xA:()=>d,yg:()=>y});var n=a(96540);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),g=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=g(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=g(a),m=i,y=u["".concat(s,".").concat(m)]||u[m]||p[m]||l;return a?n.createElement(y,r(r({ref:t},d),{},{components:a})):n.createElement(y,r({ref:t},d))}));function y(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:i,r[1]=o;for(var g=2;g<l;g++)r[g]=a[g];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},20094:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=a(58168),i=(a(96540),a(15680));const l={title:"File Sizing",toc:!0,toc_min_heading_level:2,toc_max_heading_level:4},r=void 0,o={unversionedId:"file_sizing",id:"version-0.14.0/file_sizing",title:"File Sizing",description:"Solving the small file problem is fundamental to ensuring",source:"@site/versioned_docs/version-0.14.0/file_sizing.md",sourceDirName:".",slug:"/file_sizing",permalink:"/cn/docs/0.14.0/file_sizing",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.14.0/file_sizing.md",tags:[],version:"0.14.0",frontMatter:{title:"File Sizing",toc:!0,toc_min_heading_level:2,toc_max_heading_level:4},sidebar:"docs",previous:{title:"Marker Mechanism",permalink:"/cn/docs/0.14.0/markers"},next:{title:"Disaster Recovery",permalink:"/cn/docs/0.14.0/disaster_recovery"}},s=[{value:"Auto-sizing during writes",id:"auto-sizing-during-writes",children:[{value:"File sizing for Copy-On-Write (COW) and Merge-On-Read (MOR) tables",id:"file-sizing-for-copy-on-write-cow-and-merge-on-read-mor-tables",children:[],level:3},{value:"More details about file sizing for Merge-On-Read(MOR) tables",id:"more-details-about-file-sizing-for-merge-on-readmor-tables",children:[],level:3},{value:"Configs",id:"configs",children:[],level:3}],level:2},{value:"Auto-Sizing With Clustering",id:"auto-sizing-with-clustering",children:[{value:"Configs",id:"configs-1",children:[],level:3}],level:2}],g={toc:s},d="wrapper";function u(e){let{components:t,...a}=e;return(0,i.yg)(d,(0,n.A)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"Solving the ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/blog/2021/03/01/hudi-file-sizing/"},"small file problem")," is fundamental to ensuring\ngreat experience on the data lake. If you don\u2019t size the files appropriately, you can slow down the queries and the pipelines.\nSome of the issues you may encounter with small files include the following:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Queries slow down"),": You\u2019ll have to scan through many small files to retrieve data for a query. It\u2019s a very inefficient\nway of accessing and utilizing the data. Also, cloud storage, like S3, enforces a rate-limit on how many requests can\nbe processed per second per prefix in a bucket. A higher number of files, i.e., at least one request per file regardless\nof the file size, increases the chance of encountering a rate-limit, as well as additional fixed costs for opening/closing\nthem. All of these causes the queries to slow down.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Pipelines slow down"),": You can slow down your Spark, Flink or Hive jobs due to excessive scheduling overhead or memory\nrequirements; the more files you have, the more tasks you create.")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Storage inefficiencies"),": When working with many small files, you can be inefficient in using your storage. For example,\nmany small files can yield a lower compression ratio, increasing storage costs. If you\u2019re indexing the data, that also\ntakes up more storage space to store additional metadata, such as column statistics. If you\u2019re working with a smaller\namount of data, you might not see a significant impact with storage. However, when dealing with petabyte and exabyte\ndata, you\u2019ll need to be efficient in managing storage resources."))),(0,i.yg)("p",null,"A critical design decision in the Hudi architecture is to avoid small file creation. Hudi is uniquely designed to write\nappropriately sized files automatically. This page will show you how Apache Hudi overcomes the dreaded small files problem.\nThere are two ways to manage small files in Hudi: "),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("a",{parentName:"li",href:"#auto-sizing-during-writes"},"Auto-size during writes")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("a",{parentName:"li",href:"#auto-sizing-with-clustering"},"Clustering after writes"))),(0,i.yg)("p",null,"Below, we will describe the advantages and trade-offs of each."),(0,i.yg)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.yg)("div",{parentName:"div",className:"admonition-heading"},(0,i.yg)("h5",{parentName:"div"},(0,i.yg)("span",{parentName:"h5",className:"admonition-icon"},(0,i.yg)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.yg)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.yg)("div",{parentName:"div",className:"admonition-content"},(0,i.yg)("p",{parentName:"div"},"the bulk_insert write operation does not have auto-sizing capabilities during ingestion"))),(0,i.yg)("h2",{id:"auto-sizing-during-writes"},"Auto-sizing during writes"),(0,i.yg)("p",null,"You can manage file sizes through Hudi\u2019s auto-sizing capability during ingestion. The default targeted file size for\nParquet base files is 120MB, which can be configured by ",(0,i.yg)("inlineCode",{parentName:"p"},"hoodie.parquet.max.file.size"),". Auto-sizing may add some write\nlatency, but it ensures that the queries are always efficient when a write transaction is committed. It\u2019s important to\nnote that if you don\u2019t manage file sizing as you write and, instead, try to run clustering to fix your file sizing\nperiodically, your queries might be slow until the point when the clustering finishes. This is only supported for\n",(0,i.yg)("strong",{parentName:"p"},"append")," use cases only; ",(0,i.yg)("strong",{parentName:"p"},"mutable")," are not supported at the moment. Please refer to the\n",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/clustering"},"clustering documentation")," for more details."),(0,i.yg)("p",null,"If you need to control the file sizing, i.e., increase the target file size or change how small files are identified,\nfollow the instructions below for Copy-On-Write and Merge-On-Read tables."),(0,i.yg)("h3",{id:"file-sizing-for-copy-on-write-cow-and-merge-on-read-mor-tables"},"File sizing for Copy-On-Write (COW) and Merge-On-Read (MOR) tables"),(0,i.yg)("p",null,"To tune the file sizing for both COW and MOR tables, you can set the small file limit and the maximum Parquet file size.\nHudi will try to add enough records to a small file at write time to get it to the configured maximum limit."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"For example, if the ",(0,i.yg)("inlineCode",{parentName:"li"},"hoodie.parquet.small.file.limit=104857600")," (100MB) and ",(0,i.yg)("inlineCode",{parentName:"li"},"hoodie.parquet.max.file.size=125829120")," (120MB),\nHudi will pick all files < 100MB and try to get them up to 120MB.")),(0,i.yg)("p",null,"For creating a Hudi table initially, setting an accurate record size estimate is vital to ensure Hudi can adequately\nestimate how many records need to be bin-packed in a Parquet file for the first ingestion batch. Then, Hudi automatically\nuses the average record size for subsequent writes based on previous commits."),(0,i.yg)("h3",{id:"more-details-about-file-sizing-for-merge-on-readmor-tables"},"More details about file sizing for Merge-On-Read(MOR) tables"),(0,i.yg)("p",null,"As a MOR table aims to reduce the write amplification, compared to a COW table, when writing to a MOR table, Hudi limits\nthe number of Parquet base files to one for auto file sizing during insert and upsert operation. This limits the number\nof rewritten files. This can be configured through ",(0,i.yg)("inlineCode",{parentName:"p"},"hoodie.merge.small.file.group.candidates.limit"),"."),(0,i.yg)("p",null,"For storage systems that support append operation, in addition to file sizing Parquet base files for a MOR table, you\ncan also tune the log files file-sizing with ",(0,i.yg)("inlineCode",{parentName:"p"},"hoodie.logfile.max.size"),". "),(0,i.yg)("p",null,"MergeOnRead works differently for different INDEX choices so there are few more configs to set:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Indexes with ",(0,i.yg)("strong",{parentName:"li"},"canIndexLogFiles = true")," : Inserts of new data go directly to log files. In this case, you can configure\nthe ",(0,i.yg)("a",{parentName:"li",href:"https://hudi.apache.org/docs/configurations#hoodielogfilemaxsize"},"maximum log size")," and a\n",(0,i.yg)("a",{parentName:"li",href:"https://hudi.apache.org/docs/configurations#hoodielogfiletoparquetcompressionratio"},"factor")," that denotes reduction\nin size when data moves from avro to parquet files."),(0,i.yg)("li",{parentName:"ul"},"Indexes with ",(0,i.yg)("strong",{parentName:"li"},"canIndexLogFiles = false")," : Inserts of new data go only to parquet files. In this case, the same configurations\nas above for the COPY_ON_WRITE case applies.\n",(0,i.yg)("strong",{parentName:"li"},"NOTE")," : In either case, small files will be auto sized only if there is no PENDING compaction or associated log file\nfor that particular file slice. For example, for case 1: If you had a log file and a compaction C1 was scheduled to\nconvert that log file to parquet, no more inserts can go into that log file. For case 2: If you had a parquet file and\nan update ended up creating an associated delta log file, no more inserts can go into that parquet file. Only after the\ncompaction has been performed and there are NO log files associated with the base parquet file, can new inserts be sent\nto auto size that parquet file.")),(0,i.yg)("h3",{id:"configs"},"Configs"),(0,i.yg)("p",null,"Here are the essential configurations for ",(0,i.yg)("strong",{parentName:"p"},"COW tables"),"."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Spark based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.parquet.small.file.limit"),(0,i.yg)("td",{parentName:"tr",align:null},"104857600 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"During an insert and upsert operation, we opportunistically expand existing small files on storage, instead of writing new files, to keep number of files to an optimum. This config sets the file size limit below which a file on storage  becomes a candidate to be selected as such a ",(0,i.yg)("inlineCode",{parentName:"td"},"small file"),". By default, treat any file ","<","= 100MB as a small file. Also note that if this set ","<","= 0, will not try to get small files and directly write new files",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARQUET_SMALL_FILE_LIMIT"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.parquet.max.file.size"),(0,i.yg)("td",{parentName:"tr",align:null},"125829120 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Target size in bytes for parquet files produced by Hudi write phases. For DFS, this needs to be aligned with the underlying filesystem block size for optimal performance.",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARQUET_MAX_FILE_SIZE"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.copyonwrite.record.size.estimate"),(0,i.yg)("td",{parentName:"tr",align:null},"1024 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"The average record size. If not explicitly specified, hudi will compute the record size estimate compute dynamically based on commit metadata.  This is critical in computing the insert parallelism and bin-packing inserts into small files.",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: COPY_ON_WRITE_RECORD_SIZE_ESTIMATE"))))),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Flink based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"write.parquet.max.file.size"),(0,i.yg)("td",{parentName:"tr",align:null},"120 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Target size for parquet files produced by Hudi write phases. For DFS, this needs to be aligned with the underlying filesystem block size for optimal performance.",(0,i.yg)("br",null),(0,i.yg)("br",null)," ",(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: WRITE_PARQUET_MAX_FILE_SIZE"))))),(0,i.yg)("p",null,"Here are the essential configurations for ",(0,i.yg)("strong",{parentName:"p"},"MOR tables"),":"),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Spark based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.parquet.small.file.limit"),(0,i.yg)("td",{parentName:"tr",align:null},"104857600 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"During an insert and upsert operation, we opportunistically expand existing small files on storage, instead of writing new files, to keep number of files to an optimum. This config sets the file size limit below which a file on storage  becomes a candidate to be selected as such a ",(0,i.yg)("inlineCode",{parentName:"td"},"small file"),". By default, treat any file ","<","= 100MB as a small file. Also note that if this set ","<","= 0, will not try to get small files and directly write new files",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARQUET_SMALL_FILE_LIMIT"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.parquet.max.file.size"),(0,i.yg)("td",{parentName:"tr",align:null},"125829120 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Target size in bytes for parquet files produced by Hudi write phases. For DFS, this needs to be aligned with the underlying filesystem block size for optimal performance.",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARQUET_MAX_FILE_SIZE"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.merge.small.file.group.candidates.limit"),(0,i.yg)("td",{parentName:"tr",align:null},"1 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Limits number of file groups, whose base file satisfies small-file limit, to consider for appending records during upsert operation. Only applicable to MOR tables",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: MERGE_SMALL_FILE_GROUP_CANDIDATES_LIMIT"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.logfile.max.size"),(0,i.yg)("td",{parentName:"tr",align:null},"1073741824 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"LogFile max size in bytes. This is the maximum size allowed for a log file before it is rolled over to the next version. This log rollover limit only works on storage systems that support append operation. Please note that on cloud storage like S3/GCS, this may not be respected",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: LOGFILE_MAX_SIZE"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.logfile.to.parquet.compression.ratio"),(0,i.yg)("td",{parentName:"tr",align:null},"0.35 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Expected additional compression as records move from log files to parquet. Used for merge_on_read table to send inserts into log files ","&"," control the size of compacted parquet file.",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: LOGFILE_TO_PARQUET_COMPRESSION_RATIO_FRACTION"))))),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Flink based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"write.parquet.max.file.size"),(0,i.yg)("td",{parentName:"tr",align:null},"120 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Target size for parquet files produced by Hudi write phases. For DFS, this needs to be aligned with the underlying filesystem block size for optimal performance.",(0,i.yg)("br",null),(0,i.yg)("br",null)," ",(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: WRITE_PARQUET_MAX_FILE_SIZE"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"write.log.max.size"),(0,i.yg)("td",{parentName:"tr",align:null},"1024 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Maximum size allowed in MB for a log file before it is rolled over to the next version, default 1GB",(0,i.yg)("br",null),(0,i.yg)("br",null)," ",(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: WRITE_LOG_MAX_SIZE"))))),(0,i.yg)("h2",{id:"auto-sizing-with-clustering"},"Auto-Sizing With Clustering"),(0,i.yg)("p",null,"Clustering is a service that allows you to combine small files into larger ones while at the same time (optionally) changing\nthe data layout by sorting or applying ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/blog/2021/12/29/hudi-zorder-and-hilbert-space-filling-curves/"},"space-filling curves"),"\nlike Z-order or Hilbert curve. We won\u2019t go into all the details about clustering here, but please refer to the\n",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/clustering"},"clustering section")," for more details. "),(0,i.yg)("p",null,"Clustering is one way to achieve file sizing, so you can have faster queries. When you ingest data, you may still have a\nlot of small files (depending on your configurations and the data size from ingestion i.e., input batch). In this case,\nyou will want to cluster all the small files to larger files to improve query performance. Clustering can be performed\nin different ways. Please check out the ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/clustering"},"clustering documentation")," for more details. "),(0,i.yg)("p",null,"An example where clustering might be very useful is when a user has a Hudi table with many small files. For example, if\nyou're using BULK_INSERT without any sort modes, or you want a different file layout, you can use the clustering service\nto fix all the file sizes without ingesting any new data."),(0,i.yg)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.yg)("div",{parentName:"div",className:"admonition-heading"},(0,i.yg)("h5",{parentName:"div"},(0,i.yg)("span",{parentName:"h5",className:"admonition-icon"},(0,i.yg)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.yg)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.yg)("div",{parentName:"div",className:"admonition-content"},(0,i.yg)("p",{parentName:"div"},"Clustering in Hudi is not a blocking operation, and writes can continue concurrently as long as no files need to be\nupdated while the clustering service is running. The writes will fail if there are updates to the data being clustered\nwhile the clustering service runs."))),(0,i.yg)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.yg)("div",{parentName:"div",className:"admonition-heading"},(0,i.yg)("h5",{parentName:"div"},(0,i.yg)("span",{parentName:"h5",className:"admonition-icon"},(0,i.yg)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.yg)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.yg)("div",{parentName:"div",className:"admonition-content"},(0,i.yg)("p",{parentName:"div"},"Hudi always creates immutable files on storage. To be able to do auto-sizing or clustering, Hudi will always create a\nnewer version of the smaller file, resulting in 2 versions of the same file. The ",(0,i.yg)("a",{parentName:"p",href:"/docs/hoodie_cleaner"},"cleaner service"),"\nwill later kick in and delete the older version small file and keep the latest one."))),(0,i.yg)("p",null,"Here are the critical file sizing configurations:"),(0,i.yg)("h3",{id:"configs-1"},"Configs"),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Spark based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.clustering.plan.strategy.small.file.limit"),(0,i.yg)("td",{parentName:"tr",align:null},"314572800 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Files smaller than the size in bytes specified here are candidates for clustering",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PLAN_STRATEGY_SMALL_FILE_LIMIT"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.7.0"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.clustering.plan.strategy.target.file.max.bytes"),(0,i.yg)("td",{parentName:"tr",align:null},"1073741824 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Each group can produce 'N' (CLUSTERING_MAX_GROUP_SIZE/CLUSTERING_TARGET_FILE_SIZE) output file groups",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PLAN_STRATEGY_TARGET_FILE_MAX_BYTES"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.7.0"))))),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Flink based configs:")),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"clustering.plan.strategy.small.file.limit"),(0,i.yg)("td",{parentName:"tr",align:null},"600 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Files smaller than the size specified here are candidates for clustering, default 600 MB",(0,i.yg)("br",null),(0,i.yg)("br",null)," ",(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: CLUSTERING_PLAN_STRATEGY_SMALL_FILE_LIMIT"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"clustering.plan.strategy.target.file.max.bytes"),(0,i.yg)("td",{parentName:"tr",align:null},"1073741824 (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Each group can produce 'N' (CLUSTERING_MAX_GROUP_SIZE/CLUSTERING_TARGET_FILE_SIZE) output file groups, default 1 GB",(0,i.yg)("br",null),(0,i.yg)("br",null)," ",(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: CLUSTERING_PLAN_STRATEGY_TARGET_FILE_MAX_BYTES"))))))}u.isMDXComponent=!0}}]);