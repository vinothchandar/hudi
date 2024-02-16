"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[47247],{15680:(e,n,r)=>{r.d(n,{xA:()=>u,yg:()=>f});var o=r(96540);function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function s(e,n){if(null==e)return{};var r,o,t=function(e,n){if(null==e)return{};var r,o,t={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],n.indexOf(r)>=0||(t[r]=e[r]);return t}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var l=o.createContext({}),d=function(e){var n=o.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):a(a({},n),e)),r},u=function(e){var n=d(e.components);return o.createElement(l.Provider,{value:n},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},y=o.forwardRef((function(e,n){var r=e.components,t=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=d(r),y=t,f=p["".concat(l,".").concat(y)]||p[y]||c[y]||i;return r?o.createElement(f,a(a({ref:n},u),{},{components:r})):o.createElement(f,a({ref:n},u))}));function f(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var i=r.length,a=new Array(i);a[0]=y;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[p]="string"==typeof e?e:t,a[1]=s;for(var d=2;d<i;d++)a[d]=r[d];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}y.displayName="MDXCreateElement"},43791:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=r(58168),t=(r(96540),r(15680));const i={title:"Alibaba Cloud",keywords:["hudi","hive","aliyun","oss","spark","presto"],summary:"In this page, we go over how to configure Hudi with OSS filesystem.",last_modified_at:new Date("2020-04-21T21:38:24.000Z")},a=void 0,s={unversionedId:"oss_hoodie",id:"version-0.14.0/oss_hoodie",title:"Alibaba Cloud",description:"In this page, we explain how to get your Hudi spark job to store into Aliyun OSS.",source:"@site/versioned_docs/version-0.14.0/oss_hoodie.md",sourceDirName:".",slug:"/oss_hoodie",permalink:"/docs/0.14.0/oss_hoodie",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.14.0/oss_hoodie.md",tags:[],version:"0.14.0",frontMatter:{title:"Alibaba Cloud",keywords:["hudi","hive","aliyun","oss","spark","presto"],summary:"In this page, we go over how to configure Hudi with OSS filesystem.",last_modified_at:"2020-04-21T21:38:24.000Z"},sidebar:"docs",previous:{title:"Google Cloud",permalink:"/docs/0.14.0/gcs_hoodie"},next:{title:"Microsoft Azure",permalink:"/docs/0.14.0/azure_hoodie"}},l=[{value:"Aliyun OSS configs",id:"aliyun-oss-configs",children:[{value:"Aliyun OSS Credentials",id:"aliyun-oss-credentials",children:[],level:3},{value:"Aliyun OSS Libs",id:"aliyun-oss-libs",children:[],level:3}],level:2}],d={toc:l},u="wrapper";function p(e){let{components:n,...r}=e;return(0,t.yg)(u,(0,o.A)({},d,r,{components:n,mdxType:"MDXLayout"}),(0,t.yg)("p",null,"In this page, we explain how to get your Hudi spark job to store into Aliyun OSS."),(0,t.yg)("h2",{id:"aliyun-oss-configs"},"Aliyun OSS configs"),(0,t.yg)("p",null,"There are two configurations required for Hudi-OSS compatibility:"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Adding Aliyun OSS Credentials for Hudi"),(0,t.yg)("li",{parentName:"ul"},"Adding required Jars to classpath")),(0,t.yg)("h3",{id:"aliyun-oss-credentials"},"Aliyun OSS Credentials"),(0,t.yg)("p",null,"Add the required configs in your core-site.xml from where Hudi can fetch them. Replace the ",(0,t.yg)("inlineCode",{parentName:"p"},"fs.defaultFS")," with your OSS bucket name, replace ",(0,t.yg)("inlineCode",{parentName:"p"},"fs.oss.endpoint")," with your OSS endpoint, replace ",(0,t.yg)("inlineCode",{parentName:"p"},"fs.oss.accessKeyId")," with your OSS key, replace ",(0,t.yg)("inlineCode",{parentName:"p"},"fs.oss.accessKeySecret")," with your OSS secret. Hudi should be able to read/write from the bucket."),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<property>\n  <name>fs.defaultFS</name>\n  <value>oss://bucketname/</value>\n</property>\n\n<property>\n  <name>fs.oss.endpoint</name>\n  <value>oss-endpoint-address</value>\n  <description>Aliyun OSS endpoint to connect to.</description>\n</property>\n\n<property>\n  <name>fs.oss.accessKeyId</name>\n  <value>oss_key</value>\n  <description>Aliyun access key ID</description>\n</property>\n\n<property>\n  <name>fs.oss.accessKeySecret</name>\n  <value>oss-secret</value>\n  <description>Aliyun access key secret</description>\n</property>\n\n<property>\n  <name>fs.oss.impl</name>\n  <value>org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem</value>\n</property>\n")),(0,t.yg)("h3",{id:"aliyun-oss-libs"},"Aliyun OSS Libs"),(0,t.yg)("p",null,"Aliyun hadoop libraries jars to add to our pom.xml. Since hadoop-aliyun depends on the version of hadoop 2.9.1+, you need to use the version of hadoop 2.9.1 or later."),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n  <groupId>org.apache.hadoop</groupId>\n  <artifactId>hadoop-aliyun</artifactId>\n  <version>3.2.1</version>\n</dependency>\n<dependency>\n  <groupId>com.aliyun.oss</groupId>\n  <artifactId>aliyun-sdk-oss</artifactId>\n  <version>3.8.1</version>\n</dependency>\n<dependency>\n  <groupId>org.jdom</groupId>\n  <artifactId>jdom</artifactId>\n  <version>1.1</version>\n</dependency>\n")))}p.isMDXComponent=!0}}]);