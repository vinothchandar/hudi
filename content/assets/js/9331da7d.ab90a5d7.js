"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[97107],{15680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>d});var n=r(96540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(r),m=a,d=s["".concat(c,".").concat(m)]||s[m]||g[m]||o;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9230:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(96540),a=r(92303);function o(e){let{children:t,url:o}=e;return(0,a.A)()&&(r.g.window.location.href=o),n.createElement("span",null,t,"or click ",n.createElement("a",{href:o},"here"))}},42166:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var n=r(58168),a=(r(96540),r(15680)),o=r(9230);const i={title:"Apache Hudi: From Zero To One (5/10)",excerpt:"Introduce table services: compaction, cleaning, and indexing",author:"Shiyan Xu",category:"blog",image:"/assets/images/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.png",tags:["blog","apache hudi","table services","compaction","cleaning","datumagic","indexing"]},l=void 0,c={permalink:"/blog/2023/10/18/Apache-Hudi-From-Zero-To-One-blog-5",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.mdx",source:"@site/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.mdx",title:"Apache Hudi: From Zero To One (5/10)",description:"Redirecting... please wait!!",date:"2023-10-18T00:00:00.000Z",formattedDate:"October 18, 2023",tags:[{label:"blog",permalink:"/blog/tags/blog"},{label:"apache hudi",permalink:"/blog/tags/apache-hudi"},{label:"table services",permalink:"/blog/tags/table-services"},{label:"compaction",permalink:"/blog/tags/compaction"},{label:"cleaning",permalink:"/blog/tags/cleaning"},{label:"datumagic",permalink:"/blog/tags/datumagic"},{label:"indexing",permalink:"/blog/tags/indexing"}],readingTime:.045,truncated:!1,authors:[{name:"Shiyan Xu"}],prevItem:{title:"Load data incrementally from transactional data lakes to data warehouses",permalink:"/blog/2023/10/19/load-data-incrementally-from-transactional-data-lakes-to-data-warehouses"},nextItem:{title:"Get started with Apache Hudi using AWS Glue by implementing key design concepts \u2013 Part 1",permalink:"/blog/2023/10/17/Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1"}},p={authorsImageUrls:[void 0]},u=[],s={toc:u},g="wrapper";function m(e){let{components:t,...r}=e;return(0,a.yg)(g,(0,n.A)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(o.A,{url:"https://blog.datumagic.com/p/apache-hudi-from-zero-to-one-510",mdxType:"Redirect"},"Redirecting... please wait!! "))}m.isMDXComponent=!0}}]);