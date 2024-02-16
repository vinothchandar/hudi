"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[48097],{15680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>g});var n=r(96540);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),d=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},p=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=d(r),m=i,g=c["".concat(l,".").concat(m)]||c[m]||s[m]||a;return r?n.createElement(g,u(u({ref:t},p),{},{components:r})):n.createElement(g,u({ref:t},p))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,u=new Array(a);u[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[c]="string"==typeof e?e:i,u[1]=o;for(var d=2;d<a;d++)u[d]=r[d];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},56723:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>u,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var n=r(58168),i=(r(96540),r(15680));const a={title:"\u8fc1\u79fb\u6307\u5357",keywords:["hudi","migration","use case","\u8fc1\u79fb","\u7528\u4f8b"],summary:"\u5728\u672c\u9875\u4e2d\uff0c\u6211\u4eec\u5c06\u8ba8\u8bba\u6709\u6548\u7684\u5de5\u5177\uff0c\u4ed6\u4eec\u80fd\u5c06\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u8fc1\u79fb\u5230 Hudi \u6570\u636e\u96c6\u3002",last_modified_at:new Date("2019-12-30T19:59:57.000Z"),language:"cn"},u=void 0,o={unversionedId:"migration_guide",id:"migration_guide",title:"\u8fc1\u79fb\u6307\u5357",description:"Hudi \u7ef4\u62a4\u4e86\u5143\u6570\u636e\uff0c\u5305\u62ec\u63d0\u4ea4\u7684\u65f6\u95f4\u7ebf\u548c\u7d22\u5f15\uff0c\u6765\u7ba1\u7406\u4e00\u4e2a\u6570\u636e\u96c6\u3002\u63d0\u4ea4\u7684\u65f6\u95f4\u7ebf\u5e2e\u52a9\u7406\u89e3\u4e00\u4e2a\u6570\u636e\u96c6\u4e0a\u53d1\u751f\u7684\u64cd\u4f5c\uff0c\u4ee5\u53ca\u6570\u636e\u96c6\u7684\u5f53\u524d\u72b6\u6001\u3002\u7d22\u5f15\u5219\u88ab Hudi \u7528\u6765\u7ef4\u62a4\u8bb0\u5f55\u952e\u5230\u6587\u4ef6 ID \u7684\u6620\u5c04\uff0c\u5b83\u80fd\u9ad8\u6548\u5730\u5b9a\u4f4d\u4e00\u6761\u8bb0\u5f55\u3002\u76ee\u524d\uff0c Hudi \u4ec5\u652f\u6301\u5199 Parquet \u5217\u5f0f\u683c\u5f0f \u3002",source:"@site/i18n/cn/docusaurus-plugin-content-docs/current/migration_guide.md",sourceDirName:".",slug:"/migration_guide",permalink:"/cn/docs/next/migration_guide",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/docs/migration_guide.md",tags:[],version:"current",frontMatter:{title:"\u8fc1\u79fb\u6307\u5357",keywords:["hudi","migration","use case","\u8fc1\u79fb","\u7528\u4f8b"],summary:"\u5728\u672c\u9875\u4e2d\uff0c\u6211\u4eec\u5c06\u8ba8\u8bba\u6709\u6548\u7684\u5de5\u5177\uff0c\u4ed6\u4eec\u80fd\u5c06\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u8fc1\u79fb\u5230 Hudi \u6570\u636e\u96c6\u3002",last_modified_at:"2019-12-30T19:59:57.000Z",language:"cn"},sidebar:"docs",previous:{title:"SQL Procedures",permalink:"/cn/docs/next/procedures"},next:{title:"Compaction",permalink:"/cn/docs/next/compaction"}},l=[{value:"\u65b9\u6cd5",id:"\u65b9\u6cd5",children:[{value:"\u5c06 Hudi \u4ec5\u7528\u4e8e\u65b0\u5206\u533a",id:"\u5c06-hudi-\u4ec5\u7528\u4e8e\u65b0\u5206\u533a",children:[],level:3},{value:"\u5c06\u73b0\u6709\u7684\u6570\u636e\u96c6\u8f6c\u6362\u4e3a Hudi",id:"\u5c06\u73b0\u6709\u7684\u6570\u636e\u96c6\u8f6c\u6362\u4e3a-hudi",children:[],level:3}],level:2}],d={toc:l},p="wrapper";function c(e){let{components:t,...r}=e;return(0,i.yg)(p,(0,n.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"Hudi \u7ef4\u62a4\u4e86\u5143\u6570\u636e\uff0c\u5305\u62ec\u63d0\u4ea4\u7684\u65f6\u95f4\u7ebf\u548c\u7d22\u5f15\uff0c\u6765\u7ba1\u7406\u4e00\u4e2a\u6570\u636e\u96c6\u3002\u63d0\u4ea4\u7684\u65f6\u95f4\u7ebf\u5e2e\u52a9\u7406\u89e3\u4e00\u4e2a\u6570\u636e\u96c6\u4e0a\u53d1\u751f\u7684\u64cd\u4f5c\uff0c\u4ee5\u53ca\u6570\u636e\u96c6\u7684\u5f53\u524d\u72b6\u6001\u3002\u7d22\u5f15\u5219\u88ab Hudi \u7528\u6765\u7ef4\u62a4\u8bb0\u5f55\u952e\u5230\u6587\u4ef6 ID \u7684\u6620\u5c04\uff0c\u5b83\u80fd\u9ad8\u6548\u5730\u5b9a\u4f4d\u4e00\u6761\u8bb0\u5f55\u3002\u76ee\u524d\uff0c Hudi \u4ec5\u652f\u6301\u5199 Parquet \u5217\u5f0f\u683c\u5f0f \u3002"),(0,i.yg)("p",null,"\u4e3a\u4e86\u5728\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u4e0a\u5f00\u59cb\u4f7f\u7528 Hudi \uff0c\u4f60\u9700\u8981\u5c06\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u8fc1\u79fb\u5230 Hudi \u7ba1\u7406\u7684\u6570\u636e\u96c6\u4e2d\u3002\u4ee5\u4e0b\u6709\u591a\u79cd\u65b9\u6cd5\u5b9e\u73b0\u8fd9\u4e2a\u76ee\u7684\u3002"),(0,i.yg)("h2",{id:"\u65b9\u6cd5"},"\u65b9\u6cd5"),(0,i.yg)("h3",{id:"\u5c06-hudi-\u4ec5\u7528\u4e8e\u65b0\u5206\u533a"},"\u5c06 Hudi \u4ec5\u7528\u4e8e\u65b0\u5206\u533a"),(0,i.yg)("p",null,"Hudi \u53ef\u4ee5\u88ab\u7528\u6765\u5728\u4e0d\u5f71\u54cd/\u6539\u53d8\u6570\u636e\u96c6\u5386\u53f2\u6570\u636e\u7684\u60c5\u51b5\u4e0b\u7ba1\u7406\u4e00\u4e2a\u73b0\u6709\u7684\u6570\u636e\u96c6\u3002 Hudi \u5df2\u7ecf\u5b9e\u73b0\u517c\u5bb9\u8fd9\u6837\u7684\u6570\u636e\u96c6\uff0c\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5355\u4e2a Hive \u5206\u533a\u8981\u4e48\u5b8c\u5168\u7531 Hudi \u7ba1\u7406\uff0c\u8981\u4e48\u4e0d\u7531 Hudi \u7ba1\u7406\u3002\u56e0\u6b64\uff0c Hudi \u7ba1\u7406\u4e00\u4e2a\u6570\u636e\u96c6\u7684\u6700\u4f4e\u7c92\u5ea6\u662f\u4e00\u4e2a Hive \u5206\u533a\u3002\u4f7f\u7528\u6570\u636e\u6e90 API \u6216 WriteClient \u6765\u5199\u5165\u6570\u636e\u96c6\uff0c\u5e76\u786e\u4fdd\u4f60\u5f00\u59cb\u5199\u5165\u7684\u662f\u4e00\u4e2a\u65b0\u5206\u533a\uff0c\u6216\u8005\u5c06\u8fc7\u53bb\u7684 N \u4e2a\u5206\u533a\u800c\u975e\u6574\u5f20\u8868\u8f6c\u6362\u4e3a Hudi \u3002\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u7531\u4e8e\u5386\u53f2\u5206\u533a\u4e0d\u662f\u7531 Hudi \u7ba1\u7406\u7684\uff0c Hudi \u63d0\u4f9b\u7684\u4efb\u4f55\u64cd\u4f5c\u5728\u90a3\u4e9b\u5206\u533a\u4e0a\u90fd\u4e0d\u751f\u6548\u3002\u66f4\u5177\u4f53\u5730\u8bf4\uff0c\u65e0\u6cd5\u5728\u8fd9\u4e9b\u975e Hudi \u7ba1\u7406\u7684\u65e7\u5206\u533a\u4e0a\u8fdb\u884c\u63d2\u5165\u66f4\u65b0\u6216\u589e\u91cf\u62c9\u53d6\u3002"),(0,i.yg)("p",null,"\u5982\u679c\u4f60\u7684\u6570\u636e\u96c6\u662f\u8ffd\u52a0\u578b\u7684\u6570\u636e\u96c6\uff0c\u5e76\u4e14\u4f60\u4e0d\u6307\u671b\u5728\u5df2\u7ecf\u5b58\u5728\u7684\uff08\u6216\u8005\u975e Hudi \u7ba1\u7406\u7684\uff09\u5206\u533a\u4e0a\u8fdb\u884c\u66f4\u65b0\u64cd\u4f5c\uff0c\u5c31\u4f7f\u7528\u8fd9\u4e2a\u65b9\u6cd5\u3002"),(0,i.yg)("h3",{id:"\u5c06\u73b0\u6709\u7684\u6570\u636e\u96c6\u8f6c\u6362\u4e3a-hudi"},"\u5c06\u73b0\u6709\u7684\u6570\u636e\u96c6\u8f6c\u6362\u4e3a Hudi"),(0,i.yg)("p",null,"\u5c06\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u5bfc\u5165\u5230\u4e00\u4e2a Hudi \u7ba1\u7406\u7684\u6570\u636e\u96c6\u3002\u7531\u4e8e\u5168\u90e8\u6570\u636e\u90fd\u662f Hudi \u7ba1\u7406\u7684\uff0c\u65b9\u6cd5 1 \u7684\u4efb\u4f55\u9650\u5236\u5728\u8fd9\u91cc\u90fd\u4e0d\u9002\u7528\u3002\u8de8\u5206\u533a\u7684\u66f4\u65b0\u53ef\u4ee5\u88ab\u5e94\u7528\u5230\u8fd9\u4e2a\u6570\u636e\u96c6\uff0c\u800c Hudi \u4f1a\u9ad8\u6548\u5730\u8ba9\u8fd9\u4e9b\u66f4\u65b0\u5bf9\u67e5\u8be2\u53ef\u7528\u3002\u503c\u5f97\u6ce8\u610f\u7684\u662f\uff0c\u4f60\u4e0d\u4ec5\u53ef\u4ee5\u5728\u8fd9\u4e2a\u6570\u636e\u96c6\u4e0a\u4f7f\u7528\u6240\u6709 Hudi \u63d0\u4f9b\u7684\u64cd\u4f5c\uff0c\u8fd9\u6837\u505a\u8fd8\u6709\u989d\u5916\u7684\u597d\u5904\u3002 Hudi \u4f1a\u81ea\u52a8\u7ba1\u7406\u53d7\u7ba1\u6570\u636e\u96c6\u7684\u6587\u4ef6\u5927\u5c0f\u3002\u4f60\u53ef\u4ee5\u5728\u8f6c\u6362\u6570\u636e\u96c6\u7684\u65f6\u5019\u8bbe\u7f6e\u671f\u671b\u7684\u6587\u4ef6\u5927\u5c0f\uff0c Hudi \u5c06\u786e\u4fdd\u5b83\u5199\u51fa\u7684\u6587\u4ef6\u7b26\u5408\u8fd9\u4e2a\u914d\u7f6e\u3002Hudi \u8fd8\u4f1a\u786e\u4fdd\u5c0f\u6587\u4ef6\u5728\u540e\u7eed\u88ab\u4fee\u6b63\uff0c\u8fd9\u4e2a\u8fc7\u7a0b\u662f\u901a\u8fc7\u5c06\u65b0\u7684\u63d2\u5165\u5f15\u5bfc\u5230\u8fd9\u4e9b\u5c0f\u6587\u4ef6\u800c\u4e0d\u662f\u5199\u5165\u65b0\u7684\u5c0f\u6587\u4ef6\u6765\u5b9e\u73b0\u7684\uff0c\u8fd9\u6837\u80fd\u7ef4\u6301\u4f60\u7684\u96c6\u7fa4\u7684\u5065\u5eb7\u5ea6\u3002"),(0,i.yg)("p",null,"\u9009\u62e9\u8fd9\u4e2a\u65b9\u6cd5\u540e\uff0c\u6709\u51e0\u79cd\u9009\u62e9\u3002"),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"\u9009\u62e9 1"),"\n\u4f7f\u7528 HDFSParquetImporter \u5de5\u5177\u3002\u6b63\u5982\u540d\u5b57\u8868\u660e\u7684\u90a3\u6837\uff0c\u8fd9\u4ec5\u4ec5\u9002\u7528\u4e8e\u4f60\u7684\u73b0\u6709\u6570\u636e\u96c6\u662f Parquet \u6587\u4ef6\u683c\u5f0f\u7684\u3002\n\u8fd9\u4e2a\u5de5\u5177\u672c\u8d28\u4e0a\u662f\u542f\u52a8\u4e00\u4e2a Spark \u4f5c\u4e1a\u6765\u8bfb\u53d6\u73b0\u6709\u7684 Parquet \u6570\u636e\u96c6\uff0c\u5e76\u901a\u8fc7\u91cd\u5199\u5168\u90e8\u8bb0\u5f55\u7684\u65b9\u5f0f\u5c06\u5b83\u8f6c\u6362\u4e3a HUDI \u7ba1\u7406\u7684\u6570\u636e\u96c6\u3002"),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"\u9009\u62e9 2"),"\n\u5bf9\u4e8e\u5927\u6570\u636e\u96c6\uff0c\u8fd9\u53ef\u4ee5\u7b80\u5355\u5730\uff1a "),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},'for partition in [list of partitions in source dataset] {\n        val inputDF = spark.read.format("any_input_format").load("partition_path")\n        inputDF.write.format("org.apache.hudi").option()....save("basePath")\n}\n')),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"\u9009\u62e9 3"),"\n\u5199\u4e0b\u4f60\u81ea\u5b9a\u4e49\u7684\u903b\u8f91\u6765\u5b9a\u4e49\u5982\u4f55\u5c06\u73b0\u6709\u6570\u636e\u96c6\u52a0\u8f7d\u5230\u4e00\u4e2a Hudi \u7ba1\u7406\u7684\u6570\u636e\u96c6\u4e2d\u3002\u8bf7\u5728 ",(0,i.yg)("a",{parentName:"p",href:"/cn/docs/quick-start-guide"},"\u8fd9\u91cc")," \u9605\u8bfb RDD API \u7684\u76f8\u5173\u8d44\u6599\u3002\u4f7f\u7528 HDFSParquetImporter \u5de5\u5177\u3002\u4e00\u65e6 Hudi \u901a\u8fc7 ",(0,i.yg)("inlineCode",{parentName:"p"},"mvn clean install -DskipTests")," \u88ab\u6784\u5efa\u4e86\uff0c Shell \u5c06\u88ab ",(0,i.yg)("inlineCode",{parentName:"p"},"cd hudi-cli && ./hudi-cli.sh")," \u8c03\u542f\u3002"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-java"},"hudi->hdfsparquetimport\n        --upsert false\n        --srcPath /user/parquet/dataset/basepath\n        --targetPath\n        /user/hoodie/dataset/basepath\n        --tableName hoodie_table\n        --tableType COPY_ON_WRITE\n        --rowKeyField _row_key\n        --partitionPathField partitionStr\n        --parallelism 1500\n        --schemaFilePath /user/table/schema\n        --format parquet\n        --sparkMemory 6g\n        --retry 2\n")))}c.isMDXComponent=!0}}]);