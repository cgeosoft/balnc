/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .provider('configHelper', configHelperProvider);

  /* @ngInject */
  function configHelperProvider() {
    /* jshint validthis:true */
    this.$get = ConfigHelper;

    // $locationProvider.html5Mode(true);

    ConfigHelper.$inject = [];

    function ConfigHelper() {

      var service = {
        notifyConfig: notifyConfig
      };

      return service;

      //function notifyConfig() {}
      function notifyConfig(configName, message) {
        message = message || {};
        console.log("%c CONFIG - " + configName + " ", 'background: #9C27B0; color: #FFF', message);
      }

    }

  }

}());
