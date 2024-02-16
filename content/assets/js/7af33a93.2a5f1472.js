"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[81410],{15680:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>h});var o=a(96540);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,o,i=function(e,t){if(null==e)return{};var a,o,i={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=o.createContext({}),d=function(e){var t=o.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=d(e.components);return o.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},g=o.forwardRef((function(e,t){var a=e.components,i=e.mdxType,n=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(a),g=i,h=c["".concat(s,".").concat(g)]||c[g]||u[g]||n;return a?o.createElement(h,r(r({ref:t},p),{},{components:a})):o.createElement(h,r({ref:t},p))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=a.length,r=new Array(n);r[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,r[1]=l;for(var d=2;d<n;d++)r[d]=a[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,a)}g.displayName="MDXCreateElement"},78039:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>r,default:()=>c,frontMatter:()=>n,metadata:()=>l,toc:()=>s});var o=a(58168),i=(a(96540),a(15680));const n={title:"Bootstrapping",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing table into a Hudi table",last_modified_at:new Date("2019-12-30T19:59:57.000Z"),toc:!0,toc_min_heading_level:2,toc_max_heading_level:4},r=void 0,l={unversionedId:"migration_guide",id:"version-0.14.1/migration_guide",title:"Bootstrapping",description:"Hudi maintains metadata such as commit timeline and indexes to manage a table. The commit timelines helps to understand the actions happening on a table as well as the current state of a table. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.",source:"@site/versioned_docs/version-0.14.1/migration_guide.md",sourceDirName:".",slug:"/migration_guide",permalink:"/docs/migration_guide",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.14.1/migration_guide.md",tags:[],version:"0.14.1",frontMatter:{title:"Bootstrapping",keywords:["hudi","migration","use case"],summary:"In this page, we will discuss some available tools for migrating your existing table into a Hudi table",last_modified_at:"2019-12-30T19:59:57.000Z",toc:!0,toc_min_heading_level:2,toc_max_heading_level:4},sidebar:"docs",previous:{title:"OneTable",permalink:"/docs/syncing_onetable"},next:{title:"Compaction",permalink:"/docs/compaction"}},s=[{value:"Approaches",id:"approaches",children:[{value:"Use Hudi for new partitions alone",id:"use-hudi-for-new-partitions-alone",children:[],level:3},{value:"Convert existing table to Hudi",id:"convert-existing-table-to-hudi",children:[{value:"Using Hudi Streamer",id:"using-hudi-streamer",children:[],level:4},{value:"Using Spark Datasource Writer",id:"using-spark-datasource-writer",children:[],level:4},{value:"Using Spark SQL CALL Procedure",id:"using-spark-sql-call-procedure",children:[],level:4},{value:"Using Hudi CLI",id:"using-hudi-cli",children:[],level:4}],level:3}],level:2},{value:"Configs",id:"configs",children:[],level:2},{value:"Related Resources",id:"related-resources",children:[],level:2}],d={toc:s},p="wrapper";function c(e){let{components:t,...a}=e;return(0,i.yg)(p,(0,o.A)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"Hudi maintains metadata such as commit timeline and indexes to manage a table. The commit timelines helps to understand the actions happening on a table as well as the current state of a table. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats.\nTo be able to start using Hudi for your existing table, you will need to migrate your existing table into a Hudi managed table. There are a couple of ways to achieve this."),(0,i.yg)("h2",{id:"approaches"},"Approaches"),(0,i.yg)("h3",{id:"use-hudi-for-new-partitions-alone"},"Use Hudi for new partitions alone"),(0,i.yg)("p",null,"Hudi can be used to manage an existing table without affecting/altering the historical data already present in the\ntable. Hudi has been implemented to be compatible with such a mixed table with a caveat that either the complete\nHive partition is Hudi managed or not. Thus the lowest granularity at which Hudi manages a table is a Hive\npartition. Start using the datasource API or the WriteClient to write to the table and make sure you start writing\nto a new partition or convert your last N partitions into Hudi instead of the entire table. Note, since the historical\npartitions are not managed by HUDI, none of the primitives provided by HUDI work on the data in those partitions. More concretely, one cannot perform upserts or incremental pull on such older partitions not managed by the HUDI table.\nTake this approach if your table is an append only type of table and you do not expect to perform any updates to existing (or non Hudi managed) partitions."),(0,i.yg)("h3",{id:"convert-existing-table-to-hudi"},"Convert existing table to Hudi"),(0,i.yg)("p",null,"Import your existing table into a Hudi managed table. Since all the data is Hudi managed, none of the limitations\nof Approach 1 apply here. Updates spanning any partitions can be applied to this table and Hudi will efficiently\nmake the update available to queries. Note that not only do you get to use all Hudi primitives on this table,\nthere are other additional advantages of doing this. Hudi automatically manages file sizes of a Hudi managed table\n. You can define the desired file size when converting this table and Hudi will ensure it writes out files\nadhering to the config. It will also ensure that smaller files later get corrected by routing some new inserts into\nsmall files rather than writing new small ones thus maintaining the health of your cluster."),(0,i.yg)("p",null,"There are a few options when choosing this approach."),(0,i.yg)("h4",{id:"using-hudi-streamer"},"Using Hudi Streamer"),(0,i.yg)("p",null,"Use the ",(0,i.yg)("a",{parentName:"p",href:"/docs/hoodie_streaming_ingestion#hudi-streamer"},"Hudi Streamer")," tool. HoodieStreamer supports bootstrap with\n--run-bootstrap command line option. There are two types of bootstrap, METADATA_ONLY and FULL_RECORD. METADATA_ONLY will\ngenerate just skeleton base files with keys/footers, avoiding full cost of rewriting the dataset. FULL_RECORD will\nperform a full copy/rewrite of the data as a Hudi table.  Additionally, once can choose selective partitions using regex\npatterns to apply one of the above bootstrap modes. "),(0,i.yg)("p",null,"Here is an example for running FULL_RECORD bootstrap on all partitions that match the regex pattern ",(0,i.yg)("inlineCode",{parentName:"p"},".*")," and keeping\nhive style partition with HoodieStreamer. This example configures\n",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodiebootstrapmodeselector"},"hoodie.bootstrap.mode.selector")," to\n",(0,i.yg)("inlineCode",{parentName:"p"},"org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector"),"  which allows applying ",(0,i.yg)("inlineCode",{parentName:"p"},"FULL_RECORD")," bootstrap\nmode to selective partitions based on the regex pattern ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#hoodiebootstrapmodeselectorregex"},"hoodie.bootstrap.mode.selector.regex")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre"},"spark-submit --master local \\\n--conf 'spark.serializer=org.apache.spark.serializer.KryoSerializer' \\\n--class org.apache.hudi.utilities.streamer.HoodieStreamer `ls packaging/hudi-utilities-bundle/target/hudi-utilities-bundle-*.jar` \\\n--run-bootstrap \\\n--target-base-path /tmp/hoodie/bootstrap_table \\\n--target-table bootstrap_table \\\n--table-type COPY_ON_WRITE \\\n--hoodie-conf hoodie.bootstrap.base.path=/tmp/source_table \\\n--hoodie-conf hoodie.datasource.write.recordkey.field=${KEY_FIELD} \\\n--hoodie-conf hoodie.datasource.write.partitionpath.field=${PARTITION_FIELD} \\\n--hoodie-conf hoodie.datasource.write.precombine.field=${PRECOMBINE_FILED} \\\n--hoodie-conf hoodie.bootstrap.keygen.class=org.apache.hudi.keygen.SimpleKeyGenerator \\\n--hoodie-conf hoodie.bootstrap.mode.selector=org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector \\\n--hoodie-conf hoodie.bootstrap.mode.selector.regex='.*' \\\n--hoodie-conf hoodie.bootstrap.mode.selector.regex.mode=FULL_RECORD \\\n--hoodie-conf hoodie.datasource.write.hive_style_partitioning=true\n")),(0,i.yg)("h4",{id:"using-spark-datasource-writer"},"Using Spark Datasource Writer"),(0,i.yg)("p",null,"For huge tables, this could be as simple as : "),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'for partition in [list of partitions in source table] {\n        val inputDF = spark.read.format("any_input_format").load("partition_path")\n        inputDF.write.format("org.apache.hudi").option()....save("basePath")\n}\n')),(0,i.yg)("h4",{id:"using-spark-sql-call-procedure"},"Using Spark SQL CALL Procedure"),(0,i.yg)("p",null,"Refer to ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/next/procedures#bootstrap"},"Bootstrap procedure")," for more details. "),(0,i.yg)("h4",{id:"using-hudi-cli"},"Using Hudi CLI"),(0,i.yg)("p",null,"Write your own custom logic of how to load an existing table into a Hudi managed one. Please read about the RDD API\n",(0,i.yg)("a",{parentName:"p",href:"/docs/quick-start-guide"},"here"),". Using the bootstrap run CLI. Once hudi has been built via ",(0,i.yg)("inlineCode",{parentName:"p"},"mvn clean install -DskipTests"),", the shell can be\nfired by via ",(0,i.yg)("inlineCode",{parentName:"p"},"cd hudi-cli && ./hudi-cli.sh"),"."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"hudi->bootstrap run --srcPath /tmp/source_table --targetPath /tmp/hoodie/bootstrap_table --tableName bootstrap_table --tableType COPY_ON_WRITE --rowKeyField ${KEY_FIELD} --partitionPathField ${PARTITION_FIELD} --sparkMaster local --hoodieConfigs hoodie.datasource.write.hive_style_partitioning=true --selectorClass org.apache.hudi.client.bootstrap.selector.FullRecordBootstrapModeSelector\n")),(0,i.yg)("p",null,'Unlike Hudi Streamer, FULL_RECORD or METADATA_ONLY is set with --selectorClass, see details with help "bootstrap run".'),(0,i.yg)("h2",{id:"configs"},"Configs"),(0,i.yg)("p",null,"Here are the basic configs that control bootstrapping."),(0,i.yg)("table",null,(0,i.yg)("thead",{parentName:"table"},(0,i.yg)("tr",{parentName:"thead"},(0,i.yg)("th",{parentName:"tr",align:null},"Config Name"),(0,i.yg)("th",{parentName:"tr",align:null},"Default"),(0,i.yg)("th",{parentName:"tr",align:null},"Description"))),(0,i.yg)("tbody",{parentName:"table"},(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.bootstrap.base.path"),(0,i.yg)("td",{parentName:"tr",align:null},"N/A ",(0,i.yg)("strong",{parentName:"td"},"(Required)")),(0,i.yg)("td",{parentName:"tr",align:null},"Base path of the dataset that needs to be bootstrapped as a Hudi table",(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: BASE_PATH"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.bootstrap.mode.selector"),(0,i.yg)("td",{parentName:"tr",align:null},"org.apache.hudi.client.bootstrap.selector.MetadataOnlyBootstrapModeSelector (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Selects the mode in which each file/partition in the bootstrapped dataset gets bootstrapped",(0,i.yg)("br",null),"Possible values:",(0,i.yg)("ul",null,(0,i.yg)("li",null,(0,i.yg)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.MetadataOnlyBootstrapModeSelector"),": In this mode, the full record data is not copied into Hudi therefore it avoids full cost of rewriting the dataset. Instead, 'skeleton' files containing just the corresponding metadata columns are added to the Hudi table. Hudi relies on the data in the original table and will face data-loss or corruption if files in the original table location are deleted or modified."),(0,i.yg)("li",null,(0,i.yg)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.FullRecordBootstrapModeSelector"),": In this mode, the full record data is copied into hudi and metadata columns are added. A full record bootstrap is functionally equivalent to a bulk-insert. After a full record bootstrap, Hudi will function properly even if the original table is modified or deleted."),(0,i.yg)("li",null,(0,i.yg)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector"),": A bootstrap selector which employs bootstrap mode by specified partitions.")),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: MODE_SELECTOR_CLASS_NAME"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.bootstrap.mode.selector.regex"),(0,i.yg)("td",{parentName:"tr",align:null},".* (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"Matches each bootstrap dataset partition against this regex and applies the mode below to it. This is ",(0,i.yg)("strong",{parentName:"td"},"applicable only when")," ",(0,i.yg)("inlineCode",{parentName:"td"},"hoodie.bootstrap.mode.selector")," equals ",(0,i.yg)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector"),(0,i.yg)("br",null),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARTITION_SELECTOR_REGEX_PATTERN"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))),(0,i.yg)("tr",{parentName:"tbody"},(0,i.yg)("td",{parentName:"tr",align:null},"hoodie.bootstrap.mode.selector.regex.mode"),(0,i.yg)("td",{parentName:"tr",align:null},"METADATA_ONLY (Optional)"),(0,i.yg)("td",{parentName:"tr",align:null},"When specified, applies one of the possible ",(0,i.yg)("u",null,(0,i.yg)("a",{parentName:"td",href:"https://github.com/apache/hudi/blob/bc583b4158684c23f35d787de5afda13c2865ad4/hudi-client/hudi-client-common/src/main/java/org/apache/hudi/client/bootstrap/BootstrapMode.java"},"Bootstrap Modes"))," to the partitions that match the regex provided as part of the ",(0,i.yg)("inlineCode",{parentName:"td"},"hoodie.bootstrap.mode.selector.regex"),". For unmatched partitions the other Bootstrap Mode is applied. This is ",(0,i.yg)("strong",{parentName:"td"},"applicable only when")," ",(0,i.yg)("inlineCode",{parentName:"td"},"hoodie.bootstrap.mode.selector")," equals ",(0,i.yg)("inlineCode",{parentName:"td"},"org.apache.hudi.client.bootstrap.selector.BootstrapRegexModeSelector"),".",(0,i.yg)("br",null),"Possible values: ",(0,i.yg)("ul",null,(0,i.yg)("li",null,(0,i.yg)("u",null,(0,i.yg)("a",{parentName:"td",href:"https://github.com/apache/hudi/blob/bc583b4158684c23f35d787de5afda13c2865ad4/hudi-client/hudi-client-common/src/main/java/org/apache/hudi/client/bootstrap/BootstrapMode.java#L36C5-L36C5"},"FULL_RECORD"))),(0,i.yg)("li",null,(0,i.yg)("u",null,(0,i.yg)("a",{parentName:"td",href:"https://github.com/apache/hudi/blob/bc583b4158684c23f35d787de5afda13c2865ad4/hudi-client/hudi-client-common/src/main/java/org/apache/hudi/client/bootstrap/BootstrapMode.java#L44C4-L44C4"},"METADATA_ONLY")))),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Config Param: PARTITION_SELECTOR_REGEX_MODE"),(0,i.yg)("br",null),(0,i.yg)("inlineCode",{parentName:"td"},"Since Version: 0.6.0"))))),(0,i.yg)("p",null,"By default, with only ",(0,i.yg)("inlineCode",{parentName:"p"},"hoodie.bootstrap.base.path")," being provided METADATA_ONLY mode is selected. For other options, please refer ",(0,i.yg)("a",{parentName:"p",href:"https://hudi.apache.org/docs/next/configurations#Bootstrap-Configs"},"bootstrap configs")," for more details."),(0,i.yg)("h2",{id:"related-resources"},"Related Resources"),(0,i.yg)("h3",null,"Videos"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=iTNLqbW3YYA"},"Bootstrapping in Apache Hudi on EMR Serverless with Lab"))))}c.isMDXComponent=!0}}]);