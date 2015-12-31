(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyTransactionsController", ContactsCompanyTransactionsController);

  /* @ngInject */
  function ContactsCompanyTransactionsController($stateParams, Transaction) {

    var vm = this;

    activate();

    function activate() {
      _loadTransactions()
        .then(function() {
          _reloadChart();
        });
    }

    function _loadTransactions() {
      vm.loading = true;
      return Transaction
        .find({
          filter: {
            where: {
              companyId: $stateParams.id,
            },
            order: "date ASC",
          }
        })
        .$promise
        .then(function(data) {
          var _total = 0;
          _.each(data, function(transaction) {
            _total += transaction.amount;
            transaction.total = _total;
          });
          vm.Transactions = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function _reloadChart(groupby) {

      vm.Chart = {
        labels: [],
        data: [
          []
        ],
      };

      var grouped_transactions = _.groupBy(vm.Transactions, function(transaction) {
        return moment(transaction.date).format(groupby || '[W]ww MM/YYYY');
      });

      _.each(grouped_transactions, function(transactions, keydate) {

        var _date_total = _.reduce(transactions, function(total, transaction) {
          return Math.round(transaction.amount + total);
        }, 0);
        vm.Chart.labels.push(keydate);
        vm.Chart.data[0].push(_date_total);
      });
      
    }

  }

}());
