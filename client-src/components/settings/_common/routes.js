(function () {
  'use strict'

  angular
    .module('app.settings')
    .run(appRun)

  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [{
      state: 'app.settings',
      config: {
        abstract: true,
        url: '/settings',
        controller: 'SettingsController',
        templateUrl: 'settings/_common/layout.html'
      }
    }, {
      state: 'app.settings.general',
      config: {
        url: '/general',
        controller: 'SettingsGeneralController',
        templateUrl: 'settings/general/view.html'
      }
    }, {
      state: 'app.settings.users',
      config: {
        url: '/users',
        controller: 'SettingsAppUsersController',
        templateUrl: 'settings/users/view.html'
      }
    }, {
      state: 'app.settings.profile',
      config: {
        url: '/profile',
        controller: 'SettingsProfileController',
        templateUrl: 'settings/profile/view.html'
      }
    }, {
      state: 'app.settings.help',
      config: {
        url: '/help',
        controller: 'SettingsHelpController',
        templateUrl: 'settings/help/view.html'
      }
    }, {
      state: 'app.settings.terms',
      config: {
        url: '/terms',
        controller: 'SettingsTermsController',
        templateUrl: 'settings/terms/view.html'
      }
    }]
  }
}())
