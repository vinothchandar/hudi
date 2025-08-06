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
import org.apache.avro.Schema.Type;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Utility class for converting between Avro and Arrow schemas through Hudi schema abstraction.
 * This adapter handles type system differences and ensures compatibility between 
 * Avro and Arrow representations while preserving all supported types.
 */
public class HoodieSchemaAdapter {
  
  /**
   * Converts an Avro schema to Arrow schema via HoodieSchema abstraction.
   * @param avroSchema the Avro schema to convert
   * @return equivalent Arrow schema
   */
  public static Schema avroToArrow(org.apache.avro.Schema avroSchema) {
    HoodieAvroSchema hoodieAvroSchema = new HoodieAvroSchema(avroSchema);
    return convertHoodieSchemaToArrow(hoodieAvroSchema);
  }
  
  /**
   * Converts an Arrow schema to Avro schema via HoodieSchema abstraction.
   * @param arrowSchema the Arrow schema to convert
   * @return equivalent Avro schema
   */
  public static org.apache.avro.Schema arrowToAvro(Schema arrowSchema) {
    return arrowToAvro(arrowSchema, null, null);
  }
  
  /**
   * Converts an Arrow schema to Avro schema with name and namespace.
   * @param arrowSchema the Arrow schema to convert
   * @param name the name for the Avro record schema
   * @param namespace the namespace for the Avro record schema
   * @return equivalent Avro schema
   */
  public static org.apache.avro.Schema arrowToAvro(Schema arrowSchema, String name, String namespace) {
    HoodieArrowSchema hoodieArrowSchema = new HoodieArrowSchema(arrowSchema, name, namespace);
    return convertHoodieSchemaToAvro(hoodieArrowSchema, name, namespace);
  }
  
  /**
   * Converts a HoodieSchema to Arrow Schema.
   */
  private static Schema convertHoodieSchemaToArrow(HoodieSchema hoodieSchema) {
    List<Field> arrowFields = new ArrayList<>();
    
    for (HoodieField hoodieField : hoodieSchema.getFields()) {
      Field arrowField = convertHoodieFieldToArrow(hoodieField);
      arrowFields.add(arrowField);
    }
    
    Map<String, String> metadata = new HashMap<>(hoodieSchema.getMetadata());
    return new Schema(arrowFields, metadata);
  }
  
  /**
   * Converts a HoodieSchema to Avro Schema.
   */
  private static org.apache.avro.Schema convertHoodieSchemaToAvro(HoodieSchema hoodieSchema, String name, String namespace) {
    List<org.apache.avro.Schema.Field> avroFields = new ArrayList<>();
    
    for (HoodieField hoodieField : hoodieSchema.getFields()) {
      org.apache.avro.Schema.Field avroField = convertHoodieFieldToAvro(hoodieField);
      avroFields.add(avroField);
    }
    
    String recordName = name != null ? name : hoodieSchema.getName().orElse("record");
    String recordNamespace = namespace != null ? namespace : hoodieSchema.getNamespace().orElse(null);
    String doc = hoodieSchema.getMetadata().get("doc");
    
    return org.apache.avro.Schema.createRecord(recordName, doc, recordNamespace, false, avroFields);
  }
  
  /**
   * Converts a HoodieField to Arrow Field.
   */
  private static Field convertHoodieFieldToArrow(HoodieField hoodieField) {
    ArrowType arrowType = convertHoodieTypeToArrowType(hoodieField.getType());
    FieldType fieldType = new FieldType(hoodieField.isNullable(), arrowType, null, hoodieField.getMetadata());
    List<Field> children = getArrowChildrenForHoodieType(hoodieField.getType());
    
    return new Field(hoodieField.getName(), fieldType, children);
  }
  
  /**
   * Converts a HoodieField to Avro Field.
   */
  private static org.apache.avro.Schema.Field convertHoodieFieldToAvro(HoodieField hoodieField) {
    org.apache.avro.Schema fieldSchema = convertHoodieTypeToAvroSchema(hoodieField.getType(), hoodieField.isNullable());
    String doc = hoodieField.getMetadata().get("doc");
    
    org.apache.avro.Schema.Field avroField = new org.apache.avro.Schema.Field(hoodieField.getName(), fieldSchema, doc);
    
    // Add metadata as properties
    hoodieField.getMetadata().forEach((key, value) -> {
      if (!"doc".equals(key)) {
        avroField.addProp(key, value);
      }
    });
    
    return avroField;
  }
  
