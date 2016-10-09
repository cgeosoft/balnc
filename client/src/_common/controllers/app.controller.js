(function () {
  'use strict';

  angular
    .module('app._common')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($rootScope, $state, AppUser) {
    var vm = this;

    if (!AppUser.isAuthenticated()) {
      $state.go("auth.login");
      return false;
    }

    AppUser
      .getCurrent()
      .$promise
      .then(function (_user) {
        $rootScope._user = _user;
      });

  }

} ());
