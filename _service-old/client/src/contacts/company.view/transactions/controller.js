(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyTransactionsController", ContactsCompanyTransactionsController);

  /* @ngInject */
  function ContactsCompanyTransactionsController(
    $stateParams,
    Transaction,
    DataFilters,
    ChartGroups) {

    var vm = this;

    vm.filter = {
      where: {
        companyId: $stateParams.id,
      },
      order: "date ASC",
    }

    vm.chart = {
      labels: [],
      data: [
        []
      ],
      params: {
        group: "weekly",
      },
      options: {
        bezierCurve: false,
        datasetFill: false,
      }
    };

    vm.params = {
      filter: "one_month",
    }

    vm.DataFilters = DataFilters;
    vm.ChartGroups = ChartGroups;

    vm.LoadTransactions = LoadTransactions;
    vm.ReloadChart = ReloadChart;
    activate();

    function activate() {
      vm.LoadTransactions();
    }

    function LoadTransactions() {
      vm.loading = true;

      return Transaction
        .find({
          filter: vm.filter
        })
        .$promise
        .then(function(data) {
          var _total = 0;
          _.each(data, function(transaction) {
            _total += transaction.amount;
            transaction.total = _total;
          });
          vm.Transactions = data;
          vm.ReloadChart();
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function ReloadChart() {
      console.log(vm.chart.params.group);
      vm.chart.labels = [];
      vm.chart.data[0] = [];
      var grouped_transactions = _.groupBy(vm.Transactions, function(transaction) {
        return moment(transaction.date).format(ChartGroups[vm.chart.params.group].value);
      });

      _.each(grouped_transactions, function(transactions, keydate) {
        var _date_total = _.reduce(transactions, function(total, transaction) {
          return Math.round(transaction.amount + total);
        }, 0);
        vm.chart.labels.push(keydate);
        vm.chart.data[0].push(_date_total);
      });

    }

  }

}());
