/* jshint -W097, -W033 */
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
      state: 'app.contacts.contact',
      config: {
        title: 'Contact',
        url: "/:ID",
        templateUrl: 'src/contacts/contact/view.html',
        controller: 'ContactsContactController',
      }
    }];
  }

}());
