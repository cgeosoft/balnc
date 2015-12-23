(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.lotteries',
      config: {
        abstract: true,
        template: '<ui-view/>',
      }
    }, {
      state: 'app.lotteries.overview',
      config: {
        url: '/',
        controller: "LotteriesController",
        templateUrl: 'src/lotteries/overview/view.html',
      }
    }, {
      state: 'app.lotteries.lottery',
      config: {
        url: '/lottery/:ID',
        controller: "LotteryController",
        templateUrl: 'src/lotteries/lottery/view.html',
      }
    }];
  }

}());
