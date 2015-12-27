(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsOverviewController", ContactsOverviewController);

  /* @ngInject */
  function ContactsOverviewController(Company) {
    var vm = this;

    activate();

    function activate() {
      getCompanies();
    }

    function getCompanies() {
      vm.loading = true;
      Company.find({
          filter: {
            limit: 10,
            include: 'persons',
          }
        })
        .$promise
        .then(function(_companies) {
          vm.companies = _companies;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

  }

}());
