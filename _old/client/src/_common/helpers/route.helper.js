
(function() {
  'use strict';

  angular
    .module('app._common')
    .provider('routerHelper', routerHelperProvider);

  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    this.$get = RouterHelper;

    // $locationProvider.html5Mode(true);

    RouterHelper.$inject = ['$state'];

    function RouterHelper($state) {
      var hasOtherwise = false;

      var service = {
        configureStates: configureStates,
        getStates: getStates
      };

      return service;

      function configureStates(states, otherwisePath) {
        states.forEach(function(state) {

          var config = {
            controllerAs: 'vm',
          };

          angular.extend(config, state.config);

          if (config.views) {
            _.each(config.views, function(item) {
              item.controllerAs = 'vm';
            });
          }

          $stateProvider.state(state.state, config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function getStates() {
        return $state.get();
      }
    }
  }

}());
