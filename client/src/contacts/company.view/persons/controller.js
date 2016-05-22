(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyPersonsController", ContactsCompanyPersonsController);

  /* @ngInject */
  function ContactsCompanyPersonsController($stateParams,Person) {
    var vm = this;

    activate();

    function activate() {
      _loadPersons();
    }

    function _loadPersons() {
      vm.loading = true;
      return Person
        .find({
          filter: {
            where: {
              companyId: $stateParams.id,
            },
            order: "fullname ASC",
          }
        })
        .$promise
        .then(function(data) {
          vm.Persons = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

  }

}());
