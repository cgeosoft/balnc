(function() {
  'use strict';

  angular
    .module('app.users')
    .controller("UserFormController", UserFormController);

  /* @ngInject */
  function UserFormController($uibModalInstance, ModalParams, AppUser) {
    var vm = this;

    vm.Save = Save;

    activate();

    function activate() {
      if (ModalParams.AppUserID) {
        AppUser
          .findById({
            id: ModalParams.AppUserID
          })
          .$promise
          .then(function(appuser) {
            vm.AppUser = appuser;
          })
          .finally(function() {
            vm.loading = false;
          });
      }

    }

    function Save() {
      vm.loading = true;
      AppUser.upsert(vm.AppUser)
        .$promise
        .then(function(user) {
          $uibModalInstance.close();
        })
        .finally(function() {
          vm.loading = false;
        });
    }

  }

}());
