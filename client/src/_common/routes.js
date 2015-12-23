/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates(), "/");
  }

  function getStates() {
    return [{
      state: 'app',
      config: {
        abstract: true,
        templateUrl: 'views/_common/views/layout.html',
        controller: function(TOOLS) {
          var vm = this;
          vm.tools = _.sortBy(TOOLS,"title");
        }
      }
    }];
  }

}());
