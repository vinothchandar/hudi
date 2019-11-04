/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.index.bloom;

import org.apache.hudi.common.BloomFilter;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;

/**
 * Holds the indexing information to be logged onto the file slices
 */
public class IndexInfo {

  private BloomFilter bloomFilter;
  private boolean hasRanges;
  private String minKey;
  private String maxKey;

  public BloomFilter getBloomFilter() {
    return bloomFilter;
  }

  public void setBloomFilter(BloomFilter bloomFilter) {
    this.bloomFilter = bloomFilter;
  }

  public Option<Pair<String, String>> getMinMaxKeyRange() {
    if (hasRanges) {
      return Option.of(Pair.of(minKey, maxKey));
    } else {
      return Option.empty();
    }
  }

  public void setMinMaxKeyRange(Option<Pair<String, String>> minMaxKeyRange) {
    if (minMaxKeyRange.isPresent()) {
      minKey = minMaxKeyRange.get().getLeft();
      maxKey = minMaxKeyRange.get().getRight();
      hasRanges = true;
    } else {
      hasRanges = false;
    }
  }

  public void addKey(String recordKey) {
    bloomFilter.add(recordKey);
    if (minKey.compareTo(recordKey) > 0) {
      minKey = recordKey;
    }
    if (maxKey.compareTo(recordKey) < 0) {
      maxKey = recordKey;
    }
  }
}
