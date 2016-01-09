(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyOverviewController", ContactsCompanyOverviewController);

  /* @ngInject */
  function ContactsCompanyOverviewController() {
    var vm = this;

    activate();

    function activate() {
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
