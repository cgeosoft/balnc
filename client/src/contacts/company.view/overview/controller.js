(function() {
    'use strict';

    angular
        .module('app.contacts')
        .controller("ContactsCompanyOverviewController", ContactsCompanyOverviewController);

    /* @ngInject */
    function ContactsCompanyOverviewController($stateParams, Company) {
        var vm = this;

        activate();

        function activate() {
            _loadCompany();
        }

        function _loadCompany() {
            vm.loading = true;
            return Company
                .findById({
                    id: $stateParams.id,
                    filter: {
                        include: ["persons"],
                    }
                })
                .$promise
                .then(function(data) {
                    vm.Company = data;
                })
                .finally(function() {
                    vm.loading = false;
                });
        }

    }

}());
