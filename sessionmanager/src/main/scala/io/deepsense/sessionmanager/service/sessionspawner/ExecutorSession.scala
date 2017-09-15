/**
 * Copyright 2016, deepsense.ai
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.deepsense.sessionmanager.service.sessionspawner

import java.time.Instant

import org.apache.spark.launcher.SparkAppHandle

import io.deepsense.commons.models.ClusterDetails
import io.deepsense.sessionmanager.service.{Session, Status}
import io.deepsense.sessionmanager.service.sessionspawner.sparklauncher.outputintercepting.OutputInterceptorHandle

case class ExecutorSession(
    sessionConfig: SessionConfig,
    clusterDetails: ClusterDetails,
    private val sparkAppHandleOpt: Option[SparkAppHandle],
    private val state: StateInferencer,
    private val outputInterceptorHandle: OutputInterceptorHandle) {

  def sessionForApi(): Session = {
    val status = sparkAppHandleOpt match {
      case None => Status.Error // no working spark process at all
      case Some(sparkAppHandle) => state.statusForApi(Instant.now(), sparkAppHandle.getState)
    }
    Session(
      sessionConfig.workflowId,
      status,
      clusterDetails
    )
  }

  def handleHeartbeat(): ExecutorSession = this.copy(
    state = state.handleHeartbeat(Instant.now())
  )

  def kill(): Unit = {
    sparkAppHandleOpt.foreach(_.kill())
    outputInterceptorHandle.close()
  }

}
