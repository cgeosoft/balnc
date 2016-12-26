
(function () {
  'use strict'

  angular
    .module('app')
    .run(appRun)

  /* @ngInject */
  function appRun ($rootScope, $state, $stateParams) {
    $rootScope.APP = {
      version: '0.3.0',
      repository: 'https://github.com/ChristosGeorgiou/balance.git'
    }

    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
      $rootScope.title = to.title

      if (to.redirectTo) {
        evt.preventDefault()
        $state.go(to.redirectTo, params)
      }
    })
  }
}())
