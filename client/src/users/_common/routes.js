(function() {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.users',
      config: {
        url: '/users',
        controller: "UsersOverviewController",
        templateUrl: 'src/users/overview/view.html',
      }
    }];
  }

}());
