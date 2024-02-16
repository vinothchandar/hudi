"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[84013],{15680:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>m});var n=r(96540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(r),s=o,m=d["".concat(l,".").concat(s)]||d[s]||g[s]||a;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},9230:(e,t,r)=>{r.d(t,{A:()=>a});var n=r(96540),o=r(92303);function a(e){let{children:t,url:a}=e;return(0,o.A)()&&(r.g.window.location.href=a),n.createElement("span",null,t,"or click ",n.createElement("a",{href:a},"here"))}},20040:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=r(58168),o=(r(96540),r(15680)),a=r(9230);const i={title:"Apache Hudi: From Zero To One (7/10)",excerpt:"Concurrently run writers and table services",author:"Shiyan Xu",category:"blog",image:"/assets/images/blog/2023-12-06-Apache-Hudi-From-Zero-To-One-blog-7.png",tags:["blog","apache hudi","concurrency","datumagic","lock provider"]},c=void 0,l={permalink:"/blog/2023/12/06/Apache-Hudi-From-Zero-To-One-blog-7",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-12-06-Apache-Hudi-From-Zero-To-One-blog-7.mdx",source:"@site/blog/2023-12-06-Apache-Hudi-From-Zero-To-One-blog-7.mdx",title:"Apache Hudi: From Zero To One (7/10)",description:"Redirecting... please wait!!",date:"2023-12-06T00:00:00.000Z",formattedDate:"December 6, 2023",tags:[{label:"blog",permalink:"/blog/tags/blog"},{label:"apache hudi",permalink:"/blog/tags/apache-hudi"},{label:"concurrency",permalink:"/blog/tags/concurrency"},{label:"datumagic",permalink:"/blog/tags/datumagic"},{label:"lock provider",permalink:"/blog/tags/lock-provider"}],readingTime:.045,truncated:!1,authors:[{name:"Shiyan Xu"}],prevItem:{title:"Getting started with Apache Hudi",permalink:"/blog/2023/12/09/Getting-started-with-Apache-Hudi"},nextItem:{title:"Getting started with Apache Hudi",permalink:"/blog/2023/12/01/Getting-started-with-Apache-Hudi"}},p={authorsImageUrls:[void 0]},u=[],d={toc:u},g="wrapper";function s(e){let{components:t,...r}=e;return(0,o.yg)(g,(0,n.A)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)(a.A,{url:"https://blog.datumagic.com/p/apache-hudi-from-zero-to-one-710",mdxType:"Redirect"},"Redirecting... please wait!! "))}s.isMDXComponent=!0}}]);