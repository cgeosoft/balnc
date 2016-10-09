
(function () {
  'use strict';

  angular
    .module('app')
    .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, $stateParams) {

    $rootScope.$on('$stateChangeStart', function (evt, to, params) {

      $rootScope.title = toState.title;

      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }

    });

  }

} ());
