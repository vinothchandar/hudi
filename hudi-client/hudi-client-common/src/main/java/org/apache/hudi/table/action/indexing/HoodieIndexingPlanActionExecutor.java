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

package org.apache.hudi.table.action.indexing;

import org.apache.hudi.avro.model.HoodieIndexingPlan;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.table.timeline.TimelineMetadataUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ValidationUtils;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.metadata.MetadataPartitionType;
import org.apache.hudi.table.HoodieTable;
import org.apache.hudi.table.action.BaseActionExecutor;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

/**
 * Plan indexing for a given metadata partition.
 */
public class HoodieIndexingPlanActionExecutor<T extends HoodieRecordPayload, I, K, O> extends BaseActionExecutor<T, I, K, O, Option<HoodieIndexingPlan>> {

  public static final String INDEXING_TRIGGERING_INSTANT_TIME_PROP = "hoodie.indexing.triggering.instant";
  private static final Logger LOG = LogManager.getLogger(HoodieIndexingPlanActionExecutor.class);

  private Option<Map<String, String>> extraMetadata;

  public HoodieIndexingPlanActionExecutor(HoodieEngineContext context,
                                          HoodieWriteConfig config,
                                          HoodieTable<T, I, K, O> table,
                                          String indexingInstantTime,
                                          Option<Map<String, String>> extraMetadata) {
    super(context, config, table, indexingInstantTime);
    this.extraMetadata = extraMetadata;
  }

  @Override
  public Option<HoodieIndexingPlan> execute() {
    ValidationUtils.checkState(config.isMetadataTableEnabled(), "Metadata table cannot be initialized as it is not enabled");

    // Mark the earliest instant time in the active timeline, we will track all inflight writers & table services
    // from that instant time t0 to indexingInstantTime ti. Note that this scheduling is happening within the table lock
    // and thus no other scheduling is happening at the moment.
    Option<HoodieInstant> earliestInstant = table.getActiveTimeline().filterCompletedInstants().firstInstant();
    HoodieIndexingPlan indexingPlan = HoodieIndexingPlan.newBuilder()
        .setEarliestInstantTime(earliestInstant.map(HoodieInstant::getTimestamp).orElse(null))
        .setExtraMetadata(extraMetadata.orElse(Collections.EMPTY_MAP))
        //FIXME(indexing): this has to be configurable based on what we actually build.
        .setPartitionPath(MetadataPartitionType.FILES.partitionPath())
        .setType(MetadataPartitionType.FILES.name())
        .setTriggeringInstantTime(extraMetadata
            .map(m -> m.get(INDEXING_TRIGGERING_INSTANT_TIME_PROP))
            .orElse(null))
        .setConfigs(Collections.EMPTY_MAP)
        .build();

    // request the indexing.
    final HoodieInstant indexingInstant = new HoodieInstant(HoodieInstant.State.REQUESTED, HoodieTimeline.INDEXING_ACTION, instantTime);
    try {
      table.getActiveTimeline().saveToIndexingRequested(indexingInstant, TimelineMetadataUtils.serializeIndexingPlan(indexingPlan));
      LOG.info("Requesting indexing at instant time " + indexingInstant);
    } catch (IOException e) {
      LOG.error("Error scheduling indexing request.", e);
      throw new HoodieIOException(e.getMessage(), e);
    }

    //FIXME(indexing): abort the existing pending indexing actions.
    table.getActiveTimeline().getIndexingTimeline().filterInflightsAndRequested();

    return Option.of(indexingPlan);
  }
}
