
(function () {
  'use strict';

  angular
    .module('app.auth')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'auth',
      config: {
        abstract: true,
        template: '<ui-view/>',
      }
    }, {
        state: 'auth.login',
        config: {
          url: '/login',
          params: {
            ref: null
          },
          templateUrl: "src/auth/login/view.html",
          controller: "AuthLoginController",
        }
      }, {
        state: 'auth.logout',
        config: {
          url: '/logout',
          template: "<ui-view/>",
          controller: "AuthLogoutController",
        }
      }];
  }

} ());
