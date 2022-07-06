---
title: "Technical Specifications"
keywords: [hudi, technical, specifications]
last_modified_at: 2019-12-31T15:59:57-04:00
---

# Overview 

This document is a specification for the Hudi table layout and concurrency
control model, which brings core warehouse and database functionality directly
to a data lake. Hudi provides tables, transactions, efficient upserts/deletes,
advanced indexes, streaming ingestion services, data clustering/compaction
optimizations, and concurrency all while keeping your data in open source file
formats.

The specification was designed with the following goals in mind:

- **Unified Batch and Streaming** - first-class support for change streams on
  data lake storage unlocks both batch and incremental ETL thus bringing down
  data freshness to a few minutes.
- **Cloud-Native Tables** - easy to define tables, manage schema, metadata, and
  bring SQL semantics to cloud object storage.
- **Self-managing** - bring down operational costs of managing a large data
  pipeline by providing self-managing table services such as compaction,
  clustering and cleaning.

To attain the above goals, Hudi's core features adhere to certain design
principles.

- **Log-structured Storage** - Hudi timeline as an ordederd sequence of all the
  write operations done on the table, akin to a database transaction log.
- **Serializable Snapshot Isolation** - multiple writers, including table
  services, can concurrently modify a Hudi table while maintaining ACID
  semantics, and leverage Multi Version Concurrency Control (MVCC) or
  fine-grained file/record level Optimistic Concurrency Control (OCC) to provide
  serializable snapshot isolation between multiple writers and readers.
- **Efficient Upserts and Deletes** - support for updating/deleting records,
  using fine grained file/record level indexes, while providing transactional
  guarantees for the write operation.

With these goals and design principles in mind, let us dive into a Hudi table
layout and concurrency control mechanism.

# Table Layout

There are three main components of a Hudi table:

1. Timeline, an ordered sequence of all the write operations done on the table.
2. A hierarchical layout of data files that contain the records written to the
   table.
3. Metadata table, internally-managed metadata to support different indexes for
   efficient lookups during read and write.

## Partitioning
TODO(vc): Need to differentiate how we are/never did Hive style partitioning.

## Meta fields
TODO(vc): explain all the meta fields, why they exist.

# File Layout

Hudi organizes data tables into a directory structure under a base path (root
directory for the table) on a distributed file system. The general layout
structure is as follows:

* All metadata of a Hudi table is located in `.hoodie` directory under the base
  path.
* Tables are broken up into partitions.
* Within each partition, files are organized into file groups, uniquely
  identified by a file ID.
* Each file group contains several file slices.
* Each slice contains a base file (`.parquet`) produced at a certain
  commit/compaction instant time, along with set of log files (`.log.*`) that
  contain inserts/updates to the base file since the base file was produced.

![](/assets/images/hudi_file_layout.png)

