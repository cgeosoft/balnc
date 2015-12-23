/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app')
    .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, $stateParams, TOOLS) {
    $rootScope.APP = APP;

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.title) {
        $rootScope.title = (toState.title) ? toState.title : APP.description;
      } else {
        $rootScope.title = null;
      }

      if (toState.tool) {
        $rootScope.tool = _.findWhere(TOOLS, {
          alias: toState.tool
        });
        $rootScope.title = ' - ' + $rootScope.tool.title + " v" + $rootScope.tool.version;
      } else {
        $rootScope.tool = null;
      }
    });

  }

}());
