/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .factory('LotteriesModals', LotteriesModals);

  LotteriesModals.$inject = ['modalHelper'];

  function LotteriesModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "LotteryInit",
        config: {
          templateUrl: 'src/lotteries/init/view.html',
          controller: "LotteryInitController",
          size: "sm"
        }
      }];
    }
  }

}());
