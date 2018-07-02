/*
 *  Copyright (c) 2017 Uber Technologies, Inc. (hoodie-dev-group@uber.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

package com.uber.hoodie.utilities.parallelmerge;

import com.uber.hoodie.func.ParquetReaderIterator;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.IndexedRecord;

/**
 * Performs a k-way sort/merge across k parquet files, resolving conflicts arbitrarily
 */
public class ParquetSortMergeIterator implements Iterator<IndexedRecord> {


  static class IteratorHolder {

    ParquetReaderIterator<IndexedRecord> iterator;
    String nextKey;
    GenericRecord nextValue;
  }

  private String mergeKey;

  private List<IteratorHolder> iteratorHolderList;

  private IndexedRecord nextRecord;

  public ParquetSortMergeIterator(String mergeKey, List<ParquetReaderIterator<IndexedRecord>> iterators) {
    this.mergeKey = mergeKey;
    this.nextRecord = null;
    this.iteratorHolderList = new ArrayList<>(iterators.size());

    // get first keys from all parquet readers
    iterators.forEach(i -> {
      if (i.hasNext()) {
        IteratorHolder holder = new IteratorHolder();
        holder.iterator = i;
        holder.nextValue = (GenericRecord) i.next();
        holder.nextKey = holder.nextValue.get(mergeKey).toString();
        this.iteratorHolderList.add(holder);
      }
    });
  }

  @Override
  public boolean hasNext() {
    if (nextRecord != null) {
      return true;
    }

    if (iteratorHolderList.size() == 0) {
      return false;
    }

    // find iterator(s) with smallest merge value, set it as next record
    String smallestKey = null;
    for (IteratorHolder itr : iteratorHolderList) {
      if (smallestKey == null) {
        smallestKey = itr.nextKey;
        nextRecord = itr.nextValue;
      } else if (smallestKey.compareTo(itr.nextKey) > 0) {
        smallestKey = itr.nextKey;
        nextRecord = itr.nextValue;
      }
    }

    // advance iteratorHolderList (remove if they are exhausted)
    Iterator<IteratorHolder> holderIterator = iteratorHolderList.iterator();
    while (holderIterator.hasNext()) {
      IteratorHolder holder = holderIterator.next();
      if (holder.nextKey.equals(smallestKey)) {
        if (holder.iterator.hasNext()) {
          holder.nextValue = (GenericRecord) holder.iterator.next();
          holder.nextKey = holder.nextValue.get(mergeKey).toString();
        } else {
          try {
            holder.iterator.close();
          } catch (IOException e) {
            e.printStackTrace();
          }
          holderIterator.remove();
        }
      }
    }

    return true;
  }

  @Override
  public IndexedRecord next() {
    if (!hasNext()) {
      throw new IllegalStateException("Empty iterator");
    }
    IndexedRecord rec = nextRecord;
    nextRecord = null;
    return rec;
  }
}
