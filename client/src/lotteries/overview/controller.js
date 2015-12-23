(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller('LotteriesController', LotteriesController);

  /* @ngInject */
  function LotteriesController($state, LotteriesService, LotteriesModals) {
    var vm = this;

    vm.AddLottery = AddLottery;
    vm.LoadLotteries = LoadLotteries;

    activate();

    function activate() {
      vm.LoadLotteries();
    }

    function LoadLotteries() {
      vm.loading = true;
      return LotteriesService
        .GetLotteries()
        .then(function(data) {
          vm.Lotteries = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function AddLottery() {
      LotteriesModals
        .LotteryInit()
        .then(function(id) {
          if (id) {
            $state.go("app.lotteries.lottery", {
              ID: id
            });
          }
        });
    }

  }
})();
