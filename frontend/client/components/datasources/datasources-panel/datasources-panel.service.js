/**
 * Copyright 2017, deepsense.ai
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

'use strict';

import {datasourceContext} from 'APP/enums/datasources-context.js';

class DatasourcesPanelService {
  constructor() {
    'ngInject';

    this.isDatasourcesOpened = false;
  }

  openDatasourcesForBrowsing() {
    this.datasourcesContext = datasourceContext.BROWSE_DATASOURCE;
    this.isDatasourcesOpened = true;
  }

  openDatasourcesForReading() {
    this.datasourcesContext = datasourceContext.READ_DATASOURCE;
    this.isDatasourcesOpened = true;
  }

  openDatasourcesForWriting() {
    this.datasourcesContext = datasourceContext.WRITE_DATASOURCE;
    this.isDatasourcesOpened = true;
  }

  closeDatasources() {
    this.datasourcesContext = datasourceContext.BROWSE_DATASOURCE;
    this.isDatasourcesOpened = false;
  }

  setHandlerOnDatasourceSelect(fn) {
    this.onDatasourceSelectHandler = fn;
  }

  isOpenedForRead() {
    return this.datasourcesContext === datasourceContext.READ_DATASOURCE;
  }

  isOpenedForWrite() {
    return this.datasourcesContext === datasourceContext.WRITE_DATASOURCE;
  }

}

export default DatasourcesPanelService;