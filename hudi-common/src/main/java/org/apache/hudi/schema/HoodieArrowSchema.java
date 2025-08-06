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

import org.apache.arrow.vector.types.pojo.ArrowType;
import org.apache.arrow.vector.types.pojo.Field;
import org.apache.arrow.vector.types.pojo.FieldType;
import org.apache.arrow.vector.types.pojo.Schema;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Hudi schema implementation backed by Apache Arrow Schema.
 * This class provides a Hudi-specific interface over Arrow schemas
 * while maintaining native Arrow compatibility for columnar operations.
 */
public class HoodieArrowSchema implements HoodieSchema {
  private static final long serialVersionUID = 1L;
  
  private final Schema arrowSchema;
  private final List<HoodieField> fields;
  private final String name;
  private final String namespace;
  
  public HoodieArrowSchema(Schema arrowSchema) {
    this(arrowSchema, null, null);
  }
  
  public HoodieArrowSchema(Schema arrowSchema, String name, String namespace) {
    this.arrowSchema = Objects.requireNonNull(arrowSchema, "Arrow schema cannot be null");
    this.name = name;
    this.namespace = namespace;
    this.fields = convertArrowFields(arrowSchema.getFields());
  }
  
  /**
   * Returns the underlying Arrow schema.
   * @return the Arrow schema backing this Hudi schema
   */
  public Schema getArrowSchema() {
    return arrowSchema;
  }
  
  @Override
  public Optional<String> getName() {
    return Optional.ofNullable(name);
  }
  
  @Override
  public Optional<String> getNamespace() {
    return Optional.ofNullable(namespace);
  }
  
  @Override
  public List<HoodieField> getFields() {
    return new ArrayList<>(fields);
  }
  
  @Override
  public Optional<HoodieField> getField(String fieldName) {
    return fields.stream()
        .filter(field -> field.getName().equals(fieldName))
        .findFirst();
  }
  
  @Override
  public HoodieField getField(int index) {
    if (index < 0 || index >= fields.size()) {
      throw new IndexOutOfBoundsException("Field index " + index + " out of bounds for schema with " + fields.size() + " fields");
    }
    return fields.get(index);
  }
  
  @Override
  public int getFieldCount() {
    return fields.size();
  }
  
  @Override
  public List<String> getFieldNames() {
    return fields.stream().map(HoodieField::getName).collect(Collectors.toList());
  }
  
  @Override
  public Map<String, String> getMetadata() {
    Map<String, String> metadata = new HashMap<>();
    if (arrowSchema.getCustomMetadata() != null) {
      metadata.putAll(arrowSchema.getCustomMetadata());
    }
    if (name != null) {
      metadata.put("name", name);
    }
    if (namespace != null) {
      metadata.put("namespace", namespace);
    }
    return metadata;
  }
  
  @Override
  public HoodieSchemaType getSchemaType() {
    return HoodieSchemaType.RECORD;
  }
  
  @Override
  public boolean isCompatibleWith(HoodieSchema other) {
    if (other instanceof HoodieArrowSchema) {
      HoodieArrowSchema otherArrowSchema = (HoodieArrowSchema) other;
      return checkArrowCompatibility(this.arrowSchema, otherArrowSchema.arrowSchema);
    }
    // For non-Arrow schemas, perform field-by-field compatibility check
    return checkFieldCompatibility(other);
  }
  
  @Override
  public HoodieSchema withField(HoodieField field) {
    List<Field> newArrowFields = new ArrayList<>(arrowSchema.getFields());
    newArrowFields.add(convertToArrowField(field));
    
    Schema newSchema = new Schema(newArrowFields, arrowSchema.getCustomMetadata());
    return new HoodieArrowSchema(newSchema, name, namespace);
  }
  
  @Override
  public HoodieSchema withoutField(String fieldName) {
    List<Field> filteredFields = arrowSchema.getFields().stream()
        .filter(field -> !field.getName().equals(fieldName))
        .collect(Collectors.toList());
    
    Schema newSchema = new Schema(filteredFields, arrowSchema.getCustomMetadata());
    return new HoodieArrowSchema(newSchema, name, namespace);
  }
  
  @Override
  public HoodieSchema withMetadata(Map<String, String> metadata) {
    Map<String, String> newMetadata = new HashMap<>(metadata);
    String newName = newMetadata.remove("name");
    String newNamespace = newMetadata.remove("namespace");
    
    Schema newSchema = new Schema(arrowSchema.getFields(), newMetadata);
    return new HoodieArrowSchema(newSchema, newName, newNamespace);
  }
  
  @Override
  public String toSchemaString() {
    return arrowSchema.toJson();
  }
  
