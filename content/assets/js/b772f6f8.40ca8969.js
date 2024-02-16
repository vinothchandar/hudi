"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[66599],{16943:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"0.5.1","label":"0.5.1","banner":"unmaintained","badge":true,"className":"docs-version-0.5.1","isLast":false,"docsSidebars":{"version-0.5.1/docs":[{"type":"link","label":"Quick-Start Guide","href":"/docs/0.5.1/quick-start-guide","docId":"quick-start-guide"},{"type":"link","label":"Use Cases","href":"/docs/0.5.1/use_cases","docId":"use_cases"},{"type":"link","label":"Writing Hudi Tables","href":"/docs/0.5.1/writing_data","docId":"writing_data"},{"type":"link","label":"Querying Hudi Tables","href":"/docs/0.5.1/querying_data","docId":"querying_data"},{"type":"link","label":"Configurations","href":"/docs/0.5.1/configurations","docId":"configurations"},{"type":"link","label":"Performance","href":"/docs/0.5.1/performance","docId":"performance"},{"type":"link","label":"Deployment Guide","href":"/docs/0.5.1/deployment","docId":"deployment"},{"collapsed":true,"type":"category","label":"Storage Configurations","items":[{"type":"link","label":"S3 Filesystem","href":"/docs/0.5.1/s3_hoodie","docId":"s3_hoodie"},{"type":"link","label":"GCS Filesystem","href":"/docs/0.5.1/gcs_hoodie","docId":"gcs_hoodie"}],"collapsible":true},{"collapsed":true,"type":"category","label":"Resources","items":[{"type":"link","label":"Docker Demo","href":"/docs/0.5.1/docker_demo","docId":"docker_demo"},{"type":"link","label":"Privacy Policy","href":"/docs/0.5.1/privacy","docId":"privacy"}],"collapsible":true}]},"docs":{"comparison":{"id":"comparison","title":"Comparison","description":"Apache Hudi fills a big void for processing data on top of DFS, and thus mostly co-exists nicely with these technologies. However,"},"concepts":{"id":"concepts","title":"Concepts","description":"Apache Hudi (pronounced \u201cHudi\u201d) provides the following streaming primitives over hadoop compatible storages"},"configurations":{"id":"configurations","title":"Configurations","description":"This page covers the different ways of configuring your job to write/read Hudi tables.","sidebar":"version-0.5.1/docs"},"deployment":{"id":"deployment","title":"Deployment Guide","description":"This section provides all the help you need to deploy and operate Hudi tables at scale.","sidebar":"version-0.5.1/docs"},"docker_demo":{"id":"docker_demo","title":"Docker Demo","description":"A Demo using docker containers","sidebar":"version-0.5.1/docs"},"gcs_hoodie":{"id":"gcs_hoodie","title":"GCS Filesystem","description":"For Hudi storage on GCS, regional buckets provide an DFS API with strong consistency.","sidebar":"version-0.5.1/docs"},"migration_guide":{"id":"migration_guide","title":"Migration Guide","description":"Hudi maintains metadata such as commit timeline and indexes to manage a table. The commit timelines helps to understand the actions happening on a table as well as the current state of a table. Indexes are used by Hudi to maintain a record key to file id mapping to efficiently locate a record. At the moment, Hudi supports writing only parquet columnar formats."},"performance":{"id":"performance","title":"Performance","description":"In this section, we go over some real world performance numbers for Hudi upserts, incremental pull and compare them against","sidebar":"version-0.5.1/docs"},"powered_by":{"id":"powered_by","title":"Talks & Powered By","description":"Adoption"},"privacy":{"id":"privacy","title":"Privacy Policy","description":"Information about your use of this website is collected using server access logs and a tracking cookie.","sidebar":"version-0.5.1/docs"},"querying_data":{"id":"querying_data","title":"Querying Hudi Tables","description":"Conceptually, Hudi stores data physically once on DFS, while providing 3 different ways of querying, as explained before.","sidebar":"version-0.5.1/docs"},"quick-start-guide":{"id":"quick-start-guide","title":"Quick-Start Guide","description":"This guide provides a quick peek at Hudi\'s capabilities using spark-shell. Using Spark datasources, we will walk through","sidebar":"version-0.5.1/docs"},"s3_hoodie":{"id":"s3_hoodie","title":"S3 Filesystem","description":"In this page, we explain how to get your Hudi spark job to store into AWS S3.","sidebar":"version-0.5.1/docs"},"structure":{"id":"structure","title":"Structure","description":"Hudi (pronounced \u201cHoodie\u201d) ingests & manages storage of large analytical tables over DFS (HDFS or cloud stores) and provides three types of queries."},"use_cases":{"id":"use_cases","title":"Use Cases","description":"Near Real-Time Ingestion","sidebar":"version-0.5.1/docs"},"writing_data":{"id":"writing_data","title":"Writing Hudi Tables","description":"In this section, we will cover ways to ingest new changes from external sources or even other Hudi tables using the DeltaStreamer tool, as well as","sidebar":"version-0.5.1/docs"}}}')}}]);