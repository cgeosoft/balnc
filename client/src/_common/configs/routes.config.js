(function () {
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
                    isAuthenticated: function ($state, AppUser) {
                        if (!AppUser.isAuthenticated()) {
                            $state.go("auth.login");
                            return false;
                        }
                    }
                },
                templateUrl: 'src/_common/views/layout.html',
                controller: 'AppController'
            }
        }];
    }
    
} ());