Hudi adopts Multiversion Concurrency Control (MVCC),
where [compaction](https://hudi.apache.org/docs/next/compaction) action merges
logs and base files to produce new file slices
and [cleaning](https://hudi.apache.org/docs/next/hoodie_cleaner) action gets rid
of unused/older file slices to reclaim space on the file system.

## File Groups

## File Slices

## Base Files 
The base file name format is:

TODO(vc): we should avoid any Java here and stil to just generic string representations

```java
/**
 * fileId: a uuid for the file group to which a particular file belongs
 * writeToken: a unique token per write operation
 * instantTime: timestamp of the instant when commit started
 * fileExtension: base file extension such as .parquet, .orc
 */
String.format("%s_%s_%s%s",fileId,writeToken,instantTime,fileExtension)
```

The log file name format is:

```java
/**
 * fileId: a uuid for the file group to which a particular file belongs
 * writeToken: a unique token per write operation
 * baseCommitTime: timestamp of the instant when commit started
 * logFileExtension: log file extension such as .log
 * version: monotonically increasing, indicates the current version of log file
 */
String.format("%s_%s%s.%d_%s",fileId,baseCommitTime,logFileExtension,version,writeToken)
```

Together with base files and log files, file slices contain all versions of a
group of records. Such a specification enables fine-grained multi-version
concurrency control.

## Log Files

![](/assets/images/hudi_log_format_v2.png)

# Timeline

TODO(vc): need to be audited for completeness. e.g do we cover all actions. 

At its core, Hudi maintains a `timeline` of all actions performed on the table
at different `instants` of time that helps provide instantaneous views of the
table, while also efficiently supporting retrieval of data in the order of
arrival. A Hudi instant consists of the following components

* `Action` : Type of action performed on the table.
* `Time` : Instant time is typically a timestamp at ms granularity (e.g:
  20190117010349000), which monotonically increases in the order of action's
  begin time.
* `State` : Current state of the instant (pending or completed).

Hudi guarantees that the actions performed on the timeline are atomic & timeline
consistent based on the instant time.

Key actions performed include

* `COMMIT` - A commit denotes an **atomic write** of a batch of records into a
  table.
* `DELTACOMMIT` - A delta commit refers to an **atomic write** of a batch of
  records into a Merge-On-Read type table, where some/all of the data could be
  just written to delta logs.
* `CLEAN` - Background activity that gets rid of older versions of files in the
  table, that are no longer needed.
* `COMPACTION` - Background activity to reconcile differential data structures
  within Hudi e.g: moving updates from row based log files to columnar formats.
  Internally, compaction manifests as a special commit on the timeline
* `REPLACECOMMIT` - Background activity to cluster data files.
* `ROLLBACK` - Indicates that a commit/delta commit was unsuccessful & rolled
  back, removing any partial files produced during such a write
* `SAVEPOINT` - Marks certain file groups as "saved", such that cleaner will not
  delete them. It helps restore the table to a point on the timeline, in case of
  disaster/data recovery scenarios.
* `RESTORE` - Indicates point-in-time restore.

Any given instant can be in one of the following states:

* `REQUESTED` - Denotes an action has been scheduled, but has not initiated
* `INFLIGHT` - Denotes that the action is currently being performed
* `COMPLETED` - Denotes completion of an action on the timeline

![](/assets/images/hudi_timeline.png)

Example above shows upserts happenings between 10:00 and 10:20 on a Hudi table,
roughly every 5 mins, leaving commit metadata on the Hudi timeline, along with
other background cleaning/compactions. One key observation to make is that the
commit time indicates the `arrival time` of the data (10:20AM), while the actual
data organization reflects the actual time or `event time`, the data was
intended for (hourly buckets from 07:00). These are two key concepts when
reasoning about tradeoffs between latency and completeness of data.

When there is late arriving data (data intended for 9:00 arriving >1 hr late at
10:20), we can see the upsert producing new data into even older time
buckets/folders. With the help of the timeline, an incremental query attempting
to get all new data that was committed successfully since 10:00 hours, is able
to very efficiently consume only the changed files without say scanning all the
time buckets > 07:00.

## Actions

## Archived


# Keys
TODO(vc): should this be before. 

When writing data into Hudi, you model the records like how you would on a
key-value store - specify a **key** field (unique for a single partition/across
dataset), a **partition** field (denotes partition to place key into) and
**precombine** field to determine how to handle duplicates in a batch of records
written. This model enables Hudi to enforce primary key constraints like you
would get on a database table.

# Metadata

Metadata table is an internally-managed table which has the same structure as a
Hudi Merge-On-Read table. The base path of metadata table is `.hoodie/metadata`
under the base path of data table. Specifically, metadata table has the
following partitions:

* `files` - data partition to files index, which helps in partition pruning
  while listing files.
* `column_stats` - contains the statistics of all columns, which improves file
  pruning based on key and column value ranges.
* `bloom_filters` - bloom filter index containing the file-level bloom filter to
  facilitate the key lookup and file pruning.

With these indexes, the metadata table improves both write throughput and query
planning. The current schema of the metadata table (as of version 0.11.0) is
mentioned below and any further evolution of the schema can be
tracked [here](/hudi-common/src/main/avro/HoodieMetadata.avsc).

<details>
<summary>Metadata Schema</summary>

```avro schema
{
  "namespace": "org.apache.hudi.avro.model",
  "type": "record",
  "name": "HoodieMetadataRecord",
  "doc": "A record saved within the Metadata Table",
  "fields": [
    {
      "name": "key",
      "type": "string"
    },
    {
      "name": "type",
      "doc": "Type of the metadata record",
      "type": "int"
    },
    {
      "doc": "Contains information about partitions and files within the dataset",
      "name": "filesystemMetadata",
      "type": [
        "null",
        {
          "type": "map",
          "values": {
            "type": "record",
            "name": "HoodieMetadataFileInfo",
            "fields": [
              {
                "name": "size",
                "type": "long",
                "doc": "Size of the file"
              },
              {
                "name": "isDeleted",
                "type": "boolean",
                "doc": "True if this file has been deleted"
              }
            ]
          }
        }
      ]
    },
    {
      "doc": "Metadata Index of bloom filters for all data files in the user table",
      "name": "BloomFilterMetadata",
      "type": [
        "null",
        {
          "doc": "Data file bloom filter details",
          "name": "HoodieMetadataBloomFilter",
          "type": "record",
          "fields": [
            {
              "doc": "Bloom filter type code",
              "name": "type",
              "type": "string"
            },
            {
              "doc": "Instant timestamp when this metadata was created/updated",
              "name": "timestamp",
              "type": "string"
            },
            {
              "doc": "Bloom filter binary byte array",
              "name": "bloomFilter",
              "type": "bytes"
            },
            {
              "doc": "Bloom filter entry valid/deleted flag",
              "name": "isDeleted",
              "type": "boolean"
            }
          ]
        }
      ],
      "default": null
    },
    {
      "doc": "Metadata Index of column statistics for all data files in the user table",
      "name": "ColumnStatsMetadata",
      "type": [
        "null",
        {
          "doc": "Data file column statistics",
          "name": "HoodieMetadataColumnStats",
          "type": "record",
          "fields": [
            {
              "doc": "File name for which this column statistics applies",
              "name": "fileName",
              "type": [
                "null",
                "string"
              ],
              "default": null
            },
            {
              "doc": "Column name for which this column statistics applies",
              "name": "columnName",
              "type": [
                "null",
                "string"
              ],
              "default": null
            },
            {
              "doc": "Minimum value in the range. Based on user data table schema, we can convert this to appropriate type",
              "name": "minValue",
              "type": [
                // Those types should be aligned with Parquet `Statistics` impl
                // making sure that we implement semantic consistent across file formats
                //
                // NOTE: Other logical types (decimal, date, timestamp, etc) will be converted
                //       into one of the following types, making sure that their corresponding
                //       ordering is preserved
                "null",
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "BooleanWrapper",
                  "doc": "A record wrapping boolean type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "boolean",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "IntWrapper",
                  "doc": "A record wrapping int type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "int",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "LongWrapper",
                  "doc": "A record wrapping long type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "long",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "FloatWrapper",
                  "doc": "A record wrapping float type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "float",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "DoubleWrapper",
                  "doc": "A record wrapping double type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "double",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "BytesWrapper",
                  "doc": "A record wrapping bytes type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "bytes",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "StringWrapper",
                  "doc": "A record wrapping string type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": "string",
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "DateWrapper",
                  "doc": "A record wrapping Date logical type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": {
                        "type": "int"
                        // NOTE: Due to breaking changes in code-gen b/w Avro 1.8.2 and 1.10, we can't
                        //       rely on logical types to do proper encoding of the native Java types,
                        //       and hereby have to encode statistic manually
                        //"logicalType": "date"
                      },
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "DecimalWrapper",
                  "doc": "A record wrapping Decimal logical type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": {
                        "type": "bytes",
                        "logicalType": "decimal",
                        // NOTE: This is equivalent to Spark's [[DoubleDecimal]] and should
                        //       be enough for almost any possible use-cases
                        "precision": 30,
                        "scale": 15
                      },
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "TimeMicrosWrapper",
                  "doc": "A record wrapping Time-micros logical type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": {
                        "type": "long",
                        "logicalType": "time-micros"
                      },
                      "name": "value"
                    }
                  ]
                },
                {
                  "namespace": "org.apache.hudi.avro.model",
                  "type": "record",
                  "name": "TimestampMicrosWrapper",
                  "doc": "A record wrapping Timestamp-micros logical type to be able to be used it w/in Avro's Union",
                  "fields": [
                    {
                      "type": {
                        "type": "long"
                        // NOTE: Due to breaking changes in code-gen b/w Avro 1.8.2 and 1.10, we can't
                        //       rely on logical types to do proper encoding of the native Java types,
                        //       and hereby have to encode statistic manually
                        //"logicalType": "timestamp-micros"
                      },
                      "name": "value"
                    }
                  ]
                }
              ],
              "default": null
            },
            {
              "doc": "Maximum value in the range. Based on user data table schema, we can convert it to appropriate type",
              "name": "maxValue",
              "type": [
                // Those types should be aligned with Parquet `Statistics` impl
                // making sure that we implement semantic consistent across file formats
                //
                // NOTE: Other logical types (decimal, date, timestamp, etc) will be converted
                //       into one of the following types, making sure that their corresponding
                //       ordering is preserved
                "null",
                "org.apache.hudi.avro.model.BooleanWrapper",
                "org.apache.hudi.avro.model.IntWrapper",
                "org.apache.hudi.avro.model.LongWrapper",
                "org.apache.hudi.avro.model.FloatWrapper",
                "org.apache.hudi.avro.model.DoubleWrapper",
                "org.apache.hudi.avro.model.BytesWrapper",
                "org.apache.hudi.avro.model.StringWrapper",
                "org.apache.hudi.avro.model.DateWrapper",
                "org.apache.hudi.avro.model.DecimalWrapper",
                "org.apache.hudi.avro.model.TimeMicrosWrapper",
                "org.apache.hudi.avro.model.TimestampMicrosWrapper"
              ],
              "default": null
            },
            {
              "doc": "Total count of values",
              "name": "valueCount",
              "type": [
                "null",
                "long"
              ],
              "default": null
            },
            {
              "doc": "Total count of null values",
              "name": "nullCount",
              "type": [
                "null",
                "long"
              ],
              "default": null
            },
            {
              "doc": "Total storage size on disk",
              "name": "totalSize",
              "type": [
                "null",
                "long"
              ],
              "default": null
            },
            {
              "doc": "Total uncompressed storage size on disk",
              "name": "totalUncompressedSize",
              "type": [
                "null",
                "long"
              ],
              "default": null
            },
            {
              "doc": "Column range entry valid/deleted flag",
              "name": "isDeleted",
              "type": "boolean"
            }
          ]
        }
      ],
      "default": null
    }
  ]
}
```

</details>


## Marker Files 

## Table Properties

## File Listings

## Column Statistics

## Multi-modal Indexes

# Concurrency Control

Hudi's concurrency model supports both Multi Version Concurrency Control (MVCC)
and Optimistic Concurrency Control (OCC).

- **MVCC** : Hudi table services such as compaction, cleaning, clustering
  leverage Multi Version Concurrency Control to provide snapshot isolation
  between multiple table service writers and readers. Additionally, using MVCC,
  Hudi provides snapshot isolation between an ingestion writer and multiple
  concurrent readers. With this model, Hudi supports running any number of table
  service jobs concurrently, without any concurrency conflict. This is made
  possible by ensuring that scheduling plans of such table services always
  happens in a single writer mode to ensure no conflict and avoids race
  conditions.

- **OCC** : Write operations such as the ones described above (UPSERT, INSERT)
  etc, leverage optimistic concurrency control to enable multiple ingestion
  writers to the same Hudi Table. Hudi supports **file-level OCC**, i.e., for
  any two commits (or writers) happening to the same table, if they do not have
  writes to overlapping files being changed, both writers are allowed to
  succeed. This feature requires an external lock provider such Zookeeper or
  HiveMetastore or a consistent key-value store like DynamoDB.

It may be helpful to understand the different guarantees provided
by [write operations](https://hudi.apache.org/docs/write_operations) via Hudi.

TODO(vc): does not seem like a good place for guarantees. Should n't this be part of user-docs

## Single Writer Guarantees

- *UPSERT*: The target table will NEVER show duplicates.
- *INSERT*: The target table wilL NEVER have duplicates if deduplication is
  enabled.
- *BULK_INSERT*: The target table will NEVER have duplicates if deduplication is
  enabled.
- *INCREMENTAL PULL*: Data consumption and checkpoints are NEVER out of order.

## Multi Writer Guarantees

With multiple writers using OCC, some of the above guarantees change as follows

- *UPSERT*: The target table will NEVER show duplicates.
- *INSERT*: The target table MIGHT have duplicates even if deduplication is
  enabled.
- *BULK_INSERT Guarantee*: The target table MIGHT have duplicates even if
  deduplication is enabled.
- *INCREMENTAL PULL*: Data consumption and checkpoints MIGHT be out of order due
  to multiple writer jobs finishing at different times.


# Types & Schema Evolution

TODO(vc): what types are supported and how is schema encoded/evolved

# Table Versions Evolution

# Writer Algorithm

TODO(vc): sketch how a correct, consitent writer can write to into a Hudi table

# Reader Algorithm

TODO(vc): sketch how a correct, consitent reader can read from a Hudi table


# Change History

TODO(vc): change history and differences between different table versions. We are at 4 now.

# Example

Let us create a Hudi Merge-On-Read table with all indexes enabled and understand
how the layout evolves. The base path of data table is `/tmp/hudi_trips` and the
corresponding metadata table is at `/tmp/hudi_trips/.hoodie/metadata`.

Hudi has an in-built data generator tool. More details about the tool such as
data schema and generation logic can be found
in [QuickstartUtils](/hudi-spark-datasource/hudi-spark/src/main/java/org/apache/hudi/QuickstartUtils.java)
. For the purpose of below discussion, it suffices to mention that the data is
partitioned by `<region>/<country>/<city>/`, `uuid` is the record key and `ts`
is the precombine field. After the very first insert, this is how the directory
structure looks like:

```
/tmp/hudi_trips/
├── .hoodie
│   ├── 20220609121017723.deltacommit
│   ├── 20220609121017723.deltacommit.inflight
│   ├── 20220609121017723.deltacommit.requested
│   └── metadata
│       ├── .hoodie
│       │   ├── 00000000000000.deltacommit
│       │   ├── 00000000000000.deltacommit.inflight
│       │   ├── 00000000000000.deltacommit.requested
│       │   ├── 20220609121017723.deltacommit
│       │   ├── 20220609121017723.deltacommit.inflight
│       │   └── 20220609121017723.deltacommit.requested
│       ├── bloom_filters
│       │   ├── .bloom-filters-0000_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0000_00000000000000.log.2_1-295-362
│       │   ├── .bloom-filters-0001_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0001_00000000000000.log.2_0-295-361
│       │   ├── .bloom-filters-0002_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0003_00000000000000.log.1_0-0-0
│       │   └── .bloom-filters-0003_00000000000000.log.2_2-295-363
│       ├── column_stats
│       │   ├── .col-stats-0000_00000000000000.log.1_0-0-0
│       │   ├── .col-stats-0000_00000000000000.log.2_4-295-365
│       │   ├── .col-stats-0001_00000000000000.log.1_0-0-0
│       │   └── .col-stats-0001_00000000000000.log.2_3-295-364
│       └── files
│           ├── .files-0000_00000000000000.log.1_0-0-0
│           ├── .files-0000_00000000000000.log.1_0-257-287
│           └── .files-0000_00000000000000.log.2_5-295-366
├── americas
│   ├── brazil
│   │   └── sao_paulo
│   │       └── 1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-283-317_20220609121017723.parquet
│   └── united_states
│       └── san_francisco
│           └── 8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-283-318_20220609121017723.parquet
└── asia
    └── india
        └── chennai
            └── 2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-283-319_20220609121017723.parquet
```

A commit metadata file such as `20220609121017723.deltacommit` contains the
workload profile in json format. It includes the number of
inserts/updates/deletes per file ID, file size, and some extra metadata such as
checkpoint and schema for the batch of records written. The avro schema of the
commit metadata itself is as follows:
<details>
  <summary>Schema</summary>

```avro schema
{
  "namespace": "org.apache.hudi.avro.model",
  "type": "record",
  "name": "HoodieCommitMetadata",
  "fields": [
    {
      "name": "partitionToWriteStats",
      "type": [
        "null",
        {
          "type": "map",
          "values": {
            "type": "array",
            "items": {
              "name": "HoodieWriteStat",
              "type": "record",
              "fields": [
                {
                  "name": "fileId",
                  "type": [
                    "null",
                    "string"
                  ],
                  "default": null
                },
                {
                  "name": "path",
                  "type": [
                    "null",
                    "string"
                  ],
                  "default": null
                },
                {
                  "name": "prevCommit",
                  "type": [
                    "null",
                    "string"
                  ],
                  "default": null
                },
                {
                  "name": "numWrites",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "numDeletes",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "numUpdateWrites",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalWriteBytes",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalWriteErrors",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "partitionPath",
                  "type": [
                    "null",
                    "string"
                  ],
                  "default": null
                },
                {
                  "name": "totalLogRecords",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalLogFiles",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalUpdatedRecordsCompacted",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "numInserts",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalLogBlocks",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalCorruptLogBlock",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "totalRollbackBlocks",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                },
                {
                  "name": "fileSizeInBytes",
                  "type": [
                    "null",
                    "long"
                  ],
                  "default": null
                }
              ]
            }
          }
        }
      ],
      "default": null
    },
    {
      "name": "extraMetadata",
      "type": [
        "null",
        {
          "type": "map",
          "values": "string",
          "default": null
        }
      ],
      "default": null
    },
    {
      "name": "version",
      "type": [
        "int",
        "null"
      ],
      "default": 1
    },
    {
      "name": "operationType",
      "type": [
        "null",
        "string"
      ],
      "default": null
    }
  ]
}
```

</details>

<details>
  <summary>Example</summary>

```json
{
  "partitionToWriteStats": {
    "americas/brazil/sao_paulo": [
      {
        "fileId": "1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0",
        "path": "americas/brazil/sao_paulo/1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-283-317_20220609121017723.parquet",
        "prevCommit": "null",
        "numWrites": 3,
        "numDeletes": 0,
        "numUpdateWrites": 0,
        "numInserts": 3,
        "totalWriteBytes": 437870,
        "totalWriteErrors": 0,
        "tempPath": null,
        "partitionPath": "americas/brazil/sao_paulo",
        "totalLogRecords": 0,
        "totalLogFilesCompacted": 0,
        "totalLogSizeCompacted": 0,
        "totalUpdatedRecordsCompacted": 0,
        "totalLogBlocks": 0,
        "totalCorruptLogBlock": 0,
        "totalRollbackBlocks": 0,
        "fileSizeInBytes": 437870,
        "minEventTime": null,
        "maxEventTime": null
      }
    ],
    "americas/united_states/san_francisco": [
      {
        "fileId": "8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0",
        "path": "americas/united_states/san_francisco/8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-283-318_20220609121017723.parquet",
        "prevCommit": "null",
        "numWrites": 3,
        "numDeletes": 0,
        "numUpdateWrites": 0,
        "numInserts": 3,
        "totalWriteBytes": 438021,
        "totalWriteErrors": 0,
        "tempPath": null,
        "partitionPath": "americas/united_states/san_francisco",
        "totalLogRecords": 0,
        "totalLogFilesCompacted": 0,
        "totalLogSizeCompacted": 0,
        "totalUpdatedRecordsCompacted": 0,
        "totalLogBlocks": 0,
        "totalCorruptLogBlock": 0,
        "totalRollbackBlocks": 0,
        "fileSizeInBytes": 438021,
        "minEventTime": null,
        "maxEventTime": null
      }
    ],
    "asia/india/chennai": [
      {
        "fileId": "2288d88d-15fd-4af2-ad79-31d50bd93827-0",
        "path": "asia/india/chennai/2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-283-319_20220609121017723.parquet",
        "prevCommit": "null",
        "numWrites": 4,
        "numDeletes": 0,
        "numUpdateWrites": 0,
        "numInserts": 4,
        "totalWriteBytes": 437858,
        "totalWriteErrors": 0,
        "tempPath": null,
        "partitionPath": "asia/india/chennai",
        "totalLogRecords": 0,
        "totalLogFilesCompacted": 0,
        "totalLogSizeCompacted": 0,
        "totalUpdatedRecordsCompacted": 0,
        "totalLogBlocks": 0,
        "totalCorruptLogBlock": 0,
        "totalRollbackBlocks": 0,
        "fileSizeInBytes": 437858,
        "minEventTime": null,
        "maxEventTime": null
      }
    ]
  },
  "compacted": false,
  "extraMetadata": {
    "schema": "{\"type\":\"record\",\"name\":\"hudi_trips_mor_record\",\"namespace\":\"hoodie.hudi_trips_mor\",\"fields\":[{\"name\":\"begin_lat\",\"type\":[\"null\",\"double\"],\"default\":null},{\"name\":\"begin_lon\",\"type\":[\"null\",\"double\"],\"default\":null},{\"name\":\"driver\",\"type\":[\"null\",\"string\"],\"default\":null},{\"name\":\"end_lat\",\"type\":[\"null\",\"double\"],\"default\":null},{\"name\":\"end_lon\",\"type\":[\"null\",\"double\"],\"default\":null},{\"name\":\"fare\",\"type\":[\"null\",\"double\"],\"default\":null},{\"name\":\"partitionpath\",\"type\":[\"null\",\"string\"],\"default\":null},{\"name\":\"rider\",\"type\":[\"null\",\"string\"],\"default\":null},{\"name\":\"ts\",\"type\":[\"null\",\"long\"],\"default\":null},{\"name\":\"uuid\",\"type\":[\"null\",\"string\"],\"default\":null}]}"
  },
  "operationType": "UPSERT",
  "writePartitionPaths": [
    "americas/brazil/sao_paulo",
    "americas/united_states/san_francisco",
    "asia/india/chennai"
  ],
  "fileIdAndRelativePaths": {
    "1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0": "americas/brazil/sao_paulo/1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-283-317_20220609121017723.parquet",
    "8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0": "americas/united_states/san_francisco/8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-283-318_20220609121017723.parquet",
    "2288d88d-15fd-4af2-ad79-31d50bd93827-0": "asia/india/chennai/2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-283-319_20220609121017723.parquet"
  },
  "writeStats": [
    {
      "fileId": "1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0",
      "path": "americas/brazil/sao_paulo/1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-283-317_20220609121017723.parquet",
      "prevCommit": "null",
      "numWrites": 3,
      "numDeletes": 0,
      "numUpdateWrites": 0,
      "numInserts": 3,
      "totalWriteBytes": 437870,
      "totalWriteErrors": 0,
      "tempPath": null,
      "partitionPath": "americas/brazil/sao_paulo",
      "totalLogRecords": 0,
      "totalLogFilesCompacted": 0,
      "totalLogSizeCompacted": 0,
      "totalUpdatedRecordsCompacted": 0,
      "totalLogBlocks": 0,
      "totalCorruptLogBlock": 0,
      "totalRollbackBlocks": 0,
      "fileSizeInBytes": 437870,
      "minEventTime": null,
      "maxEventTime": null
    },
    {
      "fileId": "8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0",
      "path": "americas/united_states/san_francisco/8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-283-318_20220609121017723.parquet",
      "prevCommit": "null",
      "numWrites": 3,
      "numDeletes": 0,
      "numUpdateWrites": 0,
      "numInserts": 3,
      "totalWriteBytes": 438021,
      "totalWriteErrors": 0,
      "tempPath": null,
      "partitionPath": "americas/united_states/san_francisco",
      "totalLogRecords": 0,
      "totalLogFilesCompacted": 0,
      "totalLogSizeCompacted": 0,
      "totalUpdatedRecordsCompacted": 0,
      "totalLogBlocks": 0,
      "totalCorruptLogBlock": 0,
      "totalRollbackBlocks": 0,
      "fileSizeInBytes": 438021,
      "minEventTime": null,
      "maxEventTime": null
    },
    {
      "fileId": "2288d88d-15fd-4af2-ad79-31d50bd93827-0",
      "path": "asia/india/chennai/2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-283-319_20220609121017723.parquet",
      "prevCommit": "null",
      "numWrites": 4,
      "numDeletes": 0,
      "numUpdateWrites": 0,
      "numInserts": 4,
      "totalWriteBytes": 437858,
      "totalWriteErrors": 0,
      "tempPath": null,
      "partitionPath": "asia/india/chennai",
      "totalLogRecords": 0,
      "totalLogFilesCompacted": 0,
      "totalLogSizeCompacted": 0,
      "totalUpdatedRecordsCompacted": 0,
      "totalLogBlocks": 0,
      "totalCorruptLogBlock": 0,
      "totalRollbackBlocks": 0,
      "fileSizeInBytes": 437858,
      "minEventTime": null,
      "maxEventTime": null
    }
  ],
  "totalRecordsDeleted": 0,
  "totalLogRecordsCompacted": 0,
  "totalLogFilesCompacted": 0,
  "totalCompactedRecordsUpdated": 0,
  "totalLogFilesSize": 0,
  "totalScanTime": 0,
  "totalCreateTime": 385,
  "totalUpsertTime": 0,
  "minAndMaxEventTime": {
    "Optional.empty": {
      "val": null,
      "present": false
    }
  }
}
```

</details>

Now, let us see how the structure changes when couple of updates are issued.

```
/tmp/hudi_trips/
├── .hoodie
│   ├── 20220609121017723.deltacommit
│   ├── 20220609121017723.deltacommit.inflight
│   ├── 20220609121017723.deltacommit.requested
│   ├── 20220609125420589.deltacommit
│   ├── 20220609125420589.deltacommit.inflight
│   ├── 20220609125420589.deltacommit.requested
│   ├── 20220609125512096.deltacommit
│   ├── 20220609125512096.deltacommit.inflight
│   ├── 20220609125512096.deltacommit.requested
│   └── metadata
│       ├── .hoodie
│       │   ├── 00000000000000.deltacommit
│       │   ├── 00000000000000.deltacommit.inflight
│       │   ├── 00000000000000.deltacommit.requested
│       │   ├── 20220609121017723.deltacommit
│       │   ├── 20220609121017723.deltacommit.inflight
│       │   ├── 20220609121017723.deltacommit.requested
│       │   ├── 20220609125420589.deltacommit
│       │   ├── 20220609125420589.deltacommit.inflight
│       │   ├── 20220609125420589.deltacommit.requested
│       │   ├── 20220609125512096.deltacommit
│       │   ├── 20220609125512096.deltacommit.inflight
│       │   └── 20220609125512096.deltacommit.requested
│       ├── bloom_filters
│       │   ├── .bloom-filters-0000_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0000_00000000000000.log.2_1-295-362
│       │   ├── .bloom-filters-0000_00000000000000.log.3_0-375-562
│       │   ├── .bloom-filters-0001_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0001_00000000000000.log.2_0-295-361
│       │   ├── .bloom-filters-0001_00000000000000.log.3_0-335-463
│       │   ├── .bloom-filters-0002_00000000000000.log.1_0-0-0
│       │   ├── .bloom-filters-0002_00000000000000.log.2_1-335-464
│       │   ├── .bloom-filters-0002_00000000000000.log.3_1-375-563
│       │   ├── .bloom-filters-0003_00000000000000.log.1_0-0-0
│       │   └── .bloom-filters-0003_00000000000000.log.2_2-295-363
│       ├── column_stats
│       │   ├── .col-stats-0000_00000000000000.log.1_0-0-0
│       │   ├── .col-stats-0000_00000000000000.log.2_4-295-365
│       │   ├── .col-stats-0000_00000000000000.log.3_3-335-466
│       │   ├── .col-stats-0000_00000000000000.log.4_3-375-565
│       │   ├── .col-stats-0001_00000000000000.log.1_0-0-0
│       │   ├── .col-stats-0001_00000000000000.log.2_3-295-364
│       │   ├── .col-stats-0001_00000000000000.log.3_2-335-465
│       │   └── .col-stats-0001_00000000000000.log.4_2-375-564
│       └── files
│           ├── .files-0000_00000000000000.log.1_0-0-0
│           ├── .files-0000_00000000000000.log.1_0-257-287
│           ├── .files-0000_00000000000000.log.2_5-295-366
│           ├── .files-0000_00000000000000.log.3_4-335-467
│           └── .files-0000_00000000000000.log.4_4-375-566
├── americas
│   ├── brazil
│   │   └── sao_paulo
│   │       ├── 1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-283-317_20220609121017723.parquet
│   │       ├── 1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-323-419_20220609125420589.parquet
│   │       └── 1d953dc8-f095-4a29-afd6-f3f7d9d60abf-0_0-363-518_20220609125512096.parquet
│   └── united_states
│       └── san_francisco
│           ├── 8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-283-318_20220609121017723.parquet
│           ├── 8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-323-420_20220609125420589.parquet
│           └── 8aebc382-0e7e-4ea1-baf5-3106dc501ef5-0_1-363-519_20220609125512096.parquet
└── asia
    └── india
        └── chennai
            ├── .2288d88d-15fd-4af2-ad79-31d50bd93827-0_20220609125420589.log.1_2-363-520
            ├── 2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-283-319_20220609121017723.parquet
            └── 2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-323-421_20220609125420589.parquet
```

There are two things to note in the layout:

1. The log files (where the udpates go) should be created under the same
   filegroup corresponding to the key of the record that was being updated. In
   the above example, notice the log file name for the update in the
   partition `asia/india/chennai/`
   is `.2288d88d-15fd-4af2-ad79-31d50bd93827-0_20220609125420589.log.1_2-363-520`
   wherein `2288d88d-15fd-4af2-ad79-31d50bd93827-0` is the same file group ID
   and `20220609125420589` is the same instant as the base
   file (`2288d88d-15fd-4af2-ad79-31d50bd93827-0_2-323-421_20220609125420589.parquet`)
   .
2. The metadata timeline and the data timeline should be in sync. In the above
   example, notice the `time` of the instants in both the timelines.
   So, `20220609121017723.deltacommit` under `/tmp/hudi_trips/.hoodie/metadata`
   corresponds to the index updates for `20220609121017723.deltacommit` in data
   timeline.

These are two key ingredients of the specification which enables log-based
concurrency control. Timeline plays the role of an event log, the central piece
for inter-process coordination.
