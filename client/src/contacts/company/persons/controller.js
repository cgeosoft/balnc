(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyPersonsController", ContactsCompanyPersonsController);

  /* @ngInject */
  function ContactsCompanyPersonsController(CompanyData) {
    var vm = this;

    activate();

    function activate() {
      vm.Persons = CompanyData.persons;
    }

  }

}());
