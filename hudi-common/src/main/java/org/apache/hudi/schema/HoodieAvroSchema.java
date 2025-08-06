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

import org.apache.avro.Schema;
import org.apache.avro.Schema.Field;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Hudi schema implementation backed by Apache Avro Schema.
 * This class provides a Hudi-specific interface over Avro schemas
 * while maintaining full compatibility with existing Avro-based operations.
 */
public class HoodieAvroSchema implements HoodieSchema {
  private static final long serialVersionUID = 1L;
  
  private final Schema avroSchema;
  private final List<HoodieField> fields;
  
  public HoodieAvroSchema(Schema avroSchema) {
    this.avroSchema = Objects.requireNonNull(avroSchema, "Avro schema cannot be null");
    if (avroSchema.getType() != Schema.Type.RECORD) {
      throw new IllegalArgumentException("Only RECORD schemas are supported at the top level");
    }
    this.fields = convertAvroFields(avroSchema.getFields());
  }
  
  /**
   * Returns the underlying Avro schema.
   * @return the Avro schema backing this Hudi schema
   */
  public Schema getAvroSchema() {
    return avroSchema;
  }
  
  @Override
  public Optional<String> getName() {
    return Optional.ofNullable(avroSchema.getName());
  }
  
  @Override
  public Optional<String> getNamespace() {
    return Optional.ofNullable(avroSchema.getNamespace());
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
    if (avroSchema.getDoc() != null) {
      metadata.put("doc", avroSchema.getDoc());
    }
    // Add other Avro-specific metadata
    if (avroSchema.getObjectProps() != null) {
      avroSchema.getObjectProps().forEach((key, value) -> {
        if (value != null) {
          metadata.put(key, value.toString());
        }
      });
    }
    return metadata;
  }
  
  @Override
  public HoodieSchemaType getSchemaType() {
    return HoodieSchemaType.RECORD;
  }
  
  @Override
  public boolean isCompatibleWith(HoodieSchema other) {
    if (other instanceof HoodieAvroSchema) {
      HoodieAvroSchema otherAvroSchema = (HoodieAvroSchema) other;
      return checkAvroCompatibility(this.avroSchema, otherAvroSchema.avroSchema);
    }
    // For non-Avro schemas, perform field-by-field compatibility check
    return checkFieldCompatibility(other);
  }
  
  @Override
  public HoodieSchema withField(HoodieField field) {
    List<Field> newAvroFields = new ArrayList<>(avroSchema.getFields());
    newAvroFields.add(convertToAvroField(field));
    
    Schema newSchema = Schema.createRecord(
        avroSchema.getName(),
        avroSchema.getDoc(),
        avroSchema.getNamespace(),
        avroSchema.isError(),
        newAvroFields
    );
    
    return new HoodieAvroSchema(newSchema);
  }
  
  @Override
  public HoodieSchema withoutField(String fieldName) {
    List<Field> filteredFields = avroSchema.getFields().stream()
        .filter(field -> !field.name().equals(fieldName))
        .map(field -> new Field(field, field.schema()))
        .collect(Collectors.toList());
    
    Schema newSchema = Schema.createRecord(
        avroSchema.getName(),
        avroSchema.getDoc(),
        avroSchema.getNamespace(),
        avroSchema.isError(),
        filteredFields
    );
    
    return new HoodieAvroSchema(newSchema);
  }
  
  @Override
  public HoodieSchema withMetadata(Map<String, String> metadata) {
    Schema newSchema = Schema.createRecord(
        avroSchema.getName(),
        metadata.get("doc"),
        avroSchema.getNamespace(),
        avroSchema.isError(),
        avroSchema.getFields().stream()
            .map(field -> new Field(field, field.schema()))
            .collect(Collectors.toList())
    );
    
    // Add custom properties
    metadata.forEach((key, value) -> {
      if (!"doc".equals(key)) {
        newSchema.addProp(key, value);
      }
    });
    
    return new HoodieAvroSchema(newSchema);
  }
  
  @Override
  public String toSchemaString() {
    return avroSchema.toString(true);
  }
  
