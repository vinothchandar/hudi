"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[95641],{15680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=u(r),s=a,m=d["".concat(l,".").concat(s)]||d[s]||y[s]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},9230:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(96540),a=r(92303);function o(e){let{children:t,url:o}=e;return(0,a.A)()&&(r.g.window.location.href=o),n.createElement("span",null,t,"or click ",n.createElement("a",{href:o},"here"))}},40187:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=r(58168),a=(r(96540),r(15680)),o=r(9230);const i={title:"Can you concurrently write data to Apache Hudi w/o any lock provider?",authors:[{name:"Sivabalan Narayanan"}],category:"blog",image:"/assets/images/blog/2023-04-29-can-you-concurrently-write-data-to-apache-hudi-w-o-any-lock-provider.gif",tags:["how-to","concurrency","medium"]},c=void 0,l={permalink:"/blog/2023/04/29/can-you-concurrently-write-data-to-apache-hudi-w-o-any-lock-provider",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-04-29-can-you-concurrently-write-data-to-apache-hudi-w-o-any-lock-provider.mdx",source:"@site/blog/2023-04-29-can-you-concurrently-write-data-to-apache-hudi-w-o-any-lock-provider.mdx",title:"Can you concurrently write data to Apache Hudi w/o any lock provider?",description:"Redirecting... please wait!!",date:"2023-04-29T00:00:00.000Z",formattedDate:"April 29, 2023",tags:[{label:"how-to",permalink:"/blog/tags/how-to"},{label:"concurrency",permalink:"/blog/tags/concurrency"},{label:"medium",permalink:"/blog/tags/medium"}],readingTime:.045,truncated:!1,authors:[{name:"Sivabalan Narayanan"}],prevItem:{title:"An Introduction to the Hudi and Flink Integration",permalink:"/blog/2023/05/02/intro-to-hudi-and-flink"},nextItem:{title:"Delta, Hudi, and Iceberg: The Data Lakehouse Trifecta",permalink:"/blog/2023/04/26/the-lakehouse-trifecta"}},u={authorsImageUrls:[void 0]},p=[],d={toc:p},y="wrapper";function s(e){let{components:t,...r}=e;return(0,a.yg)(y,(0,n.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(o.A,{url:"https://medium.com/@simpsons/can-you-concurrently-write-data-to-apache-hudi-w-o-any-lock-provider-51ea55bf2dd6",mdxType:"Redirect"},"Redirecting... please wait!! "))}s.isMDXComponent=!0}}]);