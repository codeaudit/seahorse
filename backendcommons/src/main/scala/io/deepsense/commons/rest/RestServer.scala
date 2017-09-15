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

package io.deepsense.commons.rest

import akka.actor.{ActorRef, ActorSystem}
import akka.io.IO
import com.google.inject.Inject
import com.google.inject.name.Named
import spray.can.Http

/**
 * RestServer binds an actor to Http messages.
 */
class RestServer @Inject()(
  @Named("server.host") host: String,
  @Named("server.port") port: Int,
  @Named("ApiRouterActorRef") routerRef: ActorRef
) (implicit actorSystem: ActorSystem) {
  def start(): Unit = {
    IO(Http) ! Http.Bind(routerRef, host, port)
  }
}
