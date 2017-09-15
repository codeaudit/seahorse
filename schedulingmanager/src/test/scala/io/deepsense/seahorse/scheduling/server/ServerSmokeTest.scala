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

package io.deepsense.seahorse.scheduling.server

import scalaj.http._

import org.scalatest.{Matchers, WordSpec}

import io.deepsense.commons.utils.LoggerForCallerClass
import io.deepsense.seahorse.scheduling.SchedulingManagerConfig

class ServerSmokeTest extends WordSpec with Matchers {

  val logger = LoggerForCallerClass()

  "Jetty server" should {
    JettyMain.start(Array.empty, SchedulingManagerConfig.jetty.copy(port = 18080))

    "serve schedules" in {
      val response = Http("http://localhost:18080/schedulingmanager/v1/workflow-schedules").asString
      logger.info(s"Scheduling manager response: ${response.body}")
      response.isNotError shouldBe true
    }
    "serve swagger-ui" in {
      val response = Http("http://localhost:18080/schedulingmanager/v1/swagger-ui").asString
      logger.info(s"Swagger ui response: ${response.body}")
      response.isNotError shouldBe true
    }
  }

}
