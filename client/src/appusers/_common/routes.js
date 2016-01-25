(function() {
  'use strict';

  angular
    .module('app.appusers')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.appusers',
      config: {
        url: '/users',
        controller: "AppUsersOverviewController",
        templateUrl: 'src/appusers/overview/view.html',
      }
    }];
  }

}());
