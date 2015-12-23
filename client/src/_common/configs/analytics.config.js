/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .config(LocationConfig);

  /* @ngInject */
  function LocationConfig($analyticsProvider) {
    $analyticsProvider.developerMode(APP.debug);
  }

}());
