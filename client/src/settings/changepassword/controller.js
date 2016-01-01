(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller("ChangePasswordController", ChangePasswordController);

  /* @ngInject */
  function ChangePasswordController($uibModalInstance, ModalParams, User, toaster) {
    var vm = this;

    vm.Save = Save;

    activate();

    function activate() {}

    function Save() {
      vm.loading = true;
      User.prototype$updateAttributes({
          id: User.getCurrentId(),
          password: vm.Password
        })
        .$promise
        .then(function(user) {
          toaster.pop('success', "Password Changed");
          vm.loading = false;
          $uibModalInstance.close();
        });
    }

  }

}());
