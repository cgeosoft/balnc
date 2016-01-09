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

      vm.leaflet = {
        center: {},
        markers: []
      };

      Company.findById({
          id: $stateParams.id,
        })
        .$promise
        .then(function(company) {
          vm.Company = company;

          $timeout(function() {

            vm.leaflet.center.lat = parseFloat(company.location.lat);
            vm.leaflet.center.lng = parseFloat(company.location.lon);
            vm.leaflet.center.zoom = 14;
            
            vm.leaflet.markers.push({
              message: company.name,
              lat: parseFloat(company.location.lat),
              lng: parseFloat(company.location.lon),
              opacity: 0.8
            });

            vm.loading = false;

          }, 1000);

        });
    }

  }

}());
