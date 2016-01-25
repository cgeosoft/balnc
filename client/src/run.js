/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app')
    .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, $stateParams) {

    $rootScope.APP = APP;
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {

      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }

    });

  }

}());
