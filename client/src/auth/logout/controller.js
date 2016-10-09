(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLogoutController', AuthLogoutController);

  /* @ngInject */
  function AuthLogoutController($state, AppUser) {
    var vm = this;

    AppUser
      .logout()
      .$promise
      .then(function (_user) {
        $state.go("auth.login");
      });

  }

} ());
