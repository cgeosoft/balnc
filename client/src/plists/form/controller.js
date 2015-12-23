(function() {
  'use strict';

  angular
    .module('app.plists')
    .controller("PlistFormController", PlistFormController);

  /* @ngInject */
  function PlistFormController($modalInstance, ModalParams, PlistsService) {
    var vm = this;

    vm.Plist = {
      id: ModalParams.ID || null,
      Participants: [],
    };

    vm.Save = Save;
    vm.Delete = Delete;

    activate();

    function activate() {
      if (vm.Plist.id) {
        vm.loading = true;
        PlistsService
          .GetPlist(vm.Plist.id)
          .then(function(data) {
            vm.Plist = data;
          })
          .finally(function() {
            vm.loading = false;
          });
      }
    }

    function Save() {
      vm.loading = true;
      PlistsService
        .SavePlist(vm.Plist)
        .then(function() {
          vm.loading = false;
          $modalInstance.close();
        });
    }


    function Delete() {
      vm.loading = true;
      PlistsService
        .DeletePlist(vm.Plist.id)
        .then(function() {
          vm.loading = false;
          $modalInstance.close();
        });
    }


  }

}());
