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

            }
        }];
    }

}());
