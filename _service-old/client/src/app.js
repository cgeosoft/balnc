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
    'angularFileUpload',

    'lbServices',

    'app.appusers',
    'app.auth',
    'app.contacts',
    'app.dashboard',
    'app.files',
    'app.settings',
    'app.static',
    'app.invoices',
    'app._common',
  ]);

}());
