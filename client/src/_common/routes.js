/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates(), "/");
  }

  function getStates() {
    return [{
      state: 'app',
      config: {
        abstract: true,
        resolve: {
          isAuthenticated: function($state, User, $timeout) {
            $timeout(function() {
              if (!User.isAuthenticated()) {
                $state.go("auth.login");
                return false;
              }
            });
          }
        },
        views: {
          "": {
            templateUrl: 'src/_common/views/layout.html',
            controller: function(User) {
              var vm = this;

              User
                .getCurrent()
                .$promise
                .then(function(_user) {
                  vm.username = _user.username;
                });

            },
          },
          "menu-contacts@app": {
            templateUrl: 'src/contacts/topmenu/view.html',
            controller: "ContactsTopMenuController",
          },
          // "menu-contacts@app": {
          //   templateUrl: 'src/contacts/topmenu/view.html',
          //   controller: "ContactsTopMenuController",
          // },
        }
      }
    }];
  }

}());
