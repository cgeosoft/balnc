(function() {
    'use strict';

    angular
        .module('app.contacts')
        .controller("ContactsOverviewController", ContactsOverviewController);

    /* @ngInject */
    function ContactsOverviewController($state, Company, ContactsModals) {
        var vm = this;

        vm.AddCompany = AddCompany;

        activate();

        function activate() {
            _getAccessed();
        }

        function _getAccessed() {
            vm.loading = true;
            Company.find({
                    filter: {
                        limit: 10,
                        order: "lastAccess DESC",
                    }
                })
                .$promise
                .then(function(_companies) {
                    vm.Companies = _companies;
                })
                .finally(function() {
                    vm.loading = false;
                });
        }

        function AddCompany() {
            ContactsModals
                .AddCompany()
                .then(function(response) {
                    $state.go("app.contacts.company", {
                        id: response.id
                    });
                });
        }

    }

}());
