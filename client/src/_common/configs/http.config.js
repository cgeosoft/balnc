
(function() {
  'use strict';

  angular
    .module('app._common')
    .config(LocationConfig);

  /* @ngInject */
  function LocationConfig($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

}());
