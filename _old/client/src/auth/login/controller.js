(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /* @ngInject */
  function AuthLoginController($stateParams, $state, LoginMessages, AppUser) {
    var vm = this;

    vm.loading = false;
    vm.SignIn = SignIn;

    activate();

    function activate() {

      if ($stateParams.ref) {
        _signMessage($stateParams.ref.toUpperCase());
      }
    }

    function SignIn() {

      vm.loading = true;
      vm.Alert = false;

      AppUser
        .login(angular.copy(vm.credentials))
        .$promise
        .then(function(response) {
          $state.go("app.dashboard");
        }, function(rejection) {
          vm.credentials.password = null;
          vm.loading = false;
          _signMessage(rejection.data.error.code.toUpperCase());
        });
    }

    function _signMessage(code) {
      vm.Alert = LoginMessages[code];
    }

  }

}());
