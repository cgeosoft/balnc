(function() {
  'use strict';

  angular
    .module('app.invoices')
    .controller("InvoicesOverviewController", InvoicesOverviewController);

  /* @ngInject */
  function InvoicesOverviewController(Invoice) {
    var vm = this;

    activate();

    function activate() {
      Invoice.find({
          filter: {
            limit: 10,
            order: "date DESC",
          }
        })
        .$promise
        .then(function(_invoices) {
          vm.invoices = _invoices;
        })
        .finally(function() {

        });
    }


  }

}());
