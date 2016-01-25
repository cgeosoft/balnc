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
          isAuthenticated: function($state, AppUser, $timeout) {
            $timeout(function() {
              if (!AppUser.isAuthenticated()) {
                $state.go("auth.login");
                return false;
              }
            });
          }
        },
        views: {
          "": {
            templateUrl: 'src/_common/views/layout.html',
            controller: function(AppUser) {
              var vm = this;

              AppUser
                .getCurrent()
                .$promise
                .then(function(_user) {
                  vm.name = _user.fullname.split(" ")[1];
                });

            },
          },
          "menu-contacts@app": {
            templateUrl: 'src/contacts/topmenu/view.html',
            controller: "ContactsTopMenuController",
          },
        }
      }
    }];
  }

}());
