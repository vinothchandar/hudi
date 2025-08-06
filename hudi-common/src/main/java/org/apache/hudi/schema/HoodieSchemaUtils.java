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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Utility class providing comprehensive type mapping, validation, and schema operations
 * for the Hudi schema system. This class ensures type safety and compatibility
 * across Avro and Arrow type systems while maintaining Hudi-specific requirements.
 */
public class HoodieSchemaUtils {
  
  // Type compatibility matrix for schema evolution
  private static final Map<HoodieDataType, Set<HoodieDataType>> COMPATIBLE_TYPES;
  
  // Primitive type mapping for data skipping and statistics
  private static final Map<HoodieDataType, Class<?>> TYPE_TO_JAVA_CLASS;
  
  // Type size mapping for memory estimation
  private static final Map<HoodieDataType, Integer> TYPE_SIZES;
  
  static {
    // Initialize type compatibility matrix
    COMPATIBLE_TYPES = new HashMap<>();
    
    // Null is compatible with all nullable types
    COMPATIBLE_TYPES.put(HoodieDataType.NULL, Collections.singleton(HoodieDataType.NULL));
    
    // Boolean compatibility
    COMPATIBLE_TYPES.put(HoodieDataType.BOOLEAN, Collections.singleton(HoodieDataType.BOOLEAN));
    
    // Integer type compatibility (widening conversions allowed)
    COMPATIBLE_TYPES.put(HoodieDataType.INT8, new HashSet<>(Arrays.asList(
        HoodieDataType.INT8, HoodieDataType.INT16, HoodieDataType.INT32, HoodieDataType.INT64,
        HoodieDataType.FLOAT32, HoodieDataType.FLOAT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.INT16, new HashSet<>(Arrays.asList(
        HoodieDataType.INT16, HoodieDataType.INT32, HoodieDataType.INT64,
        HoodieDataType.FLOAT32, HoodieDataType.FLOAT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.INT32, new HashSet<>(Arrays.asList(
        HoodieDataType.INT32, HoodieDataType.INT64, HoodieDataType.FLOAT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.INT64, new HashSet<>(Arrays.asList(
        HoodieDataType.INT64, HoodieDataType.FLOAT64
    )));
    
    // Unsigned integer compatibility
    COMPATIBLE_TYPES.put(HoodieDataType.UINT8, new HashSet<>(Arrays.asList(
        HoodieDataType.UINT8, HoodieDataType.UINT16, HoodieDataType.UINT32, HoodieDataType.UINT64,
        HoodieDataType.INT16, HoodieDataType.INT32, HoodieDataType.INT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.UINT16, new HashSet<>(Arrays.asList(
        HoodieDataType.UINT16, HoodieDataType.UINT32, HoodieDataType.UINT64,
        HoodieDataType.INT32, HoodieDataType.INT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.UINT32, new HashSet<>(Arrays.asList(
        HoodieDataType.UINT32, HoodieDataType.UINT64, HoodieDataType.INT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.UINT64, Collections.singleton(HoodieDataType.UINT64));
    
    // Float type compatibility
    COMPATIBLE_TYPES.put(HoodieDataType.FLOAT32, new HashSet<>(Arrays.asList(
        HoodieDataType.FLOAT32, HoodieDataType.FLOAT64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.FLOAT64, Collections.singleton(HoodieDataType.FLOAT64));
    
    // String and binary compatibility
    COMPATIBLE_TYPES.put(HoodieDataType.STRING, Collections.singleton(HoodieDataType.STRING));
    COMPATIBLE_TYPES.put(HoodieDataType.BINARY, Collections.singleton(HoodieDataType.BINARY));
    
    // Temporal type compatibility
    COMPATIBLE_TYPES.put(HoodieDataType.DATE32, new HashSet<>(Arrays.asList(
        HoodieDataType.DATE32, HoodieDataType.DATE64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.DATE64, Collections.singleton(HoodieDataType.DATE64));
    COMPATIBLE_TYPES.put(HoodieDataType.TIME32, new HashSet<>(Arrays.asList(
        HoodieDataType.TIME32, HoodieDataType.TIME64
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.TIME64, Collections.singleton(HoodieDataType.TIME64));
    COMPATIBLE_TYPES.put(HoodieDataType.TIMESTAMP, Collections.singleton(HoodieDataType.TIMESTAMP));
    COMPATIBLE_TYPES.put(HoodieDataType.DURATION, Collections.singleton(HoodieDataType.DURATION));
    
    // Decimal compatibility (precision and scale must be compatible)
    COMPATIBLE_TYPES.put(HoodieDataType.DECIMAL128, new HashSet<>(Arrays.asList(
        HoodieDataType.DECIMAL128, HoodieDataType.DECIMAL256
    )));
    COMPATIBLE_TYPES.put(HoodieDataType.DECIMAL256, Collections.singleton(HoodieDataType.DECIMAL256));
    
    // Complex types are compatible only with themselves
    COMPATIBLE_TYPES.put(HoodieDataType.ARRAY, Collections.singleton(HoodieDataType.ARRAY));
    COMPATIBLE_TYPES.put(HoodieDataType.MAP, Collections.singleton(HoodieDataType.MAP));
    COMPATIBLE_TYPES.put(HoodieDataType.STRUCT, Collections.singleton(HoodieDataType.STRUCT));
    COMPATIBLE_TYPES.put(HoodieDataType.UNION, Collections.singleton(HoodieDataType.UNION));
    
    // Avro-specific types
    COMPATIBLE_TYPES.put(HoodieDataType.ENUM, Collections.singleton(HoodieDataType.ENUM));
    COMPATIBLE_TYPES.put(HoodieDataType.FIXED, Collections.singleton(HoodieDataType.FIXED));
    
    // Initialize Java class mappings
    TYPE_TO_JAVA_CLASS = new HashMap<>();
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.NULL, Void.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.BOOLEAN, Boolean.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.INT8, Byte.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.INT16, Short.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.INT32, Integer.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.INT64, Long.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.UINT8, Byte.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.UINT16, Short.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.UINT32, Integer.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.UINT64, Long.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.FLOAT32, Float.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.FLOAT64, Double.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.STRING, String.class);
    TYPE_TO_JAVA_CLASS.put(HoodieDataType.BINARY, byte[].class);
    
    // Initialize type sizes (in bytes)
    TYPE_SIZES = new HashMap<>();
    TYPE_SIZES.put(HoodieDataType.NULL, 0);
    TYPE_SIZES.put(HoodieDataType.BOOLEAN, 1);
    TYPE_SIZES.put(HoodieDataType.INT8, 1);
    TYPE_SIZES.put(HoodieDataType.INT16, 2);
    TYPE_SIZES.put(HoodieDataType.INT32, 4);
    TYPE_SIZES.put(HoodieDataType.INT64, 8);
    TYPE_SIZES.put(HoodieDataType.UINT8, 1);
    TYPE_SIZES.put(HoodieDataType.UINT16, 2);
    TYPE_SIZES.put(HoodieDataType.UINT32, 4);
    TYPE_SIZES.put(HoodieDataType.UINT64, 8);
    TYPE_SIZES.put(HoodieDataType.FLOAT32, 4);
    TYPE_SIZES.put(HoodieDataType.FLOAT64, 8);
    TYPE_SIZES.put(HoodieDataType.DATE32, 4);
    TYPE_SIZES.put(HoodieDataType.DATE64, 8);
    TYPE_SIZES.put(HoodieDataType.TIME32, 4);
    TYPE_SIZES.put(HoodieDataType.TIME64, 8);
    TYPE_SIZES.put(HoodieDataType.TIMESTAMP, 8);
    TYPE_SIZES.put(HoodieDataType.DURATION, 8);
  }
  
  /**
   * Validates that a schema is well-formed and follows Hudi requirements.
   * @param schema the schema to validate
   * @throws IllegalStateException if validation fails
   */
  public static void validateSchema(HoodieSchema schema) {
    if (schema == null) {
      throw new IllegalStateException("Schema cannot be null");
    }
    
    schema.validate();
    
    // Additional Hudi-specific validations
    validateFieldNames(schema);
    validateComplexTypes(schema);
    validateSchemaDepth(schema, 0);
  }
  
  /**
   * Validates field names follow Hudi naming conventions.
   */
  private static void validateFieldNames(HoodieSchema schema) {
    Set<String> fieldNames = new HashSet<>();
    
    for (HoodieField field : schema.getFields()) {
      String fieldName = field.getName();
      
      // Check for duplicate field names
      if (!fieldNames.add(fieldName)) {
        throw new IllegalStateException("Duplicate field name: " + fieldName);
      }
      
      // Check field name validity
      if (!isValidFieldName(fieldName)) {
        throw new IllegalStateException("Invalid field name: " + fieldName);
      }
      
      // Recursively validate nested fields
      if (field.getType().isComplex()) {
        validateComplexFieldNames(field.getType());
      }
    }
  }
  
  /**
   * Validates complex type structures.
   */
  private static void validateComplexTypes(HoodieSchema schema) {
    for (HoodieField field : schema.getFields()) {
      validateFieldType(field.getType());
    }
  }
  
  /**
   * Validates schema depth to prevent stack overflow.
   */
  private static void validateSchemaDepth(HoodieSchema schema, int currentDepth) {
    if (currentDepth > 100) { // Maximum depth limit
      throw new IllegalStateException("Schema depth exceeds maximum limit of 100 levels");
    }
    
    for (HoodieField field : schema.getFields()) {
      validateFieldDepth(field.getType(), currentDepth + 1);
    }
  }
  
  /**
   * Validates field depth recursively.
   */
  private static void validateFieldDepth(HoodieFieldType fieldType, int currentDepth) {
    if (currentDepth > 100) {
      throw new IllegalStateException("Field type depth exceeds maximum limit of 100 levels");
    }
    
    if (fieldType instanceof HoodieFieldType.ArrayType) {
      HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
      validateFieldDepth(arrayType.getElementType(), currentDepth + 1);
    } else if (fieldType instanceof HoodieFieldType.MapType) {
      HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
      validateFieldDepth(mapType.getKeyType(), currentDepth + 1);
      validateFieldDepth(mapType.getValueType(), currentDepth + 1);
    } else if (fieldType instanceof HoodieFieldType.StructType) {
      HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
      for (HoodieField field : structType.getFields()) {
        validateFieldDepth(field.getType(), currentDepth + 1);
      }
    } else if (fieldType instanceof HoodieFieldType.UnionType) {
      HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
      for (HoodieFieldType type : unionType.getTypes()) {
        validateFieldDepth(type, currentDepth + 1);
      }
    }
  }
  
  /**
   * Validates field names in complex types.
   */
  private static void validateComplexFieldNames(HoodieFieldType fieldType) {
    if (fieldType instanceof HoodieFieldType.StructType) {
      HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
      Set<String> fieldNames = new HashSet<>();
      
      for (HoodieField field : structType.getFields()) {
        if (!fieldNames.add(field.getName())) {
          throw new IllegalStateException("Duplicate field name in struct: " + field.getName());
        }
        if (!isValidFieldName(field.getName())) {
          throw new IllegalStateException("Invalid field name in struct: " + field.getName());
        }
        validateComplexFieldNames(field.getType());
      }
    } else if (fieldType instanceof HoodieFieldType.ArrayType) {
      HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
      validateComplexFieldNames(arrayType.getElementType());
    } else if (fieldType instanceof HoodieFieldType.MapType) {
      HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
      validateComplexFieldNames(mapType.getKeyType());
      validateComplexFieldNames(mapType.getValueType());
    } else if (fieldType instanceof HoodieFieldType.UnionType) {
      HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
      for (HoodieFieldType type : unionType.getTypes()) {
        validateComplexFieldNames(type);
      }
    }
  }
  
  /**
   * Validates a field type is well-formed.
   */
  private static void validateFieldType(HoodieFieldType fieldType) {
    if (fieldType == null) {
      throw new IllegalStateException("Field type cannot be null");
    }
    
    switch (fieldType.getDataType()) {
      case DECIMAL128:
      case DECIMAL256:
        if (fieldType instanceof HoodieFieldType.DecimalType) {
          HoodieFieldType.DecimalType decimalType = (HoodieFieldType.DecimalType) fieldType;
          if (decimalType.getPrecision() <= 0 || decimalType.getScale() < 0) {
            throw new IllegalStateException("Invalid decimal precision/scale: " + 
                decimalType.getPrecision() + "/" + decimalType.getScale());
          }
          if (decimalType.getScale() > decimalType.getPrecision()) {
            throw new IllegalStateException("Decimal scale cannot exceed precision");
          }
        }
        break;
      case FIXED:
        if (fieldType instanceof HoodieFieldType.FixedType) {
          HoodieFieldType.FixedType fixedType = (HoodieFieldType.FixedType) fieldType;
          if (fixedType.getLength() <= 0) {
            throw new IllegalStateException("Fixed type length must be positive: " + fixedType.getLength());
          }
        }
        break;
      case ARRAY:
        if (fieldType instanceof HoodieFieldType.ArrayType) {
          HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
          validateFieldType(arrayType.getElementType());
        }
        break;
      case MAP:
        if (fieldType instanceof HoodieFieldType.MapType) {
          HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
          validateFieldType(mapType.getKeyType());
          validateFieldType(mapType.getValueType());
        }
        break;
      case STRUCT:
        if (fieldType instanceof HoodieFieldType.StructType) {
          HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
          if (structType.getFields().isEmpty()) {
            throw new IllegalStateException("Struct type must have at least one field");
          }
          for (HoodieField field : structType.getFields()) {
            validateFieldType(field.getType());
          }
        }
        break;
      case UNION:
        if (fieldType instanceof HoodieFieldType.UnionType) {
          HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
          if (unionType.getTypes().size() < 2) {
            throw new IllegalStateException("Union type must have at least 2 types");
          }
          for (HoodieFieldType type : unionType.getTypes()) {
            validateFieldType(type);
          }
        }
        break;
      case ENUM:
        if (fieldType instanceof HoodieFieldType.EnumType) {
          HoodieFieldType.EnumType enumType = (HoodieFieldType.EnumType) fieldType;
          if (enumType.getSymbols().isEmpty()) {
            throw new IllegalStateException("Enum type must have at least one symbol");
          }
        }
        break;
      default:
        // Primitive types are always valid
        break;
    }
  }
  
  /**
   * Checks if a field name is valid according to Hudi conventions.
   */
  private static boolean isValidFieldName(String fieldName) {
    if (fieldName == null || fieldName.isEmpty()) {
      return false;
    }
    
    // Must start with letter or underscore
    if (!Character.isLetter(fieldName.charAt(0)) && fieldName.charAt(0) != '_') {
      return false;
    }
    
    // Can only contain letters, digits, and underscores
    for (int i = 1; i < fieldName.length(); i++) {
      char c = fieldName.charAt(i);
      if (!Character.isLetterOrDigit(c) && c != '_') {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Checks if two data types are compatible for schema evolution.
   * @param writerType the original (writer) type
   * @param readerType the new (reader) type
   * @return true if types are compatible
   */
  public static boolean areTypesCompatible(HoodieDataType writerType, HoodieDataType readerType) {
    Set<HoodieDataType> compatibleTypes = COMPATIBLE_TYPES.get(writerType);
    return compatibleTypes != null && compatibleTypes.contains(readerType);
  }
  
  /**
   * Checks if two field types are compatible for schema evolution.
   * @param writerType the original (writer) field type
   * @param readerType the new (reader) field type
   * @return true if field types are compatible
   */
  public static boolean areFieldTypesCompatible(HoodieFieldType writerType, HoodieFieldType readerType) {
    // Basic data type compatibility
    if (!areTypesCompatible(writerType.getDataType(), readerType.getDataType())) {
      return false;
    }
    
    // Check specific type constraints
    if (writerType instanceof HoodieFieldType.DecimalType && readerType instanceof HoodieFieldType.DecimalType) {
      HoodieFieldType.DecimalType writerDecimal = (HoodieFieldType.DecimalType) writerType;
      HoodieFieldType.DecimalType readerDecimal = (HoodieFieldType.DecimalType) readerType;
      return readerDecimal.getPrecision() >= writerDecimal.getPrecision() &&
             readerDecimal.getScale() >= writerDecimal.getScale();
    }
    
    if (writerType instanceof HoodieFieldType.FixedType && readerType instanceof HoodieFieldType.FixedType) {
      HoodieFieldType.FixedType writerFixed = (HoodieFieldType.FixedType) writerType;
      HoodieFieldType.FixedType readerFixed = (HoodieFieldType.FixedType) readerType;
      return writerFixed.getLength() == readerFixed.getLength();
    }
    
    // For complex types, check structural compatibility
    if (writerType instanceof HoodieFieldType.ArrayType && readerType instanceof HoodieFieldType.ArrayType) {
      HoodieFieldType.ArrayType writerArray = (HoodieFieldType.ArrayType) writerType;
      HoodieFieldType.ArrayType readerArray = (HoodieFieldType.ArrayType) readerType;
      return areFieldTypesCompatible(writerArray.getElementType(), readerArray.getElementType());
    }
    
    if (writerType instanceof HoodieFieldType.MapType && readerType instanceof HoodieFieldType.MapType) {
      HoodieFieldType.MapType writerMap = (HoodieFieldType.MapType) writerType;
      HoodieFieldType.MapType readerMap = (HoodieFieldType.MapType) readerType;
      return areFieldTypesCompatible(writerMap.getKeyType(), readerMap.getKeyType()) &&
             areFieldTypesCompatible(writerMap.getValueType(), readerMap.getValueType());
    }
    
    return true;
  }
  
  /**
   * Gets the Java class corresponding to a Hudi data type.
   * @param dataType the Hudi data type
   * @return the corresponding Java class
   */
  public static Class<?> getJavaClass(HoodieDataType dataType) {
    return TYPE_TO_JAVA_CLASS.get(dataType);
  }
  
  /**
   * Gets the size in bytes for a primitive data type.
   * @param dataType the Hudi data type
   * @return the size in bytes, or -1 for variable-length types
   */
  public static int getTypeSize(HoodieDataType dataType) {
    return TYPE_SIZES.getOrDefault(dataType, -1);
  }
  
  /**
   * Estimates the memory size of a schema in bytes.
   * @param schema the schema to estimate
   * @return estimated memory size in bytes
   */
  public static long estimateSchemaSize(HoodieSchema schema) {
    long totalSize = 0;
    for (HoodieField field : schema.getFields()) {
      totalSize += estimateFieldSize(field.getType());
    }
    return totalSize;
  }
  
  /**
   * Estimates the memory size of a field type.
   */
  private static long estimateFieldSize(HoodieFieldType fieldType) {
    int baseSize = getTypeSize(fieldType.getDataType());
    if (baseSize > 0) {
      return baseSize;
    }
    
    // Estimate sizes for complex types
    switch (fieldType.getDataType()) {
      case STRING:
        return 64; // Average string length estimate
      case BINARY:
        return 64; // Average binary length estimate
      case ARRAY:
        HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
        return 10 * estimateFieldSize(arrayType.getElementType()); // Estimate 10 elements
      case MAP:
        HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
        return 10 * (estimateFieldSize(mapType.getKeyType()) + estimateFieldSize(mapType.getValueType()));
      case STRUCT:
        HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
        long structSize = 0;
        for (HoodieField field : structType.getFields()) {
          structSize += estimateFieldSize(field.getType());
        }
        return structSize;
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        long maxSize = 0;
        for (HoodieFieldType type : unionType.getTypes()) {
          maxSize = Math.max(maxSize, estimateFieldSize(type));
        }
        return maxSize;
      case ENUM:
        return 32; // Estimate enum as int + string overhead
      case FIXED:
        if (fieldType instanceof HoodieFieldType.FixedType) {
          return ((HoodieFieldType.FixedType) fieldType).getLength();
        }
        return 16;
      default:
        return 8; // Default estimate
    }
  }
  
  /**
   * Flattens a schema to get all leaf field paths.
   * @param schema the schema to flatten
   * @return list of dot-separated field paths
   */
  public static List<String> flattenSchema(HoodieSchema schema) {
    List<String> paths = new ArrayList<>();
    for (HoodieField field : schema.getFields()) {
      flattenField(field.getName(), field.getType(), paths);
    }
    return paths;
  }
  
  /**
   * Recursively flattens a field type to get all leaf paths.
   */
  private static void flattenField(String prefix, HoodieFieldType fieldType, List<String> paths) {
    if (fieldType.isPrimitive()) {
      paths.add(prefix);
    } else if (fieldType instanceof HoodieFieldType.ArrayType) {
      HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
      flattenField(prefix + ".element", arrayType.getElementType(), paths);
    } else if (fieldType instanceof HoodieFieldType.MapType) {
      HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
      flattenField(prefix + ".key", mapType.getKeyType(), paths);
      flattenField(prefix + ".value", mapType.getValueType(), paths);
    } else if (fieldType instanceof HoodieFieldType.StructType) {
      HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
      for (HoodieField field : structType.getFields()) {
        flattenField(prefix + "." + field.getName(), field.getType(), paths);
      }
    } else if (fieldType instanceof HoodieFieldType.UnionType) {
      HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
      for (int i = 0; i < unionType.getTypes().size(); i++) {
        flattenField(prefix + ".union_" + i, unionType.getTypes().get(i), paths);
      }
    } else {
      paths.add(prefix); // For enum, fixed, etc.
    }
  }
  
  /**
   * Creates a builder for constructing Hudi schemas programmatically.
   * @return a new schema builder
   */
  public static SchemaBuilder builder() {
    return new SchemaBuilder();
  }
  
  /**
   * Schema builder utility class.
   */
  public static class SchemaBuilder {
    private final List<HoodieField> fields = new ArrayList<>();
    private String name;
    private String namespace;
    private final Map<String, String> metadata = new HashMap<>();
    
    public SchemaBuilder name(String name) {
      this.name = name;
      return this;
    }
    
    public SchemaBuilder namespace(String namespace) {
      this.namespace = namespace;
      return this;
    }
    
    public SchemaBuilder metadata(String key, String value) {
      this.metadata.put(key, value);
      return this;
    }
    
    public SchemaBuilder field(String name, HoodieFieldType type) {
      return field(name, type, false);
    }
    
    public SchemaBuilder field(String name, HoodieFieldType type, boolean nullable) {
      return field(name, type, nullable, Collections.emptyMap());
    }
    
    public SchemaBuilder field(String name, HoodieFieldType type, boolean nullable, Map<String, String> metadata) {
      fields.add(new HoodieField(name, type, nullable, metadata));
      return this;
    }
    
    public HoodieSchema build() {
      if (fields.isEmpty()) {
        throw new IllegalStateException("Schema must have at least one field");
      }
      
      // Create a generic HoodieSchema implementation
      return new HoodieSchema() {
        @Override
        public java.util.Optional<String> getName() {
          return java.util.Optional.ofNullable(name);
        }
        
        @Override
        public java.util.Optional<String> getNamespace() {
          return java.util.Optional.ofNullable(namespace);
        }
        
        @Override
        public List<HoodieField> getFields() {
          return new ArrayList<>(fields);
        }
        
        @Override
        public java.util.Optional<HoodieField> getField(String fieldName) {
          return fields.stream().filter(f -> f.getName().equals(fieldName)).findFirst();
        }
        
        @Override
        public HoodieField getField(int index) {
          return fields.get(index);
        }
        
        @Override
        public int getFieldCount() {
          return fields.size();
        }
        
        @Override
        public List<String> getFieldNames() {
          return fields.stream().map(HoodieField::getName).collect(java.util.stream.Collectors.toList());
        }
        
        @Override
        public Map<String, String> getMetadata() {
          return new HashMap<>(metadata);
        }
        
        @Override
        public HoodieSchemaType getSchemaType() {
          return HoodieSchemaType.RECORD;
        }
        
        @Override
        public boolean isCompatibleWith(HoodieSchema other) {
          return HoodieSchemaUtils.areFieldTypesCompatible(
              HoodieFieldType.struct(this.getFields()),
              HoodieFieldType.struct(other.getFields())
          );
        }
        
        @Override
        public HoodieSchema withField(HoodieField field) {
          SchemaBuilder builder = new SchemaBuilder();
          builder.name = this.getName().orElse(null);
          builder.namespace = this.getNamespace().orElse(null);
          builder.metadata.putAll(this.getMetadata());
          builder.fields.addAll(this.getFields());
          builder.fields.add(field);
          return builder.build();
        }
        
        @Override
        public HoodieSchema withoutField(String fieldName) {
          SchemaBuilder builder = new SchemaBuilder();
          builder.name = this.getName().orElse(null);
          builder.namespace = this.getNamespace().orElse(null);
          builder.metadata.putAll(this.getMetadata());
          builder.fields.addAll(this.getFields().stream()
              .filter(f -> !f.getName().equals(fieldName))
              .collect(java.util.stream.Collectors.toList()));
          return builder.build();
        }
        
        @Override
        public HoodieSchema withMetadata(Map<String, String> newMetadata) {
          SchemaBuilder builder = new SchemaBuilder();
          builder.name = this.getName().orElse(null);
          builder.namespace = this.getNamespace().orElse(null);
          builder.metadata.putAll(newMetadata);
          builder.fields.addAll(this.getFields());
          return builder.build();
        }
        
        @Override
        public String toSchemaString() {
          return toString();
        }
        
        @Override
        public void validate() {
          HoodieSchemaUtils.validateSchema(this);
        }
        
        @Override
        public String toString() {
          return "HoodieSchema{name=" + getName().orElse("unnamed") + 
                 ", fields=" + getFieldCount() + "}";
        }
      };
    }
  }
}