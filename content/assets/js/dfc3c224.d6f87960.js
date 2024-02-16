"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[40690],{15680:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>g});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),d=a,g=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return r?n.createElement(g,i(i({ref:t},s),{},{components:r})):n.createElement(g,i({ref:t},s))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9230:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(96540),a=r(92303);function o(e){let{children:t,url:o}=e;return(0,a.A)()&&(r.g.window.location.href=o),n.createElement("span",null,t,"or click ",n.createElement("a",{href:o},"here"))}},36969:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var n=r(58168),a=(r(96540),r(15680)),o=r(9230);const i={title:"How to query data in Apache Hudi using StarRocks",authors:[{name:"Albert Wong"}],category:"blog",image:"/assets/images/blog/2023-06-20-How-to-query-data-in-Apache-Hudi-using-StarRocks.png",tags:["blog","starrocks","queries","medium"]},l=void 0,c={permalink:"/blog/2023/06/20/How-to-query-data-in-Apache-Hudi-using-StarRocks",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-06-20-How-to-query-data-in-Apache-Hudi-using-StarRocks.mdx",source:"@site/blog/2023-06-20-How-to-query-data-in-Apache-Hudi-using-StarRocks.mdx",title:"How to query data in Apache Hudi using StarRocks",description:"Redirecting... please wait!!",date:"2023-06-20T00:00:00.000Z",formattedDate:"June 20, 2023",tags:[{label:"blog",permalink:"/blog/tags/blog"},{label:"starrocks",permalink:"/blog/tags/starrocks"},{label:"queries",permalink:"/blog/tags/queries"},{label:"medium",permalink:"/blog/tags/medium"}],readingTime:.045,truncated:!1,authors:[{name:"Albert Wong"}],prevItem:{title:"Multi-writer support with Apache Hudi",permalink:"/blog/2023/06/24/multi-writer-support-in-apache-hudi"},nextItem:{title:"Timeline Server in Apache Hudi",permalink:"/blog/2023/06/20/timeline-server-in-apache-hudi"}},u={authorsImageUrls:[void 0]},s=[],p={toc:s},m="wrapper";function d(e){let{components:t,...r}=e;return(0,a.yg)(m,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(o.A,{url:"https://medium.com/@atwong/how-to-query-data-in-apache-hudi-using-starrocks-bf0336eaa817",mdxType:"Redirect"},"Redirecting... please wait!! "))}d.isMDXComponent=!0}}]);