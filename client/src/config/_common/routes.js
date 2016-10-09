(function () {
  'use strict';

  angular
    .module('app.config')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.config',
      config: {
        url: '/config',
        controller: "ConfigController",
        templateUrl: 'src/config/_common/layout.html',
      }
    }];
  }

} ());
