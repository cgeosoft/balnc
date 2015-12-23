(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller('LotteryController', LotteryController);

  /* @ngInject */
  function LotteryController($state, LotteriesService, $stateParams) {
    var vm = this;

    vm.LoadLottery = LoadLottery;
    vm.DeleteLottery = DeleteLottery;

    activate();

    function activate() {
      vm.LoadLottery();
    }

    function LoadLottery() {
      vm.loading = true;
      LotteriesService
        .GetLottery($stateParams.ID)
        .then(function(data) {
          vm.Lottery = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function DeleteLottery() {
      vm.loading = true;
      LotteriesService
        .DeleteLottery(vm.Lottery.id)
        .then(function() {
          $state.go("app.lotteries.overview");
        });
    }

  }
})();
