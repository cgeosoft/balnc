(function() {
  'use strict';

  angular
    .module('app._common', [

      'ngResource',
      'ngSanitize',
      'ngCookies',
      'ui.bootstrap',
      'ui.router',
      'toaster',
      'leaflet-directive',
      'angulartics',
      'angulartics.google.analytics'

    ]);
})();
