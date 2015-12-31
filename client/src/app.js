(function() {
  'use strict';

  angular.module('app', [

    'ngResource',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'ui.router.tabs',
    'ui.navbar',
    'chart.js',

    'lbServices',

    'app.auth',
    'app.dashboard',
    'app.contacts',
    // 'app.plists',
    // 'app.settings',
    'app._common',
  ]);

}());
