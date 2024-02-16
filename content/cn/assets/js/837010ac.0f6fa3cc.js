"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[90842],{15680:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>u});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var d=n.createContext({}),y=function(e){var t=n.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=y(e.components);return n.createElement(d.Provider,{value:t},e.children)},g="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),g=y(a),s=r,u=g["".concat(d,".").concat(s)]||g[s]||m[s]||i;return a?n.createElement(u,l(l({ref:t},p),{},{components:a})):n.createElement(u,l({ref:t},p))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=s;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[g]="string"==typeof e?e:r,l[1]=o;for(var y=2;y<i;y++)l[y]=a[y];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},34094:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>l,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=a(58168),r=(a(96540),a(15680));const i={title:"Key Generation",summary:"In this page, we describe key generation in Hudi.",toc:!0,last_modified_at:null},l=void 0,o={unversionedId:"key_generation",id:"version-0.13.0/key_generation",title:"Key Generation",description:"Every record in Hudi is uniquely identified by a primary key, which is a pair of record key and partition path where the record belongs to.",source:"@site/versioned_docs/version-0.13.0/key_generation.md",sourceDirName:".",slug:"/key_generation",permalink:"/cn/docs/0.13.0/key_generation",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.13.0/key_generation.md",tags:[],version:"0.13.0",frontMatter:{title:"Key Generation",summary:"In this page, we describe key generation in Hudi.",toc:!0,last_modified_at:null},sidebar:"docs",previous:{title:"Schema Evolution",permalink:"/cn/docs/0.13.0/schema_evolution"},next:{title:"Concurrency Control",permalink:"/cn/docs/0.13.0/concurrency_control"}},d=[{value:"Key Generators",id:"key-generators",children:[{value:"SimpleKeyGenerator",id:"simplekeygenerator",children:[],level:3},{value:"ComplexKeyGenerator",id:"complexkeygenerator",children:[],level:3},{value:"GlobalDeleteKeyGenerator",id:"globaldeletekeygenerator",children:[],level:3},{value:"NonpartitionedKeyGenerator",id:"nonpartitionedkeygenerator",children:[],level:3},{value:"CustomKeyGenerator",id:"customkeygenerator",children:[],level:3},{value:"Bring your own implementation",id:"bring-your-own-implementation",children:[],level:3},{value:"TimestampBasedKeyGenerator",id:"timestampbasedkeygenerator",children:[{value:"Timestamp is GMT",id:"timestamp-is-gmt",children:[],level:4},{value:"Timestamp is DATE_STRING",id:"timestamp-is-date_string",children:[],level:4},{value:"Scalar examples",id:"scalar-examples",children:[],level:4},{value:"ISO8601WithMsZ with Single Input format",id:"iso8601withmsz-with-single-input-format",children:[],level:4},{value:"ISO8601WithMsZ with Multiple Input formats",id:"iso8601withmsz-with-multiple-input-formats",children:[],level:4},{value:"ISO8601NoMs with offset using multiple input formats",id:"iso8601noms-with-offset-using-multiple-input-formats",children:[],level:4},{value:"Input as short date string and expect date in date format",id:"input-as-short-date-string-and-expect-date-in-date-format",children:[],level:4}],level:3}],level:2}],y={toc:d},p="wrapper";function g(e){let{components:t,...a}=e;return(0,r.yg)(p,(0,n.A)({},y,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"Every record in Hudi is uniquely identified by a primary key, which is a pair of record key and partition path where the record belongs to.\nUsing primary keys, Hudi can impose a) partition level uniqueness integrity constraint b) enable fast updates and deletes on records.\nOne should choose the partitioning scheme wisely as it could be a determining factor for your ingestion and query latency."),(0,r.yg)("p",null,"In general, Hudi supports both partitioned and global indexes. For a dataset with partitioned index(which is most commonly used), each record is uniquely identified by a pair of record key and partition path.\nBut for a dataset with global index, each record is uniquely identified by just the record key. There won't be any duplicate record keys across partitions."),(0,r.yg)("h2",{id:"key-generators"},"Key Generators"),(0,r.yg)("p",null,"Hudi provides several key generators out of the box that users can use based on their need, while having a pluggable\nimplementation for users to implement and use their own KeyGenerator. This page goes over all different types of key\ngenerators that are readily available to use."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/6f9b02decb5bb2b83709b1b6ec04a97e4d102c11/hudi-common/src/main/java/org/apache/hudi/keygen/KeyGenerator.java"},"Here"),"\nis the interface for KeyGenerator in Hudi for your reference."),(0,r.yg)("p",null,"Before diving into different types of key generators, let\u2019s go over some of the common configs required to be set for\nkey generators."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config"),(0,r.yg)("th",{parentName:"tr",align:"center"},"Meaning/purpose"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.datasource.write.recordkey.field")),(0,r.yg)("td",{parentName:"tr",align:"center"},"Refers to record key field. This is a mandatory field.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.datasource.write.partitionpath.field")),(0,r.yg)("td",{parentName:"tr",align:"center"},"Refers to partition path field. This is a mandatory field.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.datasource.write.keygenerator.class")),(0,r.yg)("td",{parentName:"tr",align:"center"},"Refers to Key generator class(including full path). Could refer to any of the available ones or user defined one. This is a mandatory field.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.datasource.write.partitionpath.urlencode")),(0,r.yg)("td",{parentName:"tr",align:"center"},"When set to true, partition path will be url encoded. Default value is false.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.datasource.write.hive_style_partitioning")),(0,r.yg)("td",{parentName:"tr",align:"center"},"When set to true, uses hive style partitioning. Partition field name will be prefixed to the value. Format: \u201c<partition_path_field_name>=<partition_path_value>\u201d. Default value is false.")))),(0,r.yg)("p",null,"There are few more configs involved if you are looking for TimestampBasedKeyGenerator. Will cover those in the respective section."),(0,r.yg)("p",null,"Lets go over different key generators available to be used with Hudi."),(0,r.yg)("h3",{id:"simplekeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/SimpleKeyGenerator.java"},"SimpleKeyGenerator")),(0,r.yg)("p",null,"Record key refers to one field(column in dataframe) by name and partition path refers to one field (single column in dataframe)\nby name. This is one of the most commonly used one. Values are interpreted as is from dataframe and converted to string."),(0,r.yg)("h3",{id:"complexkeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/ComplexKeyGenerator.java"},"ComplexKeyGenerator")),(0,r.yg)("p",null,"Both record key and partition paths comprise one or more than one field by name(combination of multiple fields). Fields\nare expected to be comma separated in the config value. For example ",(0,r.yg)("inlineCode",{parentName:"p"},'"Hoodie.datasource.write.recordkey.field" : \u201ccol1,col4\u201d')),(0,r.yg)("h3",{id:"globaldeletekeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/GlobalDeleteKeyGenerator.java"},"GlobalDeleteKeyGenerator")),(0,r.yg)("p",null,"Global index deletes do not require partition value. So this key generator avoids using partition value for generating HoodieKey."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("em",{parentName:"strong"},"NOTE:")),'\nThe "GlobalDeleteKeyGenerator" has to be used with a global index to delete records solely based on the record key.\nIt works for a batch with deletes only. The key generator can be used for both partitioned and non-partitioned table. Note that\nwhen using this key generator, the config ',(0,r.yg)("inlineCode",{parentName:"p"},"hoodie.[bloom|simple|hbase].index.update.partition.path")," should be set to\n",(0,r.yg)("inlineCode",{parentName:"p"},"false")," in order to avoid redundant data written to the storage."),(0,r.yg)("h3",{id:"nonpartitionedkeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/NonpartitionedKeyGenerator.java"},"NonpartitionedKeyGenerator")),(0,r.yg)("p",null,"If your hudi dataset is not partitioned, you could use this \u201cNonpartitionedKeyGenerator\u201d which will return an empty\npartition for all records. In other words, all records go to the same partition (which is empty \u201c\u201d)"),(0,r.yg)("h3",{id:"customkeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/CustomKeyGenerator.java"},"CustomKeyGenerator")),(0,r.yg)("p",null,"This is a generic implementation of KeyGenerator where users are able to leverage the benefits of SimpleKeyGenerator,\nComplexKeyGenerator and TimestampBasedKeyGenerator all at the same time. One can configure record key and partition\npaths as a single field or a combination of fields. "),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.recordkey.field\nhoodie.datasource.write.partitionpath.field\nhoodie.datasource.write.keygenerator.class=org.apache.hudi.keygen.CustomKeyGenerator\n")),(0,r.yg)("p",null,"This keyGenerator is particularly useful if you want to define\ncomplex partition paths involving regular fields and timestamp based fields. It expects value for prop ",(0,r.yg)("inlineCode",{parentName:"p"},'"hoodie.datasource.write.partitionpath.field"'),'\nin a specific format. The format should be "field1:PartitionKeyType1,field2:PartitionKeyType2..."'),(0,r.yg)("p",null,"The complete partition path is created as\n",(0,r.yg)("inlineCode",{parentName:"p"},"<value for field1 basis PartitionKeyType1>/<value for field2 basis PartitionKeyType2> "),"\nand so on. Each partition key type could either be SIMPLE or TIMESTAMP."),(0,r.yg)("p",null,"Example config value: ",(0,r.yg)("inlineCode",{parentName:"p"},"\u201cfield_3:simple,field_5:timestamp\u201d")),(0,r.yg)("p",null,"RecordKey config value is either single field incase of SimpleKeyGenerator or a comma separate field names if referring to ComplexKeyGenerator.\nExample:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.recordkey.field=field1,field2\n")),(0,r.yg)("p",null,"This will create your record key in the format ",(0,r.yg)("inlineCode",{parentName:"p"},"field1:value1,field2:value2")," and so on, otherwise you can specify only one field in case of simple record keys. ",(0,r.yg)("inlineCode",{parentName:"p"},"CustomKeyGenerator")," class defines an enum ",(0,r.yg)("inlineCode",{parentName:"p"},"PartitionKeyType")," for configuring partition paths. It can take two possible values - SIMPLE and TIMESTAMP.\nThe value for ",(0,r.yg)("inlineCode",{parentName:"p"},"hoodie.datasource.write.partitionpath.field")," property in case of partitioned tables needs to be provided in the format ",(0,r.yg)("inlineCode",{parentName:"p"},"field1:PartitionKeyType1,field2:PartitionKeyType2")," and so on. For example, if you want to create partition path using 2 fields ",(0,r.yg)("inlineCode",{parentName:"p"},"country")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"date")," where the latter has timestamp based values and needs to be customised in a given format, you can specify the following"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-java"},"hoodie.datasource.write.partitionpath.field=country:SIMPLE,date:TIMESTAMP\n")),(0,r.yg)("p",null,"This will create the partition path in the format ",(0,r.yg)("inlineCode",{parentName:"p"},"<country_name>/<date>")," or ",(0,r.yg)("inlineCode",{parentName:"p"},"country=<country_name>/date=<date>")," depending on whether you want hive style partitioning or not."),(0,r.yg)("h3",{id:"bring-your-own-implementation"},"Bring your own implementation"),(0,r.yg)("p",null,"You can implement your own custom key generator by extending the public API class here:"),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-common/src/main/java/org/apache/hudi/keygen/KeyGenerator.java"},"https://github.com/apache/hudi/blob/master/hudi-common/src/main/java/org/apache/hudi/keygen/KeyGenerator.java")),(0,r.yg)("h3",{id:"timestampbasedkeygenerator"},(0,r.yg)("a",{parentName:"h3",href:"https://github.com/apache/hudi/blob/master/hudi-client/hudi-spark-client/src/main/java/org/apache/hudi/keygen/TimestampBasedKeyGenerator.java"},"TimestampBasedKeyGenerator")),(0,r.yg)("p",null,"This key generator relies on timestamps for the partition field. The field values are interpreted as timestamps\nand not just converted to string while generating partition path value for records.  Record key is same as before where it is chosen by\nfield name.  Users are expected to set few more configs to use this KeyGenerator."),(0,r.yg)("p",null,"Configs to be set:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config"),(0,r.yg)("th",{parentName:"tr",align:null},"Meaning/purpose"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},"One of the timestamp types supported(UNIX_TIMESTAMP, DATE_STRING, MIXED, EPOCHMILLISECONDS, SCALAR)")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"Output date format")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},"Timezone of the data format")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"oodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"Input date format")))),(0,r.yg)("p",null,"Let's go over some example values for TimestampBasedKeyGenerator."),(0,r.yg)("h4",{id:"timestamp-is-gmt"},"Timestamp is GMT"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"EPOCHMILLISECONDS"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyy-MM-dd hh"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"GMT+8:00"')))),(0,r.yg)("p",null,"Input Field value: \u201c1578283932000L\u201d ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c2020-01-06 12\u201d"),(0,r.yg)("p",null,"If input field value is null for some rows. ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c1970-01-01 08\u201d"),(0,r.yg)("h4",{id:"timestamp-is-date_string"},"Timestamp is DATE_STRING"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"DATE_STRING"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyy-MM-dd hh"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"GMT+8:00"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyy-MM-dd hh:mm:ss"')))),(0,r.yg)("p",null,"Input field value: \u201c2020-01-06 12:12:12\u201d ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c2020-01-06 12\u201d"),(0,r.yg)("p",null,"If input field value is null for some rows. ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c1970-01-01 12:00:00\u201d"),(0,r.yg)("br",null),(0,r.yg)("h4",{id:"scalar-examples"},"Scalar examples"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"SCALAR"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyy-MM-dd hh"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"GMT"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.scalar.time.unit")),(0,r.yg)("td",{parentName:"tr",align:null},'"days"')))),(0,r.yg)("p",null,"Input field value: \u201c20000L\u201d ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c2024-10-04 12\u201d"),(0,r.yg)("p",null,"If input field value is null. ",(0,r.yg)("br",null),"\nPartition path generated from key generator: \u201c1970-01-02 12\u201d"),(0,r.yg)("h4",{id:"iso8601withmsz-with-single-input-format"},"ISO8601WithMsZ with Single Input format"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"DATE_STRING"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"\"yyyy-MM-dd'T'HH:mm:ss.SSSZ\"")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat.list.delimiter.regex")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyyMMddHH"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"GMT"')))),(0,r.yg)("p",null,'Input field value: "2020-04-01T13:01:33.428Z" ',(0,r.yg)("br",null),'\nPartition path generated from key generator: "2020040113"'),(0,r.yg)("h4",{id:"iso8601withmsz-with-multiple-input-formats"},"ISO8601WithMsZ with Multiple Input formats"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"DATE_STRING"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"\"yyyy-MM-dd'T'HH:mm:ssZ,yyyy-MM-dd'T'HH:mm:ss.SSSZ\"")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat.list.delimiter.regex")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyyMMddHH"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"UTC"')))),(0,r.yg)("p",null,'Input field value: "2020-04-01T13:01:33.428Z" ',(0,r.yg)("br",null),'\nPartition path generated from key generator: "2020040113"'),(0,r.yg)("h4",{id:"iso8601noms-with-offset-using-multiple-input-formats"},"ISO8601NoMs with offset using multiple input formats"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"DATE_STRING"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"\"yyyy-MM-dd'T'HH:mm:ssZ,yyyy-MM-dd'T'HH:mm:ss.SSSZ\"")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat.list.delimiter.regex")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"yyyyMMddHH"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"UTC"')))),(0,r.yg)("p",null,'Input field value: "2020-04-01T13:01:33-',(0,r.yg)("strong",{parentName:"p"},"05:00"),'" ',(0,r.yg)("br",null),'\nPartition path generated from key generator: "2020040118"'),(0,r.yg)("h4",{id:"input-as-short-date-string-and-expect-date-in-date-format"},"Input as short date string and expect date in date format"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Config field"),(0,r.yg)("th",{parentName:"tr",align:null},"Value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.timestamp.type")),(0,r.yg)("td",{parentName:"tr",align:null},'"DATE_STRING"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},"\"yyyy-MM-dd'T'HH:mm:ssZ,yyyy-MM-dd'T'HH:mm:ss.SSSZ,yyyyMMdd\"")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.dateformat.list.delimiter.regex")),(0,r.yg)("td",{parentName:"tr",align:null},'""')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.input.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"UTC"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.dateformat")),(0,r.yg)("td",{parentName:"tr",align:null},'"MM/dd/yyyy"')),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"hoodie.deltastreamer.keygen.timebased.output.timezone")),(0,r.yg)("td",{parentName:"tr",align:null},'"UTC"')))),(0,r.yg)("p",null,'Input field value: "20200401" ',(0,r.yg)("br",null),'\nPartition path generated from key generator: "04/01/2020"'))}g.isMDXComponent=!0}}]);