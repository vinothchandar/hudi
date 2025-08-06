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

package org.apache.hudi.schema;

import java.io.Serializable;
import java.util.Map;
import java.util.Objects;

/**
 * Represents a field in a Hoodie schema.
 * This is compatible with both Arrow Field and Avro Field concepts.
 */
public class HoodieField implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private final String name;
  private final HoodieFieldType type;
  private final boolean nullable;
  private final Map<String, String> metadata;
  
  public HoodieField(String name, HoodieFieldType type, boolean nullable) {
    this(name, type, nullable, null);
  }
  
  public HoodieField(String name, HoodieFieldType type, boolean nullable, Map<String, String> metadata) {
    this.name = Objects.requireNonNull(name, "Field name cannot be null");
    this.type = Objects.requireNonNull(type, "Field type cannot be null");
    this.nullable = nullable;
    this.metadata = metadata;
  }
  
  public String getName() {
    return name;
  }
  
  public HoodieFieldType getType() {
    return type;
  }
  
  public boolean isNullable() {
    return nullable;
  }
  
  public Map<String, String> getMetadata() {
    return metadata;
  }
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    HoodieField that = (HoodieField) o;
    return nullable == that.nullable &&
           Objects.equals(name, that.name) &&
           Objects.equals(type, that.type) &&
           Objects.equals(metadata, that.metadata);
  }
  
  @Override
  public int hashCode() {
    return Objects.hash(name, type, nullable, metadata);
  }
  
  @Override
  public String toString() {
    return String.format("HoodieField{name='%s', type=%s, nullable=%s}", name, type, nullable);
  }
}