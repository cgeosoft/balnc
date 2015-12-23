(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /* @ngInject */
  function AuthLoginController($stateParams, $state, LoginMessages, User) {
    var vm = this;

    vm.loading = false;
    vm.SignIn = SignIn;

    activate();

    function activate() {

      if ($stateParams.ref) {
        SignMessage($stateParams.ref.toUpperCase());
      }
    }

    function SignIn() {

      vm.loading = true;
      vm.Alert = false;

      User
        .login(angular.copy(vm.credentials))
        .$promise
        .then(function(response) {
          $state.go("app.lotteries.overview");
        }, function(rejection) {
          SignMessage(rejection.data.error.code.toUpperCase());
        })
        .finally(function() {
          vm.credentials.password = null;
          vm.loading = false;
        });
    }

    function SignMessage(code) {
      vm.Alert = LoginMessages[code];
    }

  }

}());
