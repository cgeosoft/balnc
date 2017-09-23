(function() {
    'use strict';

    angular
        .module('app.contacts')
        .run(RoutesConfig);

    /* @ngInject */
    function RoutesConfig(configHelper, routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.contacts',
            config: {
                abstract: true,
                url: "/contacts",
                template: '<ui-view/>',
            }
        }, {
            state: 'app.contacts.overview',
            config: {
                title: 'Contacts Overview',
                url: "/",
                templateUrl: 'src/contacts/overview/view.html',
                controller: 'ContactsOverviewController',
            }
        }, {
            state: 'app.contacts.person',
            config: {
                title: 'Person',
                url: "/person/:id",
                templateUrl: 'src/contacts/person/view.html',
                controller: 'ContactsPersonController',
            }
        }];
    }

}());
