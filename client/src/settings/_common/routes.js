(function() {
  'use strict';

  angular
    .module('app.settings')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.settings',
      config: {
        abstract: true,
        url: '/settings',
        controller: "SettingsController",
        templateUrl: 'src/settings/_common/layout.html',
      }
    }, {
      state: 'app.settings.general',
      config: {
        url: '/general',
        controller: "SettingsGeneralController",
        templateUrl: 'src/settings/general/view.html',
      }
    }, {
      state: 'app.settings.users',
      config: {
        url: '/users',
        controller: "SettingsAppUsersController",
        templateUrl: 'src/settings/users/view.html',
      }
    }, {
      state: 'app.settings.profile',
      config: {
        url: '/profile',
        controller: "SettingsProfileController",
        templateUrl: 'src/settings/profile/view.html',
      }
    }, {
      state: 'app.settings.help',
      config: {
        url: '/help',
        controller: "SettingsHelpController",
        templateUrl: 'src/settings/help/view.html',
      }
    }, {
      state: 'app.settings.terms',
      config: {
        url: '/terms',
        controller: "SettingsTermsController",
        templateUrl: 'src/settings/terms/view.html',
      }
    }];
  }

}());
