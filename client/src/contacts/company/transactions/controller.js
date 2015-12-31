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
          _rangeDeploy();
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
            _total = parseFloat(_total) + parseFloat(transaction.amount);
            _total = _total.toFixed(2);
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
          var _val = transaction.amount + parseFloat(total);
          return _val.toFixed(2);
        }, 0);
        vm.Chart.labels.push(keydate);
        vm.Chart.data[0].push(_date_total);
      });

    }

    function _rangeDeploy() {
      var _start = moment(_.first(vm.Transactions).date);
      var _now = moment();
      var _range = [];
      vm.Chart2 = {
        labels: [],
        data: [
          []
        ],
      };

      var _iter = _start;
      do {
        _range.push({
          timestamp: _iter.startOf('day').unix(),
          ISO: _iter.startOf('day').toISOString(),
          transactions: [],
        });
        _iter = _.clone(_iter.add(7, "days"));
      } while (_iter.diff(_now) < 0);


      _.each(vm.Transactions, function(transaction) {

        var _transaction_date = moment(transaction.date).unix();
        for (var i = 0; i < _range.length; i++) {
          var _next_timestamp = moment().unix();
          if (_range[i + 1]) {
            var _next_timestamp = _range[i + 1].timestamp;
          }
          if (_transaction_date >= _range[i].timestamp && _transaction_date < _next_timestamp) {
            _range[i].transactions.push(transaction);
          }
        }

      })

      for (var i = 0; i < _range.length; i++) {
        var _item = _range[i];

        _item.total = _.reduce(_item.transactions, function(total, transaction) {
          var _val = transaction.amount + parseFloat(total);
          return _val.toFixed(2);
        }, 0);

        var _extra = 0
        if (i > 0) {
          _item.total = parseFloat(_range[i - 1].total) + parseFloat(_item.total);
        }

        vm.Chart2.labels.push(moment.unix(_item.timestamp).format("[W]ww MM/YYYY"));
        vm.Chart2.data[0].push(parseFloat(_item.total).toFixed(2));

      }
      console.log(_range);
    }

  }

}());
