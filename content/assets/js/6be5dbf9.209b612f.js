"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[88696],{15680:(e,t,n)=>{n.d(t,{xA:()=>m,yg:()=>g});var i=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),p=c(n),u=a,g=p["".concat(s,".").concat(u)]||p[u]||d[u]||r;return n?i.createElement(g,o(o({ref:t},m),{},{components:n})):i.createElement(g,o({ref:t},m))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},16201:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var i=n(58168),a=(n(96540),n(15680));const r={title:"Timeline",toc:!0},o=void 0,l={unversionedId:"timeline",id:"version-0.10.1/timeline",title:"Timeline",description:"Timeline",source:"@site/versioned_docs/version-0.10.1/timeline.md",sourceDirName:".",slug:"/timeline",permalink:"/docs/0.10.1/timeline",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.10.1/timeline.md",tags:[],version:"0.10.1",frontMatter:{title:"Timeline",toc:!0},sidebar:"version-0.10.1/docs",previous:{title:"Docker Demo",permalink:"/docs/0.10.1/docker_demo"},next:{title:"Table & Query Types",permalink:"/docs/0.10.1/table_types"}},s=[{value:"Timeline",id:"timeline",children:[],level:2}],c={toc:s},m="wrapper";function p(e){let{components:t,...r}=e;return(0,a.yg)(m,(0,i.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h2",{id:"timeline"},"Timeline"),(0,a.yg)("p",null,"At its core, Hudi maintains a ",(0,a.yg)("inlineCode",{parentName:"p"},"timeline")," of all actions performed on the table at different ",(0,a.yg)("inlineCode",{parentName:"p"},"instants")," of time that helps provide instantaneous views of the table,\nwhile also efficiently supporting retrieval of data in the order of arrival. A Hudi instant consists of the following components"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"Instant action")," : Type of action performed on the table"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"Instant time")," : Instant time is typically a timestamp (e.g: 20190117010349), which monotonically increases in the order of action's begin time."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"state")," : current state of the instant")),(0,a.yg)("p",null,"Hudi guarantees that the actions performed on the timeline are atomic & timeline consistent based on the instant time."),(0,a.yg)("p",null,"Key actions performed include"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"COMMITS")," - A commit denotes an ",(0,a.yg)("strong",{parentName:"li"},"atomic write")," of a batch of records into a table."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"CLEANS")," - Background activity that gets rid of older versions of files in the table, that are no longer needed."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"DELTA_COMMIT")," - A delta commit refers to an ",(0,a.yg)("strong",{parentName:"li"},"atomic write")," of a batch of records into a  MergeOnRead type table, where some/all of the data could be just written to delta logs."),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"COMPACTION")," - Background activity to reconcile differential data structures within Hudi e.g: moving updates from row based log files to columnar formats. Internally, compaction manifests as a special commit on the timeline"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"ROLLBACK")," - Indicates that a commit/delta commit was unsuccessful & rolled back, removing any partial files produced during such a write"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"SAVEPOINT"),' - Marks certain file groups as "saved", such that cleaner will not delete them. It helps restore the table to a point on the timeline, in case of disaster/data recovery scenarios.')),(0,a.yg)("p",null,"Any given instant can be\nin one of the following states"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"REQUESTED")," - Denotes an action has been scheduled, but has not initiated"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"INFLIGHT")," - Denotes that the action is currently being performed"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"COMPLETED")," - Denotes completion of an action on the timeline")),(0,a.yg)("figure",null,(0,a.yg)("img",{className:"docimage",src:n(20969).A,alt:"hudi_timeline.png"})),(0,a.yg)("p",null,"Example above shows upserts happenings between 10:00 and 10:20 on a Hudi table, roughly every 5 mins, leaving commit metadata on the Hudi timeline, along\nwith other background cleaning/compactions. One key observation to make is that the commit time indicates the ",(0,a.yg)("inlineCode",{parentName:"p"},"arrival time")," of the data (10:20AM), while the actual data\norganization reflects the actual time or ",(0,a.yg)("inlineCode",{parentName:"p"},"event time"),", the data was intended for (hourly buckets from 07:00). These are two key concepts when reasoning about tradeoffs between latency and completeness of data."),(0,a.yg)("p",null,"When there is late arriving data (data intended for 9:00 arriving >1 hr late at 10:20), we can see the upsert producing new data into even older time buckets/folders.\nWith the help of the timeline, an incremental query attempting to get all new data that was committed successfully since 10:00 hours, is able to very efficiently consume\nonly the changed files without say scanning all the time buckets > 07:00."))}p.isMDXComponent=!0},20969:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/hudi_timeline-bf5d8c5e59180434796d82af2b783e6c.png"}}]);