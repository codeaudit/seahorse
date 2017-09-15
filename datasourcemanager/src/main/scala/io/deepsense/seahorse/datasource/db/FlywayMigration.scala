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

package io.deepsense.seahorse.datasource.db

import org.flywaydb.core.Flyway

import io.deepsense.seahorse.datasource.DatasourceManagerConfig

object FlywayMigration {

  private val db = DatasourceManagerConfig.database

  def run(): Unit = {
    val flyway = new Flyway
    flyway.setLocations("db.migration.datasourcemanager")
    flyway.setSchemas(db.schema)
    flyway.setDataSource(DatasourceManagerConfig.config.getString("databaseSlick.db.url"), "", "")
    flyway.migrate()
  }
}
