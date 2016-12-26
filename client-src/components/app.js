(function () {
  'use strict'

  angular.module('app', [

    'ngResource',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'ui.router.tabs',
    'angularFileUpload',

    'lbServices',

    'app.register',
    'app.users',
    'app.auth',
    'app.contacts',
    'app.dashboard',
    'app.files',
    'app.settings',
    'app.static',
    'app.invoices',
    'app.config',
    'app.templates',
    'app._common'
  ])
}())
