/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.dashboard',
      config: {
        title: 'Dashboard',
        url: "/",
        templateUrl: 'src/dashboard/view.html',
        controller: 'DashboardController',
      }
    }];
  }

}());
