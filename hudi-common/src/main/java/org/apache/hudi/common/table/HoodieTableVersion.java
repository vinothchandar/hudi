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

package org.apache.hudi.common.table;

import org.apache.hudi.exception.HoodieException;

import java.util.Arrays;

/**
 * Table's version that controls what version of writer/readers can actually read/write
 * to a given table.
 */
public enum HoodieTableVersion {
  // < 0.6.0 versions
  ZERO(0, "0.3.0"),
  // 0.6.0 onwards
  ONE(1, "0.6.0"),
  // 0.9.0 onwards
  TWO(2, "0.9.0"),
  // 0.10.0 onwards
  THREE(3, "0.10.0"),
  // 0.11.0 onwards
  FOUR(4, "0.11.0"),
  // 0.12.0 onwards
  FIVE(5, "0.12.0"),
  // 0.14.0 onwards
  SIX(6, "0.14.0"),
  // 0.16.0
  SEVEN(7, "0.16.0"),
  // 1.0
  EIGHT(8, "1.0.0");
  
  private final int versionCode;

  private final String firstReleaseVersion;

  HoodieTableVersion(int versionCode, String firstReleaseVersion) {
    this.versionCode = versionCode;
    this.firstReleaseVersion = firstReleaseVersion;
  }

  public int versionCode() {
    return versionCode;
  }

  public String firstReleaseVersion() {
    return firstReleaseVersion;
  }

  public static HoodieTableVersion current() {
    return EIGHT;
  }

  public static HoodieTableVersion fromVersionCode(int versionCode) {
    return Arrays.stream(HoodieTableVersion.values())
        .filter(v -> v.versionCode == versionCode).findAny()
        .orElseThrow(() -> new HoodieException("Unknown table versionCode:" + versionCode));
  }

  public boolean greaterThan(HoodieTableVersion other) {
    return this.versionCode > other.versionCode;
  }
}
