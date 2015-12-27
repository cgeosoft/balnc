(function() {
  'use strict';

  angular.module('app', [

    'ngResource',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'ui.navbar',

    'lbServices',

    'app.auth',
    'app.dashboard',
    'app.contacts',
    // 'app.plists',
    // 'app.settings',
    'app._common',
  ]);

}());
