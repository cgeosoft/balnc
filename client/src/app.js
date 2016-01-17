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

    'app.auth',
    'app.dashboard',
    'app.contacts',
    'app.files',
    'app.settings',
    'app._common',
  ]);

}());
