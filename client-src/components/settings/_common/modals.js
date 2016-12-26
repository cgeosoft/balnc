
(function () {
  'use strict'

  angular
    .module('app.settings')
    .factory('SettingsModals', SettingsModals)

  SettingsModals.$inject = ['modalHelper']

  function SettingsModals (modalHelper) {
    return modalHelper.configureModals(getModals())

    function getModals () {
      return [{
        modal: 'ChangePassword',
        config: {
          templateUrl: 'settings/changepassword/view.html',
          controller: 'ChangePasswordController',
          size: 'sm'
        }
      }, {
        modal: 'UserForm',
        config: {
          templateUrl: 'settings/user.form/view.html',
          controller: 'UserFormController',
          size: 'sm'
        }
      }]
    }
  }
}())
