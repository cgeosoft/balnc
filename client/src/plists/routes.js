(function() {
  'use strict';

  angular
    .module('app.plists')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.plists',
      config: {
        url: '/plists',
        controller: "PlistsController",
        templateUrl: 'src/plists/overview/view.html',
      }
    }];
  }

}());
