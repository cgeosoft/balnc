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
      state: 'app.contacts.company',
      config: {
        abstract: true,
        url: "/company/:id",
        template:"<ui-view/>",
        controller: 'ContactsCompanyController',
      }
    }, {
      state: "app.contacts.company.map",
      config: {
        title: "map",
        url: "/map",
        templateUrl: 'src/contacts/company/map/view.html',
        controller: 'ContactsCompanyMapController',
      },
    }, {
      state: "app.contacts.company.profile",
      config: {
        abstract: true,
        templateUrl: 'src/contacts/company/_common/_profile.html',
      },
    }, {
      state: "app.contacts.company.profile.overview",
      config: {
        title: "overview",
        url: "/overview",
        templateUrl: 'src/contacts/company/overview/view.html',
        controller: 'ContactsCompanyOverviewController',
      },
    }, {
      state: "app.contacts.company.profile.persons",
      config: {
        title: "persons",
        url: "/persons",
        templateUrl: 'src/contacts/company/persons/view.html',
        controller: 'ContactsCompanyPersonsController',
      },
    }, {
      state: "app.contacts.company.profile.events",
      config: {
        title: "events",
        url: "/events",
        templateUrl: 'src/contacts/company/events/view.html',
        controller: 'ContactsCompanyEventsController',
      },
    }, {
      state: "app.contacts.company.profile.transactions",
      config: {
        title: "transactions",
        url: "/transactions",
        templateUrl: 'src/contacts/company/transactions/view.html',
        controller: 'ContactsCompanyTransactionsController',
      },
    }, {
      state: "app.contacts.company.profile.files",
      config: {
        title: "files",
        url: "/files",
        templateUrl: 'src/contacts/company/files/view.html',
        controller: 'ContactsCompanyFilesController',
      },
    }];
  }

}());
