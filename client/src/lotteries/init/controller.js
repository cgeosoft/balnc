(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller("LotteryInitController", LotteryInitController);

  /* @ngInject */
  function LotteryInitController($modalInstance, ModalParams, LotteriesService, PlistsService) {
    var vm = this;

    vm.Lottery = {
      Name: "Lottery #" + (new Date()).getTime(),
    };

    vm.LoadPlists = LoadPlists;
    vm.Save = Save;

    activate();

    function activate() {
      vm.LoadPlists();
    }

    function LoadPlists() {
      vm.loading = true;
      PlistsService
        .GetPlists()
        .then(function(data) {
          vm.Plists = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function Save() {
      LotteriesService
        .SaveLottery(vm.Lottery)
        .then(function(resp) {
          $modalInstance.close(resp.id);
        });
    }


  }

}());
