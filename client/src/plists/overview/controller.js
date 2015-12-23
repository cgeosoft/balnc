(function() {
  'use strict';

  angular
    .module('app.plists')
    .controller('PlistsController', PlistsController);

  /* @ngInject */
  function PlistsController(PlistsService, PlistsModals) {

    var vm = this;

    vm.AddPlist = AddPlist;
    vm.ViewPlist = ViewPlist;
    vm.LoadPlists = LoadPlists;

    activate();

    function activate() {
      vm.LoadPlists();
    }

    function LoadPlists(params) {
      vm.loading = true;
      PlistsService
        .GetPlists(params)
        .then(function(plists) {
          vm.Plists = plists;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function AddPlist() {
      PlistsModals
        .PlistForm()
        .then(function() {
          vm.LoadPlists();
        });
    }

    function ViewPlist(id) {
      PlistsModals
        .PlistForm({
          ID: id
        })
        .then(function() {
          vm.LoadPlists();
        });
    }

  }
})();
