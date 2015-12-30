(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyController", ContactsCompanyController);

  /* @ngInject */
  function ContactsCompanyController($stateParams, Company) {
    var vm = this;

    vm.ReloadChart = ReloadChart;

    activate();

    function activate() {
      _loadCompany();
    }

    function ReloadChart(format) {}

    function _loadCompany() {
      Company.findById({
          id: $stateParams.id,
          filter: {
            include: [{
              relation: 'persons',
              scope: {
                order: "fullname ASC"
              }
            }, {
              relation: 'events',
              scope: {
                order: "occuredAt DESC"
              }
            }, {
              relation: 'transactions',
              scope: {
                order: "date ASC"
              }
            }]
          }
        })
        .$promise
        .then(function(data) {
          var _total = 0;
          _.each(data.transactions, function(transaction) {
            _total += transaction.amount;
            transaction.total = _total;
          });
          vm.Company = data;
          vm.ReloadChart();
        });
    }

    function ReloadChart(groupby) {

      vm.transactions_chart = {
        labels: [],
        data: [
          []
        ],
      };

      var grouped_transactions = _.groupBy(vm.Company.transactions, function(transaction) {
        return moment(transaction.date).format(groupby || '[W]ww MM/YYYY');
      });

      _.each(grouped_transactions, function(transactions, keydate) {

        var _date_total = _.reduce(transactions, function(total, transaction) {
          return Math.round(transaction.amount + total);
        }, 0);
        vm.transactions_chart.labels.push(keydate);
        vm.transactions_chart.data[0].push(_date_total);
      });

    }

  }

}());
