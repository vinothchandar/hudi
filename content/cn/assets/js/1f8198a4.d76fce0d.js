"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[86167],{15680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>h});var a=n(96540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),f=r,h=u["".concat(l,".").concat(f)]||u[f]||d[f]||i;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:r,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},73402:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var a=n(58168),r=(n(96540),n(15680));const i={title:"Incremental Processing on the Data Lake",excerpt:"How Apache Hudi provides ability for incremental data processing.",author:"vinoyang",category:"blog",image:"/assets/images/blog/incr-processing/image7.png",tags:["blog","datalake","incremental processing","apache hudi"]},o=void 0,c={permalink:"/cn/blog/2020/08/18/hudi-incremental-processing-on-data-lakes",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-08-18-hudi-incremental-processing-on-data-lakes.md",source:"@site/blog/2020-08-18-hudi-incremental-processing-on-data-lakes.md",title:"Incremental Processing on the Data Lake",description:"NOTE: This article is a translation of the infoq.cn article, found here, with minor edits",date:"2020-08-18T00:00:00.000Z",formattedDate:"August 18, 2020",tags:[{label:"blog",permalink:"/cn/blog/tags/blog"},{label:"datalake",permalink:"/cn/blog/tags/datalake"},{label:"incremental processing",permalink:"/cn/blog/tags/incremental-processing"},{label:"apache hudi",permalink:"/cn/blog/tags/apache-hudi"}],readingTime:17.005,truncated:!0,authors:[{name:"vinoyang"}],prevItem:{title:"Efficient Migration of Large Parquet Tables to Apache Hudi",permalink:"/cn/blog/2020/08/20/efficient-migration-of-large-parquet-tables"},nextItem:{title:"PrestoDB and Apache Hudi",permalink:"/cn/blog/2020/08/04/PrestoDB-and-Apache-Hudi"}},l={authorsImageUrls:[void 0]},s=[{value:"NOTE: This article is a translation of the infoq.cn article, found here, with minor edits",id:"note-this-article-is-a-translation-of-the-infoqcn-article-found-here-with-minor-edits",children:[],level:3}],p={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h3",{id:"note-this-article-is-a-translation-of-the-infoqcn-article-found-here-with-minor-edits"},"NOTE: This article is a translation of the infoq.cn article, found ",(0,r.yg)("a",{parentName:"h3",href:"https://www.infoq.cn/article/CAgIDpfJBVcJHKJLSbhe"},"here"),", with minor edits"),(0,r.yg)("p",null,'Apache Hudi is a data lake framework which provides the ability to ingest, manage and query large analytical data sets on a distributed file system/cloud stores.\nHudi joined the Apache incubator for incubation in January 2019, and was promoted to the top Apache project in May 2020. This article mainly discusses the importance\nof Hudi to the data lake from the perspective of "incremental processing". More information about Apache Hudi\'s framework functions, features, usage scenarios, and\nlatest developments can be found at ',(0,r.yg)("a",{parentName:"p",href:"https://qconplus.infoq.cn/2020/shanghai/presentation/2646"},"QCon Global Software Development Conference (Shanghai Station) 2020"),"."))}d.isMDXComponent=!0}}]);