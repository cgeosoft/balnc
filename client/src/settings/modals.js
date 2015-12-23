/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .factory('SettingsModals', SettingsModals);

  SettingsModals.$inject = ['modalHelper'];

  function SettingsModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "ChangePassword",
        config: {
          templateUrl: 'src/settings/changepassword/view.html',
          controller: "ChangePasswordController",
          size: "sm"
        }
      }];
    }
  }

}());
