"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[89362],{15680:(e,t,i)=>{i.d(t,{xA:()=>d,yg:()=>h});var a=i(96540);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,a,n=function(e,t){if(null==e)return{};var i,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var i=e.components,n=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(i),m=n,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return i?a.createElement(h,o(o({ref:t},d),{},{components:i})):a.createElement(h,o({ref:t},d))}));function h(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=i.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<r;p++)o[p]=i[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,i)}m.displayName="MDXCreateElement"},86417:(e,t,i)=>{i.r(t),i.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var a=i(58168),n=(i(96540),i(15680));const r={title:"Write Operations",summary:"In this page, we describe the different write operations in Hudi.",toc:!0,last_modified_at:null},o=void 0,l={unversionedId:"write_operations",id:"version-0.10.0/write_operations",title:"Write Operations",description:"It may be helpful to understand the different write operations of Hudi and how best to leverage them. These operations",source:"@site/versioned_docs/version-0.10.0/write_operations.md",sourceDirName:".",slug:"/write_operations",permalink:"/docs/0.10.0/write_operations",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.10.0/write_operations.md",tags:[],version:"0.10.0",frontMatter:{title:"Write Operations",summary:"In this page, we describe the different write operations in Hudi.",toc:!0,last_modified_at:null},sidebar:"version-0.10.0/docs",previous:{title:"Metadata Table",permalink:"/docs/0.10.0/metadata"},next:{title:"Schema Evolution",permalink:"/docs/0.10.0/schema_evolution"}},s=[{value:"Operation Types",id:"operation-types",children:[{value:"UPSERT",id:"upsert",children:[],level:3},{value:"INSERT",id:"insert",children:[],level:3},{value:"BULK_INSERT",id:"bulk_insert",children:[],level:3},{value:"DELETE",id:"delete",children:[],level:3}],level:2},{value:"Writing path",id:"writing-path",children:[],level:2}],p={toc:s},d="wrapper";function c(e){let{components:t,...i}=e;return(0,n.yg)(d,(0,a.A)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"It may be helpful to understand the different write operations of Hudi and how best to leverage them. These operations\ncan be chosen/changed across each commit/deltacommit issued against the table. See the ",(0,n.yg)("a",{parentName:"p",href:"/docs/writing_data"},"How To docs on Writing Data"),"\nto see more examples."),(0,n.yg)("h2",{id:"operation-types"},"Operation Types"),(0,n.yg)("h3",{id:"upsert"},"UPSERT"),(0,n.yg)("p",null,"This is the default operation where the input records are first tagged as inserts or updates by looking up the index.\nThe records are ultimately written after heuristics are run to determine how best to pack them on storage to optimize for things like file sizing.\nThis operation is recommended for use-cases like database change capture where the input almost certainly contains updates. The target table will never show duplicates. "),(0,n.yg)("h3",{id:"insert"},"INSERT"),(0,n.yg)("p",null,"This operation is very similar to upsert in terms of heuristics/file sizing but completely skips the index lookup step. Thus, it can be a lot faster than upserts\nfor use-cases like log de-duplication (in conjunction with options to filter duplicates mentioned below). This is also suitable for use-cases where the table can tolerate duplicates, but just\nneed the transactional writes/incremental pull/storage management capabilities of Hudi."),(0,n.yg)("h3",{id:"bulk_insert"},"BULK_INSERT"),(0,n.yg)("p",null,"Both upsert and insert operations keep input records in memory to speed up storage heuristics computations faster (among other things) and thus can be cumbersome for\ninitial loading/bootstrapping a Hudi table at first. Bulk insert provides the same semantics as insert, while implementing a sort-based data writing algorithm, which can scale very well for several hundred TBs\nof initial load. However, this just does a best-effort job at sizing files vs guaranteeing file sizes like inserts/upserts do."),(0,n.yg)("h3",{id:"delete"},"DELETE"),(0,n.yg)("p",null,"Hudi supports implementing two types of deletes on data stored in Hudi tables, by enabling the user to specify a different record payload implementation."),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"Soft Deletes")," : Retain the record key and just null out the values for all the other fields.\nThis can be achieved by ensuring the appropriate fields are nullable in the table schema and simply upserting the table after setting these fields to null."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("strong",{parentName:"li"},"Hard Deletes")," : A stronger form of deletion is to physically remove any trace of the record from the table. This can be achieved in 3 different ways. ",(0,n.yg)("ul",{parentName:"li"},(0,n.yg)("li",{parentName:"ul"},"Using DataSource, set ",(0,n.yg)("inlineCode",{parentName:"li"},"OPERATION_OPT_KEY")," to ",(0,n.yg)("inlineCode",{parentName:"li"},"DELETE_OPERATION_OPT_VAL"),". This will remove all the records in the DataSet being submitted. "),(0,n.yg)("li",{parentName:"ul"},"Using DataSource, set ",(0,n.yg)("inlineCode",{parentName:"li"},"PAYLOAD_CLASS_OPT_KEY")," to ",(0,n.yg)("inlineCode",{parentName:"li"},'"org.apache.hudi.EmptyHoodieRecordPayload"'),". This will remove all the records in the DataSet being submitted. "),(0,n.yg)("li",{parentName:"ul"},"Using DataSource or DeltaStreamer, add a column named ",(0,n.yg)("inlineCode",{parentName:"li"},"_hoodie_is_deleted")," to DataSet. The value of this column must be set to ",(0,n.yg)("inlineCode",{parentName:"li"},"true")," for all the records to be deleted and either ",(0,n.yg)("inlineCode",{parentName:"li"},"false")," or left null for any records which are to be upserted.")))),(0,n.yg)("h2",{id:"writing-path"},"Writing path"),(0,n.yg)("p",null,"The following is an inside look on the Hudi write path and the sequence of events that occur during a write."),(0,n.yg)("ol",null,(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/configurations/#writeinsertdeduplicate"},"Deduping"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"First your input records may have duplicate keys within the same batch and duplicates need to be combined or reduced by key."))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/indexing"},"Index Lookup"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Next, an index lookup is performed to try and match the input records to identify which file groups they belong to."))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/file_sizing"},"File Sizing"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Then, based on the average size of previous commits, Hudi will make a plan to add enough records to a small file to get it close to the configured maximum limit."))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/file_layouts"},"Partitioning"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"We now arrive at partitioning where we decide what file groups certain updates and inserts will be placed in or if new file groups will be created"))),(0,n.yg)("li",{parentName:"ol"},"Write I/O",(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Now we actually do the write operations which is either creating a new base file, appending to the log file,\nor versioning an existing base file."))),(0,n.yg)("li",{parentName:"ol"},"Update ",(0,n.yg)("a",{parentName:"li",href:"/docs/indexing"},"Index"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Now that the write is performed, we will go back and update the index."))),(0,n.yg)("li",{parentName:"ol"},"Commit",(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Finally we commit all of these changes atomically. (A ",(0,n.yg)("a",{parentName:"li",href:"/docs/writing_data#commit-notifications"},"callback notification")," is exposed)"))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/hoodie_cleaner"},"Clean")," (if needed)",(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Following the commit, cleaning is invoked if needed."))),(0,n.yg)("li",{parentName:"ol"},(0,n.yg)("a",{parentName:"li",href:"/docs/compaction"},"Compaction"),(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"If you are using MOR tables, compaction will either run inline, or be scheduled asynchronously"))),(0,n.yg)("li",{parentName:"ol"},"Archive",(0,n.yg)("ol",{parentName:"li"},(0,n.yg)("li",{parentName:"ol"},"Lastly, we perform an archival step which moves old ",(0,n.yg)("a",{parentName:"li",href:"/docs/timeline"},"timeline")," items to an archive folder.")))))}c.isMDXComponent=!0}}]);