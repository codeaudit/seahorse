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

import clusterModalTpl from './choose-cluster-modal.html';
import presetModalTpl from './preset-modal/preset-modal.html';

const presetTypesMap = {
  standalone: 'Stand-alone',
  yarn: 'YARN',
  mesos: 'Mesos',
  local: 'Local'
};

/* @ngInject */
function ClusterModalService($uibModal) {
  const service = this;

  service.formatPresetType = formatPresetType;
  service.openClusterSelectionModal = openClusterSelectionModal;
  service.openCurrentClusterModal = openCurrentClusterModal;

  function formatPresetType(type) {
    return presetTypesMap[type];
  }

  function openClusterSelectionModal() {
    return $uibModal.open({
      animation: false,
      templateUrl: clusterModalTpl,
      controller: 'ChooseClusterModalCtrl',
      controllerAs: 'controller',
      backdrop: 'static',
      size: 'lg',
      keyboard: true
    });
  }

  function openCurrentClusterModal(type, preset, isSnapshot) {
    return $uibModal.open({
      animation: false,
      templateUrl: presetModalTpl,
      controller: 'PresetModalCtrl',
      controllerAs: 'controller',
      backdrop: 'static',
      size: 'lg',
      keyboard: true,
      resolve: {
        preset: () => {
          return preset;
        },
        type: () => {
          return type;
        },
        isSnapshot: () => {
          return isSnapshot;
        }
      }
    });
  }

}

exports.inject = function (module) {
  module.service('ClusterModalService', ClusterModalService);
};