  @Override
  public void validate() {
    // Avro schemas are self-validating, but we can add Hudi-specific validations
    if (avroSchema.getType() != Schema.Type.RECORD) {
      throw new IllegalStateException("Top-level schema must be a RECORD type");
    }
    
    // Validate that all fields have valid names
    for (Field field : avroSchema.getFields()) {
      if (field.name() == null || field.name().isEmpty()) {
        throw new IllegalStateException("Field name cannot be null or empty");
      }
    }
  }
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    HoodieAvroSchema that = (HoodieAvroSchema) o;
    return Objects.equals(avroSchema, that.avroSchema);
  }
  
  @Override
  public int hashCode() {
    return Objects.hash(avroSchema);
  }
  
  @Override
  public String toString() {
    return "HoodieAvroSchema{" +
           "name=" + getName().orElse("unnamed") +
           ", fields=" + getFieldCount() +
           "}";
  }
  
  /**
   * Converts Avro fields to Hudi fields.
   */
  private List<HoodieField> convertAvroFields(List<Field> avroFields) {
    List<HoodieField> hoodieFields = new ArrayList<>();
    for (Field avroField : avroFields) {
      HoodieFieldType fieldType = convertAvroTypeToHoodieType(avroField.schema());
      Map<String, String> metadata = new HashMap<>();
      if (avroField.doc() != null) {
        metadata.put("doc", avroField.doc());
      }
      // Add Avro-specific properties
      avroField.getObjectProps().forEach((key, value) -> {
        if (value != null) {
          metadata.put(key, value.toString());
        }
      });
      
      boolean nullable = isNullable(avroField.schema());
      hoodieFields.add(new HoodieField(avroField.name(), fieldType, nullable, metadata));
    }
    return hoodieFields;
  }
  
  /**
   * Converts Avro Schema type to HoodieFieldType.
   */
  private HoodieFieldType convertAvroTypeToHoodieType(Schema schema) {
    Schema.Type type = schema.getType();
    
    switch (type) {
      case NULL:
        return HoodieFieldType.primitive(HoodieDataType.NULL);
      case BOOLEAN:
        return HoodieFieldType.primitive(HoodieDataType.BOOLEAN);
      case INT:
        return HoodieFieldType.primitive(HoodieDataType.INT32);
      case LONG:
        return HoodieFieldType.primitive(HoodieDataType.INT64);
      case FLOAT:
        return HoodieFieldType.primitive(HoodieDataType.FLOAT32);
      case DOUBLE:
        return HoodieFieldType.primitive(HoodieDataType.FLOAT64);
      case BYTES:
        return HoodieFieldType.primitive(HoodieDataType.BINARY);
      case STRING:
        return HoodieFieldType.primitive(HoodieDataType.STRING);
      case ARRAY:
        HoodieFieldType elementType = convertAvroTypeToHoodieType(schema.getElementType());
        return HoodieFieldType.array(elementType);
      case MAP:
        HoodieFieldType keyType = HoodieFieldType.primitive(HoodieDataType.STRING); // Avro maps always have string keys
        HoodieFieldType valueType = convertAvroTypeToHoodieType(schema.getValueType());
        return HoodieFieldType.map(keyType, valueType);
      case RECORD:
        List<HoodieField> fields = convertAvroFields(schema.getFields());
        return HoodieFieldType.struct(fields);
      case ENUM:
        return HoodieFieldType.enumType(schema.getEnumSymbols());
      case FIXED:
        return HoodieFieldType.fixed(schema.getFixedSize());
      case UNION:
        List<HoodieFieldType> unionTypes = schema.getTypes().stream()
            .map(this::convertAvroTypeToHoodieType)
            .collect(Collectors.toList());
        return HoodieFieldType.union(unionTypes);
      default:
        throw new IllegalArgumentException("Unsupported Avro type: " + type);
    }
  }
  
  /**
   * Checks if an Avro schema is nullable (union with null).
   */
  private boolean isNullable(Schema schema) {
    if (schema.getType() == Schema.Type.UNION) {
      return schema.getTypes().stream().anyMatch(s -> s.getType() == Schema.Type.NULL);
    }
    return false;
  }
  
  /**
   * Converts a Hudi field back to an Avro field.
   */
  private Field convertToAvroField(HoodieField hoodieField) {
    Schema fieldSchema = convertHoodieTypeToAvroSchema(hoodieField.getType(), hoodieField.isNullable());
    Field avroField = new Field(hoodieField.getName(), fieldSchema, hoodieField.getMetadata().get("doc"));
    
    // Add metadata as properties
    hoodieField.getMetadata().forEach((key, value) -> {
      if (!"doc".equals(key)) {
        avroField.addProp(key, value);
      }
    });
    
    return avroField;
  }
  
  /**
   * Converts HoodieFieldType back to Avro Schema.
   */
  private Schema convertHoodieTypeToAvroSchema(HoodieFieldType fieldType, boolean nullable) {
    Schema schema;
    
    switch (fieldType.getDataType()) {
      case NULL:
        schema = Schema.create(Schema.Type.NULL);
        break;
      case BOOLEAN:
        schema = Schema.create(Schema.Type.BOOLEAN);
        break;
      case INT8:
      case INT16:
      case INT32:
        schema = Schema.create(Schema.Type.INT);
        break;
      case INT64:
        schema = Schema.create(Schema.Type.LONG);
        break;
      case FLOAT32:
        schema = Schema.create(Schema.Type.FLOAT);
        break;
      case FLOAT64:
        schema = Schema.create(Schema.Type.DOUBLE);
        break;
      case BINARY:
        schema = Schema.create(Schema.Type.BYTES);
        break;
      case STRING:
        schema = Schema.create(Schema.Type.STRING);
        break;
      case ARRAY:
        HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
        Schema elementSchema = convertHoodieTypeToAvroSchema(arrayType.getElementType(), false);
        schema = Schema.createArray(elementSchema);
        break;
      case MAP:
        HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
        Schema valueSchema = convertHoodieTypeToAvroSchema(mapType.getValueType(), false);
        schema = Schema.createMap(valueSchema);
        break;
      case STRUCT:
        HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
        List<Field> avroFields = structType.getFields().stream()
            .map(this::convertToAvroField)
            .collect(Collectors.toList());
        schema = Schema.createRecord("record", null, null, false, avroFields);
        break;
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        List<Schema> unionSchemas = unionType.getTypes().stream()
            .map(type -> convertHoodieTypeToAvroSchema(type, false))
            .collect(Collectors.toList());
        schema = Schema.createUnion(unionSchemas);
        break;
      case ENUM:
        HoodieFieldType.EnumType enumType = (HoodieFieldType.EnumType) fieldType;
        schema = Schema.createEnum("enum", null, null, enumType.getSymbols());
        break;
      case FIXED:
        HoodieFieldType.FixedType fixedType = (HoodieFieldType.FixedType) fieldType;
        schema = Schema.createFixed("fixed", null, null, fixedType.getLength());
        break;
      default:
        throw new IllegalArgumentException("Unsupported Hudi type: " + fieldType.getDataType());
    }
    
    // Make nullable if required
    if (nullable && schema.getType() != Schema.Type.UNION) {
      schema = Schema.createUnion(Schema.create(Schema.Type.NULL), schema);
    }
    
    return schema;
  }
  
  /**
   * Checks compatibility between two Avro schemas.
   */
  private boolean checkAvroCompatibility(Schema writer, Schema reader) {
    // Implement basic compatibility rules
    if (writer.getType() != reader.getType()) {
      return false;
    }
    
    if (writer.getType() == Schema.Type.RECORD) {
      // Check that all required fields in reader exist in writer
      for (Field readerField : reader.getFields()) {
        Field writerField = writer.getField(readerField.name());
        if (writerField == null && !isNullable(readerField.schema())) {
          return false;
        }
        if (writerField != null && !checkAvroCompatibility(writerField.schema(), readerField.schema())) {
          return false;
        }
      }
      return true;
    }
    
    return true; // For primitive types, same type means compatible
  }
  
  /**
   * Checks field-level compatibility with non-Avro schemas.
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