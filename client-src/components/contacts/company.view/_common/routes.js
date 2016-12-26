(function () {
  'use strict'

  angular
        .module('app.contacts')
        .run(RoutesConfig)

    /* @ngInject */
  function RoutesConfig (configHelper, routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [{
      state: 'app.contacts.company',
      config: {
        abstract: true,
        url: '/company/:id',
        templateUrl: 'contacts/company.view/_common/_layout.html',
        controller: 'ContactsCompanyController'
      }
    }, {
      state: 'app.contacts.company.overview',
      config: {
        title: 'overview',
        url: '/overview',
        templateUrl: 'contacts/company.view/overview/view.html',
        controller: 'ContactsCompanyOverviewController'
      }
    }, {
      state: 'app.contacts.company.persons',
      config: {
        title: 'persons',
        url: '/persons',
        templateUrl: 'contacts/company.view/persons/view.html',
        controller: 'ContactsCompanyPersonsController'
      }
    }, {
      state: 'app.contacts.company.events',
      config: {
        title: 'events',
        url: '/events',
        templateUrl: 'contacts/company.view/events/view.html',
        controller: 'ContactsCompanyEventsController'
      }
    }, {
      state: 'app.contacts.company.transactions',
      config: {
        title: 'transactions',
        url: '/transactions',
        templateUrl: 'contacts/company.view/transactions/view.html',
        controller: 'ContactsCompanyTransactionsController'
      }
    }, {
      state: 'app.contacts.company.files',
      config: {
        title: 'files',
        url: '/files',
        templateUrl: 'contacts/company.view/files/view.html',
        controller: 'ContactsCompanyFilesController'
      }
    }, {
      state: 'app.contacts.company.map',
      config: {
        title: 'map',
        url: '/map',
        templateUrl: 'contacts/company.view/map/view.html',
        controller: 'ContactsCompanyMapController'
      }
    }]
  }
}())