  /**
   * Converts HoodieFieldType to Arrow ArrowType.
   */
  private static ArrowType convertHoodieTypeToArrowType(HoodieFieldType fieldType) {
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
        if (fieldType instanceof HoodieFieldType.DecimalType) {
          HoodieFieldType.DecimalType decimalType = (HoodieFieldType.DecimalType) fieldType;
          return new ArrowType.Decimal(decimalType.getPrecision(), decimalType.getScale(), 128);
        }
        return new ArrowType.Decimal(38, 0, 128);
      case DECIMAL256:
        if (fieldType instanceof HoodieFieldType.DecimalType) {
          HoodieFieldType.DecimalType decimalType = (HoodieFieldType.DecimalType) fieldType;
          return new ArrowType.Decimal(decimalType.getPrecision(), decimalType.getScale(), 256);
        }
        return new ArrowType.Decimal(76, 0, 256);
      case ARRAY:
        return ArrowType.List.INSTANCE;
      case MAP:
        return new ArrowType.Map(false);
      case STRUCT:
        return ArrowType.Struct.INSTANCE;
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        int[] typeCodes = new int[unionType.getTypes().size()];
        for (int i = 0; i < typeCodes.length; i++) {
          typeCodes[i] = i;
        }
        return new ArrowType.Union(ArrowType.Union.UnionMode.Dense, typeCodes);
      case ENUM:
        // Represent enum as dictionary-encoded string in Arrow
        return ArrowType.Utf8.INSTANCE;
      case FIXED:
        if (fieldType instanceof HoodieFieldType.FixedType) {
          HoodieFieldType.FixedType fixedType = (HoodieFieldType.FixedType) fieldType;
          return new ArrowType.FixedSizeBinary(fixedType.getLength());
        }
        return new ArrowType.FixedSizeBinary(16);
      default:
        throw new IllegalArgumentException("Unsupported Hudi type for Arrow conversion: " + fieldType.getDataType());
    }
  }
  
  /**
   * Converts HoodieFieldType to Avro Schema.
   */
  private static org.apache.avro.Schema convertHoodieTypeToAvroSchema(HoodieFieldType fieldType, boolean nullable) {
    org.apache.avro.Schema schema;
    
    switch (fieldType.getDataType()) {
      case NULL:
        schema = org.apache.avro.Schema.create(Type.NULL);
        break;
      case BOOLEAN:
        schema = org.apache.avro.Schema.create(Type.BOOLEAN);
        break;
      case INT8:
      case INT16:
      case INT32:
      case UINT8:
      case UINT16:
      case UINT32:
        schema = org.apache.avro.Schema.create(Type.INT);
        break;
      case INT64:
      case UINT64:
        schema = org.apache.avro.Schema.create(Type.LONG);
        break;
      case FLOAT32:
        schema = org.apache.avro.Schema.create(Type.FLOAT);
        break;
      case FLOAT64:
        schema = org.apache.avro.Schema.create(Type.DOUBLE);
        break;
      case BINARY:
        schema = org.apache.avro.Schema.create(Type.BYTES);
        break;
      case STRING:
        schema = org.apache.avro.Schema.create(Type.STRING);
        break;
      case DATE32:
      case DATE64:
        // Avro doesn't have native date types, use int/long with logical type
        schema = org.apache.avro.Schema.create(Type.INT);
        schema.addProp("logicalType", "date");
        break;
      case TIME32:
      case TIME64:
        // Avro doesn't have native time types, use int/long with logical type
        schema = org.apache.avro.Schema.create(Type.LONG);
        schema.addProp("logicalType", "time-micros");
        break;
      case TIMESTAMP:
        schema = org.apache.avro.Schema.create(Type.LONG);
        schema.addProp("logicalType", "timestamp-micros");
        break;
      case DURATION:
        // Represent duration as long in Avro
        schema = org.apache.avro.Schema.create(Type.LONG);
        schema.addProp("logicalType", "duration");
        break;
      case DECIMAL128:
      case DECIMAL256:
        if (fieldType instanceof HoodieFieldType.DecimalType) {
          HoodieFieldType.DecimalType decimalType = (HoodieFieldType.DecimalType) fieldType;
          schema = org.apache.avro.Schema.create(Type.BYTES);
          schema.addProp("logicalType", "decimal");
          schema.addProp("precision", decimalType.getPrecision());
          schema.addProp("scale", decimalType.getScale());
        } else {
          schema = org.apache.avro.Schema.create(Type.BYTES);
          schema.addProp("logicalType", "decimal");
          schema.addProp("precision", 38);
          schema.addProp("scale", 0);
        }
        break;
      case ARRAY:
        HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
        org.apache.avro.Schema elementSchema = convertHoodieTypeToAvroSchema(arrayType.getElementType(), false);
        schema = org.apache.avro.Schema.createArray(elementSchema);
        break;
      case MAP:
        HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
        org.apache.avro.Schema valueSchema = convertHoodieTypeToAvroSchema(mapType.getValueType(), false);
        schema = org.apache.avro.Schema.createMap(valueSchema);
        break;
      case STRUCT:
        HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
        List<org.apache.avro.Schema.Field> structFields = structType.getFields().stream()
            .map(HoodieSchemaAdapter::convertHoodieFieldToAvro)
            .collect(Collectors.toList());
        schema = org.apache.avro.Schema.createRecord("record", null, null, false, structFields);
        break;
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        List<org.apache.avro.Schema> unionSchemas = unionType.getTypes().stream()
            .map(type -> convertHoodieTypeToAvroSchema(type, false))
            .collect(Collectors.toList());
        schema = org.apache.avro.Schema.createUnion(unionSchemas);
        break;
      case ENUM:
        if (fieldType instanceof HoodieFieldType.EnumType) {
          HoodieFieldType.EnumType enumType = (HoodieFieldType.EnumType) fieldType;
          schema = org.apache.avro.Schema.createEnum("enum", null, null, enumType.getSymbols());
        } else {
          schema = org.apache.avro.Schema.createEnum("enum", null, null, java.util.Collections.emptyList());
        }
        break;
      case FIXED:
        if (fieldType instanceof HoodieFieldType.FixedType) {
          HoodieFieldType.FixedType fixedType = (HoodieFieldType.FixedType) fieldType;
          schema = org.apache.avro.Schema.createFixed("fixed", null, null, fixedType.getLength());
        } else {
          schema = org.apache.avro.Schema.createFixed("fixed", null, null, 16);
        }
        break;
      default:
        throw new IllegalArgumentException("Unsupported Hudi type for Avro conversion: " + fieldType.getDataType());
    }
    
    // Make nullable if required and not already a union
    if (nullable && schema.getType() != Type.UNION) {
      schema = org.apache.avro.Schema.createUnion(org.apache.avro.Schema.create(Type.NULL), schema);
    }
    
    return schema;
  }
  
  /**
   * Gets Arrow children fields for complex HoodieFieldTypes.
   */
  private static List<Field> getArrowChildrenForHoodieType(HoodieFieldType fieldType) {
    List<Field> children = new ArrayList<>();
    
    switch (fieldType.getDataType()) {
      case ARRAY:
        HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
        ArrowType elementArrowType = convertHoodieTypeToArrowType(arrayType.getElementType());
        FieldType elementFieldType = new FieldType(true, elementArrowType, null);
        List<Field> elementChildren = getArrowChildrenForHoodieType(arrayType.getElementType());
        children.add(new Field("element", elementFieldType, elementChildren));
        break;
        
      case MAP:
        HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
        ArrowType keyArrowType = convertHoodieTypeToArrowType(mapType.getKeyType());
        ArrowType valueArrowType = convertHoodieTypeToArrowType(mapType.getValueType());
        
        FieldType keyFieldType = new FieldType(false, keyArrowType, null);
        FieldType valueFieldType = new FieldType(true, valueArrowType, null);
        
        List<Field> keyChildren = getArrowChildrenForHoodieType(mapType.getKeyType());
        List<Field> valueChildren = getArrowChildrenForHoodieType(mapType.getValueType());
        
        List<Field> structChildren = new ArrayList<>();
        structChildren.add(new Field("key", keyFieldType, keyChildren));
        structChildren.add(new Field("value", valueFieldType, valueChildren));
        
        FieldType structFieldType = new FieldType(false, ArrowType.Struct.INSTANCE, null);
        children.add(new Field("entries", structFieldType, structChildren));
        break;
        
      case STRUCT:
        HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
        for (HoodieField field : structType.getFields()) {
          children.add(convertHoodieFieldToArrow(field));
        }
        break;
        
      case UNION:
        HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
        for (int i = 0; i < unionType.getTypes().size(); i++) {
          HoodieFieldType childType = unionType.getTypes().get(i);
          ArrowType childArrowType = convertHoodieTypeToArrowType(childType);
          FieldType childFieldType = new FieldType(true, childArrowType, null);
          List<Field> childChildren = getArrowChildrenForHoodieType(childType);
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
   * Utility method to check if a conversion between two schema formats is lossless.
   * @param sourceFormat source schema format ("avro" or "arrow")
   * @param targetFormat target schema format ("avro" or "arrow")
   * @param schema the schema to check (either HoodieAvroSchema or HoodieArrowSchema)
   * @return true if conversion is lossless, false if some information may be lost
   */
  public static boolean isLosslessConversion(String sourceFormat, String targetFormat, HoodieSchema schema) {
    if (sourceFormat.equals(targetFormat)) {
      return true;
    }
    
    // Check for known lossy conversions
    for (HoodieField field : schema.getFields()) {
      if (!isFieldConversionLossless(sourceFormat, targetFormat, field.getType())) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Checks if a field type conversion is lossless.
   */
  private static boolean isFieldConversionLossless(String sourceFormat, String targetFormat, HoodieFieldType fieldType) {
    // Arrow to Avro lossy conversions
    if ("arrow".equals(sourceFormat) && "avro".equals(targetFormat)) {
      switch (fieldType.getDataType()) {
        case UINT8:
        case UINT16:
        case UINT32:
        case UINT64:
          return false; // Avro doesn't support unsigned integers
        case DATE32:
        case DATE64:
        case TIME32:
        case TIME64:
        case TIMESTAMP:
        case DURATION:
          return false; // Avro uses logical types, may lose precision
        default:
          break;
      }
    }
    
    // Avro to Arrow lossy conversions
    if ("avro".equals(sourceFormat) && "arrow".equals(targetFormat)) {
      switch (fieldType.getDataType()) {
        case ENUM:
          return false; // Arrow represents enums as dictionaries, not native type
        default:
          break;
      }
    }
    
    // Recursively check complex types
    if (fieldType instanceof HoodieFieldType.ArrayType) {
      HoodieFieldType.ArrayType arrayType = (HoodieFieldType.ArrayType) fieldType;
      return isFieldConversionLossless(sourceFormat, targetFormat, arrayType.getElementType());
    } else if (fieldType instanceof HoodieFieldType.MapType) {
      HoodieFieldType.MapType mapType = (HoodieFieldType.MapType) fieldType;
      return isFieldConversionLossless(sourceFormat, targetFormat, mapType.getKeyType()) &&
             isFieldConversionLossless(sourceFormat, targetFormat, mapType.getValueType());
    } else if (fieldType instanceof HoodieFieldType.StructType) {
      HoodieFieldType.StructType structType = (HoodieFieldType.StructType) fieldType;
      for (HoodieField field : structType.getFields()) {
        if (!isFieldConversionLossless(sourceFormat, targetFormat, field.getType())) {
          return false;
        }
      }
    } else if (fieldType instanceof HoodieFieldType.UnionType) {
      HoodieFieldType.UnionType unionType = (HoodieFieldType.UnionType) fieldType;
      for (HoodieFieldType type : unionType.getTypes()) {
        if (!isFieldConversionLossless(sourceFormat, targetFormat, type)) {
          return false;
        }
      }
    }
    
    return true;
  }
}