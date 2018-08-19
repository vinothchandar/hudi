/*
 *  Copyright (c) 2017 Uber Technologies, Inc. (hoodie-dev-group@uber.com)
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */

package com.uber.hoodie.utilities;

import com.uber.hoodie.common.util.DFSPropertiesConfiguration;
import com.uber.hoodie.common.util.TypedProperties;
import com.uber.hoodie.exception.HoodieException;
import com.uber.hoodie.utilities.schema.SchemaProvider;
import com.uber.hoodie.utilities.sources.Source;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.lang3.reflect.ConstructorUtils;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.spark.api.java.JavaSparkContext;

/**
 * Bunch of helper methods
 */
public class UtilHelpers {

  public static Source createSource(String sourceClass, TypedProperties cfg,
      JavaSparkContext jssc, SchemaProvider schemaProvider)
      throws IOException {
    try {
      return (Source) ConstructorUtils.invokeConstructor(Class.forName(sourceClass), (Object) cfg,
          (Object) jssc, (Object) schemaProvider);
    } catch (Throwable e) {
      throw new IOException("Could not load source class " + sourceClass, e);
    }
  }

  public static SchemaProvider createSchemaProvider(String schemaProviderClass,
      TypedProperties cfg, JavaSparkContext jssc) throws IOException {
    try {
      return (SchemaProvider) ConstructorUtils.invokeConstructor(Class.forName(schemaProviderClass),
          (Object) cfg, (Object) jssc);
    } catch (Throwable e) {
      throw new IOException("Could not load schema provider class " + schemaProviderClass, e);
    }
  }

  /**
   */
  public static DFSPropertiesConfiguration readConfig(FileSystem fs, Path cfgPath) {
    try {
      return new DFSPropertiesConfiguration(fs, cfgPath);
    } catch (Exception e) {
      throw new HoodieException("Unable to read props file at :" + cfgPath, e);
    }
  }

  public static TypedProperties readConfig(InputStream in) throws IOException {
    TypedProperties defaults = new TypedProperties();
    defaults.load(in);
    return defaults;
  }
}
