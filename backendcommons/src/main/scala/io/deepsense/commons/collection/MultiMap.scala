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

package io.deepsense.commons.collection

object MultiMap {
  type MultiMap[A, B] = Map[A, Set[B]]

  implicit class MultiMapOpts[A, B](self: MultiMap[A, B]) {
    def addBinding(key: A, value: B): MultiMap[A, B] = {
      val newValueSet = self.get(key) match {
        case Some(defined) => defined + value
        case None => Set(value)
      }
      self + (key -> newValueSet)
    }

    def removeBinding(key: A, value: B): MultiMap[A, B] = {
      val newValueSet = self.get(key) match {
        case Some(defined) => defined - value
        case None => Set.empty[B]
      }
      if (newValueSet.nonEmpty) self + (key -> newValueSet) else self
    }
  }
}
