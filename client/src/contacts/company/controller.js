(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyController", ContactsCompanyController);

  /* @ngInject */
  function ContactsCompanyController($stateParams, Company) {
    var vm = this;

    activate();

    function activate() {
      _loadCompany();
    }

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
          var _total=0;
          _.each(data.transactions, function(transaction, index, list) {
            _total += transaction.amount;
            console.log(_total);
            transaction.total = _total;
          });
          // console.log(data.transactions);
          vm.Company = data;
        });
    }

  }

}());
