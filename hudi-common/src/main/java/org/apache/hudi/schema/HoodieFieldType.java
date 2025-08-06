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
import java.util.Objects;

/**
 * Represents a field type in the Hoodie schema system.
 * This abstracts over Arrow and Avro type systems while staying closer to Arrow design.
 */
public abstract class HoodieFieldType implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private final HoodieDataType dataType;
  
  protected HoodieFieldType(HoodieDataType dataType) {
    this.dataType = Objects.requireNonNull(dataType, "Data type cannot be null");
  }
  
  public HoodieDataType getDataType() {
    return dataType;
  }
  
  public boolean isPrimitive() {
    return dataType.isPrimitive();
  }
  
  public boolean isComplex() {
    return dataType.isComplex();
  }
  
  public boolean isTemporal() {
    return dataType.isTemporal();
  }
  
  public boolean isNumeric() {
    return dataType.isNumeric();
  }
  
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    HoodieFieldType that = (HoodieFieldType) o;
    return Objects.equals(dataType, that.dataType);
  }
  
  @Override
  public int hashCode() {
    return Objects.hash(dataType);
  }
  
  // Factory methods for primitive types
  public static HoodieFieldType primitive(HoodieDataType dataType) {
    if (!dataType.isPrimitive()) {
      throw new IllegalArgumentException("Data type must be primitive: " + dataType);
    }
    return new PrimitiveType(dataType);
  }
  
  // Factory methods for complex types
  public static HoodieFieldType array(HoodieFieldType elementType) {
    return new ArrayType(elementType);
  }
  
  public static HoodieFieldType map(HoodieFieldType keyType, HoodieFieldType valueType) {
    return new MapType(keyType, valueType);
  }
  
  public static HoodieFieldType struct(List<HoodieField> fields) {
    return new StructType(fields);
  }
  
  public static HoodieFieldType union(List<HoodieFieldType> types) {
    return new UnionType(types);
  }
  
  // Factory methods for special types
  public static HoodieFieldType decimal(int precision, int scale) {
    return new DecimalType(precision, scale);
  }
  
  public static HoodieFieldType fixed(int length) {
    return new FixedType(length);
  }
  
  public static HoodieFieldType enumType(List<String> symbols) {
    return new EnumType(symbols);
  }
  
  // Primitive type implementation
  public static class PrimitiveType extends HoodieFieldType {
    public PrimitiveType(HoodieDataType dataType) {
      super(dataType);
    }
    
    @Override
    public String toString() {
      return getDataType().name();
    }
  }
  
  // Array type implementation
  public static class ArrayType extends HoodieFieldType {
    private final HoodieFieldType elementType;
    
    public ArrayType(HoodieFieldType elementType) {
      super(HoodieDataType.ARRAY);
      this.elementType = Objects.requireNonNull(elementType, "Element type cannot be null");
    }
    
    public HoodieFieldType getElementType() {
      return elementType;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      ArrayType arrayType = (ArrayType) o;
      return Objects.equals(elementType, arrayType.elementType);
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), elementType);
    }
    
    @Override
    public String toString() {
      return "ARRAY<" + elementType + ">";
    }
  }
  
  // Map type implementation
  public static class MapType extends HoodieFieldType {
    private final HoodieFieldType keyType;
    private final HoodieFieldType valueType;
    
    public MapType(HoodieFieldType keyType, HoodieFieldType valueType) {
      super(HoodieDataType.MAP);
      this.keyType = Objects.requireNonNull(keyType, "Key type cannot be null");
      this.valueType = Objects.requireNonNull(valueType, "Value type cannot be null");
    }
    
    public HoodieFieldType getKeyType() {
      return keyType;
    }
    
    public HoodieFieldType getValueType() {
      return valueType;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      MapType mapType = (MapType) o;
      return Objects.equals(keyType, mapType.keyType) &&
             Objects.equals(valueType, mapType.valueType);
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), keyType, valueType);
    }
    
    @Override
    public String toString() {
      return "MAP<" + keyType + ", " + valueType + ">";
    }
  }
  
  // Struct type implementation
  public static class StructType extends HoodieFieldType {
    private final List<HoodieField> fields;
    
    public StructType(List<HoodieField> fields) {
      super(HoodieDataType.STRUCT);
      this.fields = Objects.requireNonNull(fields, "Fields cannot be null");
    }
    
    public List<HoodieField> getFields() {
      return fields;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      StructType that = (StructType) o;
      return Objects.equals(fields, that.fields);
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), fields);
    }
    
    @Override
    public String toString() {
      return "STRUCT<" + fields + ">";
    }
  }
  
  // Union type implementation
  public static class UnionType extends HoodieFieldType {
    private final List<HoodieFieldType> types;
    
    public UnionType(List<HoodieFieldType> types) {
      super(HoodieDataType.UNION);
      this.types = Objects.requireNonNull(types, "Types cannot be null");
    }
    
    public List<HoodieFieldType> getTypes() {
      return types;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      UnionType unionType = (UnionType) o;
      return Objects.equals(types, unionType.types);
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), types);
    }
    
    @Override
    public String toString() {
      return "UNION<" + types + ">";
    }
  }
  
  // Decimal type implementation
  public static class DecimalType extends HoodieFieldType {
    private final int precision;
    private final int scale;
    
    public DecimalType(int precision, int scale) {
      super(precision <= 128 ? HoodieDataType.DECIMAL128 : HoodieDataType.DECIMAL256);
      this.precision = precision;
      this.scale = scale;
    }
    
    public int getPrecision() {
      return precision;
    }
    
    public int getScale() {
      return scale;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      DecimalType that = (DecimalType) o;
      return precision == that.precision && scale == that.scale;
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), precision, scale);
    }
    
    @Override
    public String toString() {
      return "DECIMAL(" + precision + ", " + scale + ")";
    }
  }
  
  // Fixed type implementation (for Avro compatibility)
  public static class FixedType extends HoodieFieldType {
    private final int length;
    
    public FixedType(int length) {
      super(HoodieDataType.FIXED);
      this.length = length;
    }
    
    public int getLength() {
      return length;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      FixedType fixedType = (FixedType) o;
      return length == fixedType.length;
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), length);
    }
    
    @Override
    public String toString() {
      return "FIXED(" + length + ")";
    }
  }
  
  // Enum type implementation (for Avro compatibility)
  public static class EnumType extends HoodieFieldType {
    private final List<String> symbols;
    
    public EnumType(List<String> symbols) {
      super(HoodieDataType.ENUM);
      this.symbols = Objects.requireNonNull(symbols, "Symbols cannot be null");
    }
    
    public List<String> getSymbols() {
      return symbols;
    }
    
    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      EnumType enumType = (EnumType) o;
      return Objects.equals(symbols, enumType.symbols);
    }
    
    @Override
    public int hashCode() {
      return Objects.hash(super.hashCode(), symbols);
    }
    
    @Override
    public String toString() {
      return "ENUM" + symbols;
    }
  }
}