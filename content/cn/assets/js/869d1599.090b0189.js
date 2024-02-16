"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[7773],{15680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>m});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=a,m=u["".concat(c,".").concat(d)]||u[d]||g[d]||i;return n?r.createElement(m,o(o({ref:t},p),{},{components:n})):r.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9230:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(96540),a=n(92303);function i(e){let{children:t,url:i}=e;return(0,a.A)()&&(n.g.window.location.href=i),r.createElement("span",null,t,"or click ",r.createElement("a",{href:i},"here"))}},62981:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(58168),a=(n(96540),n(15680)),i=n(9230);const o={title:"Get started with Apache Hudi using AWS Glue by implementing key design concepts \u2013 Part 1",excerpt:"Get started with Apache Hudi using AWS Glue by implementing key design concepts \u2013 Part 1",authors:[{name:"Srinivas Kandi"},{name:"Ravi Itha"}],category:"blog",image:"/assets/images/blog/2023-10-17-Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1.png",tags:["aws glue","apache hudi","how-to","amazon","design","aws glue","upserts","bulk insert","indexing"]},l=void 0,c={permalink:"/cn/blog/2023/10/17/Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-10-17-Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1.mdx",source:"@site/blog/2023-10-17-Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1.mdx",title:"Get started with Apache Hudi using AWS Glue by implementing key design concepts \u2013 Part 1",description:"Redirecting... please wait!!",date:"2023-10-17T00:00:00.000Z",formattedDate:"October 17, 2023",tags:[{label:"aws glue",permalink:"/cn/blog/tags/aws-glue"},{label:"apache hudi",permalink:"/cn/blog/tags/apache-hudi"},{label:"how-to",permalink:"/cn/blog/tags/how-to"},{label:"amazon",permalink:"/cn/blog/tags/amazon"},{label:"design",permalink:"/cn/blog/tags/design"},{label:"upserts",permalink:"/cn/blog/tags/upserts"},{label:"bulk insert",permalink:"/cn/blog/tags/bulk-insert"},{label:"indexing",permalink:"/cn/blog/tags/indexing"}],readingTime:.045,truncated:!1,authors:[{name:"Srinivas Kandi"},{name:"Ravi Itha"}],prevItem:{title:"Apache Hudi: From Zero To One (5/10)",permalink:"/cn/blog/2023/10/18/Apache-Hudi-From-Zero-To-One-blog-5"},nextItem:{title:"StarRocks query performance with Apache Hudi and Onehouse",permalink:"/cn/blog/2023/10/11/starrocks-query-performance-with-apache-hudi-and-onehouse"}},s={authorsImageUrls:[void 0,void 0]},p=[],u={toc:p},g="wrapper";function d(e){let{components:t,...n}=e;return(0,a.yg)(g,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)(i.A,{url:"https://aws.amazon.com/blogs/big-data/part-1-get-started-with-apache-hudi-using-aws-glue-by-implementing-key-design-concepts/",mdxType:"Redirect"},"Redirecting... please wait!! "))}d.isMDXComponent=!0}}]);