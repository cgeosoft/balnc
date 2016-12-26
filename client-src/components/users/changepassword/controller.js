(function () {
  'use strict'

  angular
    .module('app.settings')
    .controller('ChangePasswordController', ChangePasswordController)

  /* @ngInject */
  function ChangePasswordController ($uibModalInstance, ModalParams, AppUser, toaster) {
    var vm = this

    vm.Save = Save

    activate()

    function activate () {}

    function Save () {
      vm.loading = true
      AppUser.prototype$updateAttributes({
        id: AppUser.getCurrentId(),
        password: vm.Password
      })
        .$promise
        .then(function (user) {
          toaster.pop('success', 'Password Changed')
          vm.loading = false
          $uibModalInstance.close()
        })
    }
  }
}())
