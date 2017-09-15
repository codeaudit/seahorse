/**
 * Copyright 2015, deepsense.ai
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

package io.deepsense.workflowmanager.exceptions

import io.deepsense.commons.exception.FailureCode
import io.deepsense.commons.models.Entity

case class FileNotFoundException(entityId: Entity.Id)
  extends WorkflowManagerException(
    FailureCode.EntityNotFound,
    "File not found",
    s"File with id $entityId not found") {
  override protected def additionalDetails: Map[String, String] =
    Map("entityId" -> entityId.toString)
}
