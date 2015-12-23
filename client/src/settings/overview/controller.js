(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsController', SettingsController);

  /* @ngInject */
  function SettingsController($state, SettingsService, SettingsModals) {
    var vm = this;

    vm.ChangePassword = ChangePassword;

    activate();

    function activate() {}

    function ChangePassword() {
      SettingsModals
        .ChangePassword()
        .then(function() {
          $state.go("auth.logout", {
            ref: "SIGNOUT"
          });
        });
    }

  }
})();
