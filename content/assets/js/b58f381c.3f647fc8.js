"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[69875],{15680:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>m});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,m=u["".concat(p,".").concat(d)]||u[d]||g[d]||o;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9230:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(96540),a=r(92303);function o(e){let{children:t,url:o}=e;return(0,a.A)()&&(r.g.window.location.href=o),n.createElement("span",null,t,"or click ",n.createElement("a",{href:o},"here"))}},22811:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var n=r(58168),a=(r(96540),r(15680)),o=r(9230);const i={title:"Apache Hudi: From Zero To One (3/10)",excerpt:"Understand write flows and operations",author:"Shiyan Xu",category:"blog",image:"/assets/images/blog/2023-09-15-Apache-Hudi-From-Zero-To-One-blog-3.png",tags:["blog","apache hudi","queries","writes","datumagic","upserts","bulk insert","deletes","delete partition","inserts"]},l=void 0,p={permalink:"/blog/2023/09/15/Apache-Hudi-From-Zero-To-One-blog-3",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-09-15-Apache-Hudi-From-Zero-To-One-blog-3.mdx",source:"@site/blog/2023-09-15-Apache-Hudi-From-Zero-To-One-blog-3.mdx",title:"Apache Hudi: From Zero To One (3/10)",description:"Redirecting... please wait!!",date:"2023-09-15T00:00:00.000Z",formattedDate:"September 15, 2023",tags:[{label:"blog",permalink:"/blog/tags/blog"},{label:"apache hudi",permalink:"/blog/tags/apache-hudi"},{label:"queries",permalink:"/blog/tags/queries"},{label:"writes",permalink:"/blog/tags/writes"},{label:"datumagic",permalink:"/blog/tags/datumagic"},{label:"upserts",permalink:"/blog/tags/upserts"},{label:"bulk insert",permalink:"/blog/tags/bulk-insert"},{label:"deletes",permalink:"/blog/tags/deletes"},{label:"delete partition",permalink:"/blog/tags/delete-partition"},{label:"inserts",permalink:"/blog/tags/inserts"}],readingTime:.045,truncated:!1,authors:[{name:"Shiyan Xu"}],prevItem:{title:"A Beginner\u2019s Guide to Apache Hudi with PySpark \u2014 Part 1 of 2",permalink:"/blog/2023/09/19/A-Beginners-Guide-to-Apache-Hudi-with-PySpark-Part-1-of-2"},nextItem:{title:"Simplify operational data processing in data lakes using AWS Glue and Apache Hudi",permalink:"/blog/2023/09/13/Simplify-operational-data-processing-in-data-lakes-using-AWS-Glue-and-Apache-Hudi"}},c={authorsImageUrls:[void 0]},s=[],u={toc:s},g="wrapper";function d(e){let{components:t,...r}=e;return(0,a.yg)(g,(0,n.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(o.A,{url:"https://blog.datumagic.com/p/apache-hudi-from-zero-to-one-310",mdxType:"Redirect"},"Redirecting... please wait!! "))}d.isMDXComponent=!0}}]);