(function() {
    'use strict';

    angular
        .module('app.register')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'register',
            config: {
                url: '/register',
                templateUrl: "src/register/view.html",
                controller: "RegisterController",
            }
        }];
    }

}());
