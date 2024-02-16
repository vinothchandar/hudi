"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[34388],{15680:(e,t,a)=>{a.d(t,{xA:()=>s,yg:()=>g});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),u=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),p=u(a),d=r,g=p["".concat(c,".").concat(d)]||p[d]||m[d]||i;return a?n.createElement(g,l(l({ref:t},s),{},{components:a})):n.createElement(g,l({ref:t},s))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[p]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=a[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},9230:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(96540),r=a(92303);function i(e){let{children:t,url:i}=e;return(0,r.A)()&&(a.g.window.location.href=i),n.createElement("span",null,t,"or click ",n.createElement("a",{href:i},"here"))}},53345:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var n=a(58168),r=(a(96540),a(15680)),i=a(9230);const l={title:"Use Flink Hudi to Build a Streaming Data Lake Platform",authors:[{name:"Chen Yuzhao"},{name:"Liu Dalong"}],category:"blog",image:"/assets/images/blog/2022-08-12-Use-Flink-Hudi-to-Build-a-Streaming-Data-Lake-Platform.png",tags:["blog","apache flink","alibabacloud","streaming ingestion"]},o=void 0,c={permalink:"/cn/blog/2022/08/12/Use-Flink-Hudi-to-Build-a-Streaming-Data-Lake-Platform",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2022-08-12-Use-Flink-Hudi-to-Build-a-Streaming-Data-Lake-Platform.mdx",source:"@site/blog/2022-08-12-Use-Flink-Hudi-to-Build-a-Streaming-Data-Lake-Platform.mdx",title:"Use Flink Hudi to Build a Streaming Data Lake Platform",description:"Redirecting... please wait!!",date:"2022-08-12T00:00:00.000Z",formattedDate:"August 12, 2022",tags:[{label:"blog",permalink:"/cn/blog/tags/blog"},{label:"apache flink",permalink:"/cn/blog/tags/apache-flink"},{label:"alibabacloud",permalink:"/cn/blog/tags/alibabacloud"},{label:"streaming ingestion",permalink:"/cn/blog/tags/streaming-ingestion"}],readingTime:.045,truncated:!1,authors:[{name:"Chen Yuzhao"},{name:"Liu Dalong"}],prevItem:{title:"Implementation of SCD-2 (Slowly Changing Dimension) with Apache Hudi & Spark",permalink:"/cn/blog/2022/08/24/Implementation-of-SCD-2-with-Apache-Hudi-and-Spark"},nextItem:{title:"How NerdWallet uses AWS and Apache Hudi to build a serverless, real-time analytics platform",permalink:"/cn/blog/2022/08/09/How-NerdWallet-uses-AWS-and-Apache-Hudi-to-build-a-serverless-real-time-analytics-platform"}},u={authorsImageUrls:[void 0,void 0]},s=[],p={toc:s},m="wrapper";function d(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)(i.A,{url:"https://www.alibabacloud.com/blog/use-flink-hudi-to-build-a-streaming-data-lake-platform_599240",mdxType:"Redirect"},"Redirecting... please wait!! "))}d.isMDXComponent=!0}}]);