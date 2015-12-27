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
      vm.Company = Company.findById({
        id: $stateParams.id,
        filter: {
          include: "persons"
        }
      });
    }

  }

}());
