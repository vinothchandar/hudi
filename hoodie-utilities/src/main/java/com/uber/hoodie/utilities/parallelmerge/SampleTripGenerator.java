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

package com.uber.hoodie.utilities.parallelmerge;

import java.util.Arrays;
import java.util.Random;
import java.util.UUID;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.GenericRecordBuilder;

/**
 * Keeps generating an infinite number of sample trips.
 */
public class SampleTripGenerator {

  private static final long SEED = 747074739788L;
  private static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


  private static final int MAX_TRIP_DURATION_MINS = 60;
  private static final int MAX_RIDER_ID = 1000000;
  private static final int MAX_DRIVER_ID = 10000;
  private static final int MAX_MILES = 30;
  private static final int MAX_CITY_ID = 600;
  private static final int MAX_FARE_USD = 200;
  private static final int MAX_TIP_USD = 5;
  private static final String[] TRIP_TYPES = {"Pool", "UberX", "ExpressPool"};
  private static final int MAX_ETA_MINS = 10;

  private Random random;
  private Schema schema;

  public SampleTripGenerator(Schema schema) {
    this.random = new Random(SEED);
    this.schema = schema;
  }

  private String randomString(int len) {
    StringBuilder sb = new StringBuilder(len);
    for (int i = 0; i < len; i++) {
      sb.append(AB.charAt(random.nextInt(AB.length())));
    }
    return sb.toString();
  }

  public GenericRecord nextAvroRecord() {
    // TODO: This is too slow.. Need an alternative
    //Faker faker = new Faker();

    GenericRecordBuilder recordBuilder = new GenericRecordBuilder(schema);

    recordBuilder.set("trip_uuid", UUID.randomUUID().toString());
    long startTs = System.currentTimeMillis();
    recordBuilder.set("start_ts", startTs);
    recordBuilder.set("end_ts", startTs + (60 * 1000 * random.nextInt(MAX_TRIP_DURATION_MINS)));
    recordBuilder.set("rider_id", "rider-" + random.nextInt(MAX_RIDER_ID));
    recordBuilder.set("driver_id", "driver-" + random.nextInt(MAX_DRIVER_ID));

    //Address startAddr = faker.address();
    //Address endAddr = faker.address();
    recordBuilder.set("start_coords", Arrays.asList(random.nextFloat(), random.nextFloat()));
    recordBuilder.set("end_coords", Arrays.asList(random.nextFloat(), random.nextFloat()));
    //recordBuilder.set("start_address", startAddr.fullAddress());
    //recordBuilder.set("end_address", endAddr.fullAddress());
    recordBuilder.set("start_address", randomString(100));
    recordBuilder.set("end_address", randomString(100));

    recordBuilder.set("total_distance_miles", random.nextFloat() * MAX_MILES);

    recordBuilder.set("waypoints", null);
    recordBuilder.set("city_id", random.nextInt(MAX_CITY_ID));
    recordBuilder.set("fare", random.nextGaussian() * MAX_FARE_USD);
    recordBuilder.set("tip", random.nextGaussian() * MAX_TIP_USD);
    recordBuilder.set("vehicle", null);

    recordBuilder.set("type", TRIP_TYPES[random.nextInt(TRIP_TYPES.length)]);
    recordBuilder.set("eta_estimate", random.nextGaussian() * MAX_ETA_MINS);
    recordBuilder.set("eta_actual", random.nextGaussian() * MAX_ETA_MINS);
    recordBuilder.set("rider_feedback", null);
    recordBuilder.set("driver_feedback", null);

    return recordBuilder.build();
  }
}
