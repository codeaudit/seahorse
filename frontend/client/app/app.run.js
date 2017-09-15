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

/* @ngInject */
function AppRun($rootScope, $uibModalStack) {

  $rootScope.stateData = {
    showView: undefined,
    dataIsLoaded: undefined
  };

  $rootScope.$on('$stateChangeStart', () => {
    $rootScope.stateData.dataIsLoaded = undefined;
    $rootScope.showView = undefined;

    _unbindDeepsenseCustomListeners();
    _clearModalsFromStack();
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    $rootScope.stateData.showView = true;
  });

  function _unbindDeepsenseCustomListeners() {
    for(let key in $rootScope.$$listeners) {
      if (key[0] !== '$') {
        delete $rootScope.$$listeners[key];
      }
    }
  }

  function _clearModalsFromStack() {
    while ($uibModalStack.getTop()) {
      $uibModalStack.dismiss($uibModalStack.getTop().key);
    }
  }
}

exports.function = AppRun;

exports.inject = function(module) {
  module.run(AppRun);
};
