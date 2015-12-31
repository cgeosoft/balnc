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
    }, {
      state: 'app.contacts.company',
      config: {
        abstract: true,
        url: "/company/:id",
        templateUrl: 'src/contacts/company/view.html',
        controller: 'ContactsCompanyController',
      }
    }, {
      state: "app.contacts.company.info",
      config: {
        title: "info",
        url: "/info",
        templateUrl: 'src/contacts/company/info/view.html',
        controller: 'ContactsCompanyInfoController',
      },
    }, {
      state: "app.contacts.company.overview",
      config: {
        title: "overview",
        url: "/overview",
        templateUrl: 'src/contacts/company/overview/view.html',
        controller: 'ContactsCompanyOverviewController',
      },
    }, {
      state: "app.contacts.company.persons",
      config: {
        title: "persons",
        url: "/persons",
        templateUrl: 'src/contacts/company/persons/view.html',
        controller: 'ContactsCompanyPersonsController',
      },
    }, {
      state: "app.contacts.company.events",
      config: {
        title: "events",
        url: "/events",
        templateUrl: 'src/contacts/company/events/view.html',
        controller: 'ContactsCompanyEventsController',
      },
    }, {
      state: "app.contacts.company.transactions",
      config: {
        title: "transactions",
        url: "/transactions",
        templateUrl: 'src/contacts/company/transactions/view.html',
        controller: 'ContactsCompanyTransactionsController',
      },
    }, {
      state: "app.contacts.company.files",
      config: {
        title: "files",
        url: "/files",
        templateUrl: 'src/contacts/company/files/view.html',
        // controller: 'ContactsCompanyFilesController',
      },
    }];
  }

}());
