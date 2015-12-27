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
        templateUrl: 'src/_common/views/layout.html',
        resolve: {
          isAuthenticated: function($state, User, $timeout) {
            $timeout(
              function() {
                if (!User.isAuthenticated()) {
                  $state.go("auth.login");
                  return false;
                }
              });

          }
        },
        controller: function(User) {
          var vm = this;

          User
            .getCurrent()
            .$promise
            .then(function(_user) {
              vm.username = _user.username;
            });

        }
      }
    }];
  }

}());
