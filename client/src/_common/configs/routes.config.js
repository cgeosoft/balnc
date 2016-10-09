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
                    user: userResolver,
                    account: accountsResolver,
                },
                templateUrl: 'src/_common/views/layout.html',
                controller: 'AppController'
            }
        }];
    }

    /* @ngInject */
    function userResolver(AppUser) {
        return AppUser.getCurrent();
    }

    /* @ngInject */
    function accountsResolver(user, AccountService) {
        return AccountService.loadAccounts();
    }

} ());
