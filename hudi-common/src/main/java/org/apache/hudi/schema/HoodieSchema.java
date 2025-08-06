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
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Interface representing a schema for Hudi tables and records.
 * This interface abstracts over different schema representations (Avro, Arrow)
 * while maintaining compatibility with both type systems.
 * 
 * The design follows Arrow-like principles for better type system compatibility
 * while ensuring no currently supported Avro types become unsupported.
 */
public interface HoodieSchema extends Serializable {
  
  /**
   * Returns the name of this schema.
   * @return schema name, or empty if unnamed
   */
  Optional<String> getName();
  
  /**
   * Returns the namespace of this schema.
   * @return schema namespace, or empty if no namespace
   */
  Optional<String> getNamespace();
  
  /**
   * Returns the top-level fields of this schema.
   * @return list of fields in this schema
   */
  List<HoodieField> getFields();
  
  /**
   * Returns a specific field by name.
   * @param fieldName the name of the field to retrieve
   * @return the field if found, empty otherwise
   */
  Optional<HoodieField> getField(String fieldName);
  
  /**
   * Returns the field at the specified index.
   * @param index the index of the field to retrieve
   * @return the field at the given index
   * @throws IndexOutOfBoundsException if index is out of bounds
   */
  HoodieField getField(int index);
  
  /**
   * Returns the number of fields in this schema.
   * @return the number of fields
   */
  int getFieldCount();
  
  /**
   * Returns the names of all fields in this schema.
   * @return list of field names
   */
  List<String> getFieldNames();
  
  /**
   * Returns metadata associated with this schema.
   * @return metadata map, may be empty but never null
   */
  Map<String, String> getMetadata();
  
  /**
   * Returns the schema type (e.g., RECORD for struct-like schemas).
   * @return the schema type
   */
  HoodieSchemaType getSchemaType();
  
  /**
   * Checks if this schema is compatible with another schema.
   * Compatibility rules follow schema evolution principles.
   * @param other the schema to check compatibility against
   * @return true if schemas are compatible, false otherwise
   */
  boolean isCompatibleWith(HoodieSchema other);
  
  /**
   * Creates a new schema with an additional field.
   * @param field the field to add
   * @return new schema with the additional field
   */
  HoodieSchema withField(HoodieField field);
  
  /**
   * Creates a new schema without the specified field.
   * @param fieldName the name of the field to remove
   * @return new schema without the specified field
   */
  HoodieSchema withoutField(String fieldName);
  
  /**
   * Creates a new schema with updated metadata.
   * @param metadata the new metadata
   * @return new schema with updated metadata
   */
  HoodieSchema withMetadata(Map<String, String> metadata);
  
  /**
   * Converts this schema to its string representation.
   * The format may vary depending on the underlying implementation.
   * @return string representation of the schema
   */
  String toSchemaString();
  
  /**
   * Validates that this schema is well-formed and follows Hudi schema rules.
   * @throws IllegalStateException if schema validation fails
   */
  void validate();
  
  /**
   * Enumeration of schema types supported by Hudi.
   */
  enum HoodieSchemaType {
    /**
     * Record/struct schema type - contains named fields.
     */
    RECORD,
    
    /**
     * Array schema type - contains elements of a single type.
     */
    ARRAY,
    
    /**
     * Map schema type - contains key-value pairs.
     */
    MAP,
    
    /**
     * Union schema type - can be one of several types.
     */
    UNION,
    
    /**
     * Primitive schema type - basic data types.
     */
    PRIMITIVE,
    
    /**
     * Enum schema type - enumerated values (Avro compatibility).
     */
    ENUM,
    
    /**
     * Fixed schema type - fixed-length binary (Avro compatibility).
     */
    FIXED
  }
}