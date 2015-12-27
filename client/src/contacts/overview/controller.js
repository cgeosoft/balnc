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
      _getAccessed();
    }

    function _getAccessed() {
      vm.loading_accessed = true;
      Company.find({
          filter: {
            limit: 10,
            order: "lastAccess DESC",
          }
        })
        .$promise
        .then(function(_companies) {
          vm.accessed = _companies;
        })
        .finally(function() {
          vm.loading_accessed = false;
        });
    }

  }

}());
