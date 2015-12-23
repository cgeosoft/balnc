/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .factory('LotteriesService', LotteriesService);

  /* @ngInject */
  function LotteriesService($resource, Lottery) {

    var service = {
      GetLotteries: GetLotteries,
      GetLottery: GetLottery,
      SaveLottery: SaveLottery,
      DeleteLottery: DeleteLottery,
    }

    return service;

    function GetLotteries(params) {
      var params = params || {};
      return Lottery
        .find({
          filter: {
            order: params.order || "CreatedAt DESC",
          },
        })
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function GetLottery(id) {
      return Lottery
        .findById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });
    }

    function SaveLottery(lottery) {

      lottery.DrewAt = new Date();
      lottery.Participants = _.shuffle(lottery.Participants);
      
      return Lottery
        .create(lottery)
        .$promise
        .then(function(item) {
          return item;
        });

    }

    function DeleteLottery(id) {

      return Lottery
        .deleteById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });

    }

  }
}());
