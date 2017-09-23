(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyMapController", ContactsCompanyMapController);

  /* @ngInject */
  function ContactsCompanyMapController($stateParams, Company, $timeout) {
    var vm = this;

    activate();

    function activate() {

      vm.loading = true;

      vm.center = {};
      vm.markers = {};

      Company.findById({
          id: $stateParams.id,
        })
        .$promise
        .then(function(company) {
          vm.Company = company;

          $timeout(function() {

            vm.center = {
              lat: parseFloat(company.location.lat),
              lng: parseFloat(company.location.lon),
              zoom: 14,
            };
            vm.markers = {
              company: {
                message: company.name + "<br/><small>" + vm.Company.location.street + "</small>",
                lat: parseFloat(company.location.lat),
                lng: parseFloat(company.location.lon),
                opacity: 0.8,
                focus: true,
              }
            };

            vm.loading = false;

          }, 1000);

        });
    }

  }

}());
