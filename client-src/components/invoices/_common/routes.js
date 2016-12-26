(function () {
  'use strict'

  angular
        .module('app.invoices')
        .run(RoutesConfig)

    /* @ngInject */
  function RoutesConfig (configHelper, routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [{
      state: 'app.invoices',
      config: {
        abstract: true,
        url: '/invoices',
        template: '<ui-view/>'
      }
    }, {
      state: 'app.invoices.overview',
      config: {
        title: 'Invoices Dashboard',
        url: '/',
        templateUrl: 'invoices/overview/view.html',
        controller: 'InvoicesOverviewController'
      }
    }, {
      state: 'app.invoices.invoice',
      config: {
        title: 'Invoice Preview',
        url: '/',
        templateUrl: 'invoices/invoice/view.html',
        controller: 'InvoicesInvoiceController'
      }
    }]
  }
}())
