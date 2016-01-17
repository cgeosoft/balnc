(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsAppUsersController', SettingsAppUsersController);

  /* @ngInject */
  function SettingsAppUsersController(AppUser) {
    var vm = this;

    vm.FormAppUser = FormAppUser;

    activate();

    console.log("zzz");
    function activate() {
    console.log("aszxc");
      _loadAppUsers();
    }

    function _loadAppUsers() {
      vm.loading = true;
      console.log("Asd");
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

    function FormAppUser(AppUserID) {

    }

  }
})();
