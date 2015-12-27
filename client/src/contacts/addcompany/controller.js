(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsAddCompanyController", ContactsAddCompanyController);

  /* @ngInject */
  function ContactsAddCompanyController($modalInstance, Company) {
    var vm = this;

    vm.Save = Save;

    activate();

    function activate() {
      loadCompanies();
    }

    function loadCompanies() {
      vm.Companies = Company.find({
        filter: {
          order: 'name ASC',
        }
      });
    }

    function Save() {
      Company
        .create(vm.Company)
        .$promise
        .then(function(_company) {
          $modalInstance.close(_company);
        });
    }


  }

}());
