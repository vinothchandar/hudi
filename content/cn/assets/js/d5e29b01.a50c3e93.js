"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[37839],{15680:(e,a,t)=>{t.d(a,{xA:()=>p,yg:()=>h});var r=t(96540);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var c=r.createContext({}),u=function(e){var a=r.useContext(c),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},p=function(e){var a=u(e.components);return r.createElement(c.Provider,{value:a},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},s=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(t),s=n,h=d["".concat(c,".").concat(s)]||d[s]||m[s]||o;return t?r.createElement(h,i(i({ref:a},p),{},{components:t})):r.createElement(h,i({ref:a},p))}));function h(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=s;var l={};for(var c in a)hasOwnProperty.call(a,c)&&(l[c]=a[c]);l.originalType=e,l[d]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<o;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}s.displayName="MDXCreateElement"},9230:(e,a,t)=>{t.d(a,{A:()=>o});var r=t(96540),n=t(92303);function o(e){let{children:a,url:o}=e;return(0,n.A)()&&(t.g.window.location.href=o),r.createElement("span",null,a,"or click ",r.createElement("a",{href:o},"here"))}},9001:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>u,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var r=t(58168),n=(t(96540),t(15680)),o=t(9230);const i={title:"Part1: Query apache hudi dataset in an amazon S3 data lake with amazon athena : Read optimized queries",authors:[{name:"Dhiraj Thakur"},{name:"Sameer Goel"},{name:"Imtiaz Sayed"}],category:"blog",image:"/assets/images/blog/2021-07-16-query-hudi-using-athena-ro-queries.png",tags:["how-to","read optimized query","amazon"]},l=void 0,c={permalink:"/cn/blog/2021/07/16/Query-apache-hudi-dataset-in-an-amazon-S3-data-lake-with-amazon-athena-Read-optimized-queries",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2021-07-16-Query-apache-hudi-dataset-in-an-amazon-S3-data-lake-with-amazon-athena-Read-optimized-queries.mdx",source:"@site/blog/2021-07-16-Query-apache-hudi-dataset-in-an-amazon-S3-data-lake-with-amazon-athena-Read-optimized-queries.mdx",title:"Part1: Query apache hudi dataset in an amazon S3 data lake with amazon athena : Read optimized queries",description:"Redirecting... please wait!!",date:"2021-07-16T00:00:00.000Z",formattedDate:"July 16, 2021",tags:[{label:"how-to",permalink:"/cn/blog/tags/how-to"},{label:"read optimized query",permalink:"/cn/blog/tags/read-optimized-query"},{label:"amazon",permalink:"/cn/blog/tags/amazon"}],readingTime:.045,truncated:!1,authors:[{name:"Dhiraj Thakur"},{name:"Sameer Goel"},{name:"Imtiaz Sayed"}],prevItem:{title:"Amazon Athena expands Apache Hudi support",permalink:"/cn/blog/2021/07/16/Amazon-Athena-expands-Apache-Hudi-support"},nextItem:{title:"Employing correct configurations for Hudi's cleaner table service",permalink:"/cn/blog/2021/06/10/employing-right-configurations-for-hudi-cleaner"}},u={authorsImageUrls:[void 0,void 0,void 0]},p=[],d={toc:p},m="wrapper";function s(e){let{components:a,...t}=e;return(0,n.yg)(m,(0,r.A)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,n.yg)(o.A,{url:"https://aws.amazon.com/blogs/big-data/part-1-query-an-apache-hudi-dataset-in-an-amazon-s3-data-lake-with-amazon-athena-part-1-read-optimized-queries/",mdxType:"Redirect"},"Redirecting... please wait!! "))}s.isMDXComponent=!0}}]);