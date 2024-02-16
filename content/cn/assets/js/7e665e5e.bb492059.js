"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[53559],{15680:(e,r,t)=>{t.d(r,{xA:()=>s,yg:()=>f});var n=t(96540);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),u=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},s=function(e){var r=u(e.components);return n.createElement(c.Provider,{value:r},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},y=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(t),y=o,f=d["".concat(c,".").concat(y)]||d[y]||p[y]||i;return t?n.createElement(f,a(a({ref:r},s),{},{components:t})):n.createElement(f,a({ref:r},s))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=y;var l={};for(var c in r)hasOwnProperty.call(r,c)&&(l[c]=r[c]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=t[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}y.displayName="MDXCreateElement"},97387:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=t(58168),o=(t(96540),t(15680));const i={title:"\u4e91\u50a8\u5b58",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:new Date("2019-06-17T01:59:57.000Z"),language:"cn"},a=void 0,l={unversionedId:"cloud",id:"version-0.5.3/cloud",title:"\u4e91\u50a8\u5b58",description:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",source:"@site/i18n/cn/docusaurus-plugin-content-docs/version-0.5.3/cloud.md",sourceDirName:".",slug:"/cloud",permalink:"/cn/docs/0.5.3/cloud",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.5.3/cloud.md",tags:[],version:"0.5.3",frontMatter:{title:"\u4e91\u50a8\u5b58",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:"2019-06-17T01:59:57.000Z",language:"cn"},sidebar:"version-0.5.3/docs",previous:{title:"\u7ba1\u7406 Hudi Pipelines",permalink:"/cn/docs/0.5.3/deployment"},next:{title:"S3 Filesystem",permalink:"/cn/docs/0.5.3/s3_hoodie"}},c=[{value:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",id:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",children:[],level:2}],u={toc:c},s="wrapper";function d(e){let{components:r,...t}=e;return(0,o.yg)(s,(0,n.A)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.yg)("h2",{id:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5"},"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5"),(0,o.yg)("p",null,"\u65e0\u8bba\u4f7f\u7528RDD/WriteClient API\u8fd8\u662f\u6570\u636e\u6e90\uff0c\u4ee5\u4e0b\u4fe1\u606f\u90fd\u6709\u52a9\u4e8e\u914d\u7f6e\u5bf9\u4e91\u5b58\u50a8\u7684\u8bbf\u95ee\u3002"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/cn/docs/s3_hoodie"},"AWS S3")," ",(0,o.yg)("br",null),"\nS3\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/cn/docs/gcs_hoodie"},"Google Cloud Storage")," ",(0,o.yg)("br",null),"\nGCS\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/cn/docs/oss_hoodie"},"Alibaba Cloud OSS")," ",(0,o.yg)("br",null),"\n\u963f\u91cc\u4e91\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("a",{parentName:"li",href:"/cn/docs/azure_hoodie"},"Microsoft Azure")," ",(0,o.yg)("br",null),"\nAzure\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002")))}d.isMDXComponent=!0}}]);