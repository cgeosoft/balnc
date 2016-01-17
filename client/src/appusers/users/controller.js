(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsAppUsersController', SettingsAppUsersController);

  /* @ngInject */
  function SettingsAppUsersController(AppUser, SettingsModals) {
    var vm = this;

    vm.UserForm = UserForm;

    activate();

    function activate() {
      _loadAppUsers();
    }

    function _loadAppUsers() {
      vm.loading = true;
      return AppUser
        .find()
        .$promise
        .then(function(users) {
          vm.AppUsers = users;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function UserForm(AppUserID) {
      SettingsModals
        .UserForm({
          AppUserID: AppUserID
        })
        .then(function() {
          _loadAppUsers();
        });
    }

  }
})();
