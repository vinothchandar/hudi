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

/**
 * Enumeration of data types supported by Hoodie schema system.
 * This type system is designed to be compatible with Apache Arrow types
 * while supporting all existing Avro types used in Hudi.
 */
public enum HoodieDataType {
  // Primitive types (compatible with Arrow)
  NULL,
  BOOLEAN,
  INT8,       // Byte
  INT16,      // Short
  INT32,      // Int
  INT64,      // Long
  UINT8,      // Unsigned byte (Arrow extension)
  UINT16,     // Unsigned short (Arrow extension)
  UINT32,     // Unsigned int (Arrow extension)
  UINT64,     // Unsigned long (Arrow extension)
  FLOAT32,    // Float
  FLOAT64,    // Double
  BINARY,     // Bytes
  STRING,     // UTF-8 String
  
  // Temporal types (Arrow compatible)
  DATE32,     // Date (days since epoch)
  DATE64,     // Date (milliseconds since epoch)
  TIME32,     // Time of day (seconds or milliseconds)
  TIME64,     // Time of day (microseconds or nanoseconds)
  TIMESTAMP,  // Timestamp with timezone
  DURATION,   // Duration/interval
  
  // Decimal types
  DECIMAL128, // 128-bit decimal
  DECIMAL256, // 256-bit decimal
  
  // Complex types
  ARRAY,      // List/Array
  MAP,        // Map/Dictionary
  STRUCT,     // Record/Struct
  UNION,      // Union type
  
  // Special Avro compatibility types
  ENUM,       // Enumeration
  FIXED;      // Fixed-length binary
  
  /**
   * Returns true if this type is a primitive type.
   */
  public boolean isPrimitive() {
    switch (this) {
      case NULL:
      case BOOLEAN:
      case INT8:
      case INT16:
      case INT32:
      case INT64:
      case UINT8:
      case UINT16:
      case UINT32:
      case UINT64:
      case FLOAT32:
      case FLOAT64:
      case BINARY:
      case STRING:
      case DATE32:
      case DATE64:
      case TIME32:
      case TIME64:
      case TIMESTAMP:
      case DURATION:
      case DECIMAL128:
      case DECIMAL256:
      case ENUM:
      case FIXED:
        return true;
      default:
        return false;
    }
  }
  
  /**
   * Returns true if this type is a complex type.
   */
  public boolean isComplex() {
    return !isPrimitive();
  }
  
  /**
   * Returns true if this type is a temporal type.
   */
  public boolean isTemporal() {
    switch (this) {
      case DATE32:
      case DATE64:
      case TIME32:
      case TIME64:
      case TIMESTAMP:
      case DURATION:
        return true;
      default:
        return false;
    }
  }
  
  /**
   * Returns true if this type is a numeric type.
   */
  public boolean isNumeric() {
    switch (this) {
      case INT8:
      case INT16:
      case INT32:
      case INT64:
      case UINT8:
      case UINT16:
      case UINT32:
      case UINT64:
      case FLOAT32:
      case FLOAT64:
      case DECIMAL128:
      case DECIMAL256:
        return true;
      default:
        return false;
    }
  }
}