  @Override
  public void validate() {
    // Arrow schemas are self-validating, but we can add Hudi-specific validations
    if (arrowSchema.getFields().isEmpty()) {
      throw new IllegalStateException("Schema must have at least one field");
    }
    
    // Validate that all fields have valid names
    for (Field field : arrowSchema.getFields()) {
      if (field.getName() == null || field.getName().isEmpty()) {
        throw new IllegalStateException("Field name cannot be null or empty");
      }
    }
  }
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    HoodieArrowSchema that = (HoodieArrowSchema) o;
    return Objects.equals(arrowSchema, that.arrowSchema) &&
           Objects.equals(name, that.name) &&
           Objects.equals(namespace, that.namespace);
  }
  
  @Override
  public int hashCode() {
    return Objects.hash(arrowSchema, name, namespace);
  }
  
  @Override
  public String toString() {
    return "HoodieArrowSchema{" +
           "name=" + getName().orElse("unnamed") +
           ", fields=" + getFieldCount() +
           "}";
  }
  
  /**
   * Converts Arrow fields to Hudi fields.
   */
  private List<HoodieField> convertArrowFields(List<Field> arrowFields) {
    List<HoodieField> hoodieFields = new ArrayList<>();
    for (Field arrowField : arrowFields) {
      HoodieFieldType fieldType = convertArrowTypeToHoodieType(arrowField);
      Map<String, String> metadata = new HashMap<>();
      if (arrowField.getMetadata() != null) {
        metadata.putAll(arrowField.getMetadata());
      }
      
      boolean nullable = arrowField.isNullable();
      hoodieFields.add(new HoodieField(arrowField.getName(), fieldType, nullable, metadata));
    }
    return hoodieFields;
  }
  
  /**
   * Converts Arrow Field type to HoodieFieldType.
   */
  private HoodieFieldType convertArrowTypeToHoodieType(Field arrowField) {
    ArrowType arrowType = arrowField.getType();
    
    if (arrowType instanceof ArrowType.Null) {
      return HoodieFieldType.primitive(HoodieDataType.NULL);
    } else if (arrowType instanceof ArrowType.Bool) {
      return HoodieFieldType.primitive(HoodieDataType.BOOLEAN);
    } else if (arrowType instanceof ArrowType.Int) {
      ArrowType.Int intType = (ArrowType.Int) arrowType;
      switch (intType.getBitWidth()) {
        case 8:
          return intType.getIsSigned() ? 
              HoodieFieldType.primitive(HoodieDataType.INT8) : 
              HoodieFieldType.primitive(HoodieDataType.UINT8);
        case 16:
          return intType.getIsSigned() ? 
              HoodieFieldType.primitive(HoodieDataType.INT16) : 
              HoodieFieldType.primitive(HoodieDataType.UINT16);
        case 32:
          return intType.getIsSigned() ? 
              HoodieFieldType.primitive(HoodieDataType.INT32) : 
              HoodieFieldType.primitive(HoodieDataType.UINT32);
        case 64:
          return intType.getIsSigned() ? 
              HoodieFieldType.primitive(HoodieDataType.INT64) : 
              HoodieFieldType.primitive(HoodieDataType.UINT64);
        default:
          throw new IllegalArgumentException("Unsupported integer bit width: " + intType.getBitWidth());
      }
    } else if (arrowType instanceof ArrowType.FloatingPoint) {
      ArrowType.FloatingPoint floatType = (ArrowType.FloatingPoint) arrowType;
      switch (floatType.getPrecision()) {
        case SINGLE:
          return HoodieFieldType.primitive(HoodieDataType.FLOAT32);
        case DOUBLE:
          return HoodieFieldType.primitive(HoodieDataType.FLOAT64);
        default:
          throw new IllegalArgumentException("Unsupported float precision: " + floatType.getPrecision());
      }
    } else if (arrowType instanceof ArrowType.Utf8) {
      return HoodieFieldType.primitive(HoodieDataType.STRING);
    } else if (arrowType instanceof ArrowType.Binary) {
      return HoodieFieldType.primitive(HoodieDataType.BINARY);
    } else if (arrowType instanceof ArrowType.Date) {
      ArrowType.Date dateType = (ArrowType.Date) arrowType;
      return dateType.getUnit() == ArrowType.DateUnit.DAY ? 
          HoodieFieldType.primitive(HoodieDataType.DATE32) :
          HoodieFieldType.primitive(HoodieDataType.DATE64);
    } else if (arrowType instanceof ArrowType.Time) {
      ArrowType.Time timeType = (ArrowType.Time) arrowType;
      return timeType.getBitWidth() == 32 ? 
          HoodieFieldType.primitive(HoodieDataType.TIME32) :
          HoodieFieldType.primitive(HoodieDataType.TIME64);
    } else if (arrowType instanceof ArrowType.Timestamp) {
      return HoodieFieldType.primitive(HoodieDataType.TIMESTAMP);
    } else if (arrowType instanceof ArrowType.Duration) {
      return HoodieFieldType.primitive(HoodieDataType.DURATION);
    } else if (arrowType instanceof ArrowType.Decimal) {
      ArrowType.Decimal decimalType = (ArrowType.Decimal) arrowType;
      return HoodieFieldType.decimal(decimalType.getPrecision(), decimalType.getScale());
    } else if (arrowType instanceof ArrowType.List) {
      HoodieFieldType elementType = convertArrowTypeToHoodieType(arrowField.getChildren().get(0));
      return HoodieFieldType.array(elementType);
    } else if (arrowType instanceof ArrowType.Map) {
      // Arrow Map has a struct child with key and value fields
      Field structField = arrowField.getChildren().get(0);
      List<Field> structChildren = structField.getChildren();
      HoodieFieldType keyType = convertArrowTypeToHoodieType(structChildren.get(0));
      HoodieFieldType valueType = convertArrowTypeToHoodieType(structChildren.get(1));
      return HoodieFieldType.map(keyType, valueType);
    } else if (arrowType instanceof ArrowType.Struct) {
      List<HoodieField> structFields = convertArrowFields(arrowField.getChildren());
      return HoodieFieldType.struct(structFields);
    } else if (arrowType instanceof ArrowType.Union) {
      List<HoodieFieldType> unionTypes = arrowField.getChildren().stream()
          .map(this::convertArrowTypeToHoodieType)
          .collect(Collectors.toList());
      return HoodieFieldType.union(unionTypes);
    } else if (arrowType instanceof ArrowType.FixedSizeBinary) {
      ArrowType.FixedSizeBinary fixedType = (ArrowType.FixedSizeBinary) arrowType;
      return HoodieFieldType.fixed(fixedType.getByteWidth());
    } else {
      throw new IllegalArgumentException("Unsupported Arrow type: " + arrowType);
    }
  }
  
  /**
   * Converts a Hudi field back to an Arrow field.
   */
  private Field convertToArrowField(HoodieField hoodieField) {
    ArrowType arrowType = convertHoodieTypeToArrowType(hoodieField.getType());
    FieldType fieldType = new FieldType(hoodieField.isNullable(), arrowType, null, hoodieField.getMetadata());
    List<Field> children = getChildrenForHoodieType(hoodieField.getType());
    return new Field(hoodieField.getName(), fieldType, children);
  }
  
  /**
   * Converts HoodieFieldType to Arrow ArrowType.
   */
  private ArrowType convertHoodieTypeToArrowType(HoodieFieldType fieldType) {
    switch (fieldType.getDataType()) {
      case NULL:
        return ArrowType.Null.INSTANCE;
      case BOOLEAN:
        return ArrowType.Bool.INSTANCE;
      case INT8:
        return new ArrowType.Int(8, true);
      case INT16:
        return new ArrowType.Int(16, true);
      case INT32:
        return new ArrowType.Int(32, true);
      case INT64:
        return new ArrowType.Int(64, true);
      case UINT8:
        return new ArrowType.Int(8, false);
      case UINT16:
        return new ArrowType.Int(16, false);
      case UINT32:
        return new ArrowType.Int(32, false);
      case UINT64:
        return new ArrowType.Int(64, false);
      case FLOAT32:
        return new ArrowType.FloatingPoint(ArrowType.FloatingPoint.Precision.SINGLE);
      case FLOAT64:
        return new ArrowType.FloatingPoint(ArrowType.FloatingPoint.Precision.DOUBLE);
      case BINARY:
        return ArrowType.Binary.INSTANCE;
      case STRING:
        return ArrowType.Utf8.INSTANCE;
      case DATE32:
        return new ArrowType.Date(ArrowType.DateUnit.DAY);
      case DATE64:
        return new ArrowType.Date(ArrowType.DateUnit.MILLISECOND);
      case TIME32:
        return new ArrowType.Time(ArrowType.TimeUnit.SECOND, 32);
      case TIME64:
        return new ArrowType.Time(ArrowType.TimeUnit.MICROSECOND, 64);
      case TIMESTAMP:
        return new ArrowType.Timestamp(ArrowType.TimeUnit.MICROSECOND, null);
      case DURATION:
        return new ArrowType.Duration(ArrowType.TimeUnit.MICROSECOND);
      case DECIMAL128:
      case DECIMAL256:
        if (fieldType instanceof HoodieFieldType.DecimalType) {
          HoodieFieldType.DecimalType decimalType = (HoodieFieldType.DecimalType) fieldType;
          return new ArrowType.Decimal(decimalType.getPrecision(), decimalType.getScale(), 128);
        }
        return new ArrowType.Decimal(38, 0, 128); // Default decimal
      case ARRAY:
        return ArrowType.List.INSTANCE;
      case MAP:
        return new ArrowType.Map(false);
      case STRUCT:
        return ArrowType.Struct.INSTANCE;
      case UNION:
        // Arrow Union requires type codes - using dense union with sequential codes
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        int[] typeCodes = new int[unionType.getTypes().size()];
        for (int i = 0; i < typeCodes.length; i++) {
          typeCodes[i] = i;
        }
        return new ArrowType.Union(ArrowType.Union.UnionMode.Dense, typeCodes);
      case FIXED:
        if (fieldType instanceof HoodieFieldType.FixedType) {
          HoodieFieldType.FixedType fixedType = (HoodieFieldType.FixedType) fieldType;
          return new ArrowType.FixedSizeBinary(fixedType.getLength());
        }
        return new ArrowType.FixedSizeBinary(16); // Default fixed size
      case ENUM:
        // Arrow doesn't have native enum, represent as dictionary-encoded string
        return ArrowType.Utf8.INSTANCE;
      default:
        throw new IllegalArgumentException("Unsupported Hudi type: " + fieldType.getDataType());
    }
  }
  
  /**
   * Gets children fields for complex HoodieFieldTypes.
   */
  private List<Field> getChildrenForHoodieType(HoodieFieldType fieldType) {
    List<Field> children = new ArrayList<>();
    
    switch (fieldType.getDataType()) {
      case ARRAY:
        HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
        ArrowType elementArrowType = convertHoodieTypeToArrowType(arrayType.getElementType());
        FieldType elementFieldType = new FieldType(true, elementArrowType, null);
        List<Field> elementChildren = getChildrenForHoodieType(arrayType.getElementType());
        children.add(new Field("element", elementFieldType, elementChildren));
        break;
        
      case MAP:
        HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
        // Arrow Map has a struct child with key and value fields
        ArrowType keyArrowType = convertHoodieTypeToArrowType(mapType.getKeyType());
        ArrowType valueArrowType = convertHoodieTypeToArrowType(mapType.getValueType());
        
        FieldType keyFieldType = new FieldType(false, keyArrowType, null);
        FieldType valueFieldType = new FieldType(true, valueArrowType, null);
        
        List<Field> keyChildren = getChildrenForHoodieType(mapType.getKeyType());
        List<Field> valueChildren = getChildrenForHoodieType(mapType.getValueType());
        
        List<Field> structChildren = new ArrayList<>();
        structChildren.add(new Field("key", keyFieldType, keyChildren));
        structChildren.add(new Field("value", valueFieldType, valueChildren));
        
        FieldType structFieldType = new FieldType(false, ArrowType.Struct.INSTANCE, null);
        children.add(new Field("entries", structFieldType, structChildren));
        break;
        
      case STRUCT:
        HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
        for (HoodieField field : structType.getFields()) {
          children.add(convertToArrowField(field));
        }
        break;
        
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        for (int i = 0; i < unionType.getTypes().size(); i++) {
          HoodieFieldType childType = unionType.getTypes().get(i);
          ArrowType childArrowType = convertHoodieTypeToArrowType(childType);
          FieldType childFieldType = new FieldType(true, childArrowType, null);
          List<Field> childChildren = getChildrenForHoodieType(childType);
          children.add(new Field("union_" + i, childFieldType, childChildren));
        }
        break;
        
      default:
        // Primitive types don't have children
        break;
    }
    
    return children;
  }
  
  /**
   * Checks compatibility between two Arrow schemas.
   */
  private boolean checkArrowCompatibility(Schema writer, Schema reader) {
    // Check that all required fields in reader exist in writer
    for (Field readerField : reader.getFields()) {
      boolean found = false;
      for (Field writerField : writer.getFields()) {
        if (writerField.getName().equals(readerField.getName())) {
          found = true;
          // Check field type compatibility
          if (!checkFieldTypeCompatibility(writerField, readerField)) {
            return false;
          }
          break;
        }
      }
      if (!found && !readerField.isNullable()) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Checks compatibility between two Arrow field types.
   */
  private boolean checkFieldTypeCompatibility(Field writer, Field reader) {
    // Basic type compatibility check
    return writer.getType().getClass().equals(reader.getType().getClass());
  }
  
  /**
   * Checks field-level compatibility with non-Arrow schemas.
   */
  private boolean checkFieldCompatibility(HoodieSchema other) {
    // Basic field count and name compatibility
    if (this.getFieldCount() != other.getFieldCount()) {
      return false;
    }
    
    for (int i = 0; i < this.getFieldCount(); i++) {
      HoodieField thisField = this.getField(i);
      HoodieField otherField = other.getField(i);
      
      if (!thisField.getName().equals(otherField.getName())) {
        return false;
      }
      
      // Check type compatibility (basic check)
      if (!thisField.getType().getDataType().equals(otherField.getType().getDataType())) {
        return false;
      }
    }
    
    return true;
  }
}