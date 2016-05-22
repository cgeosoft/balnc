
(function() {
  'use strict';

  angular
    .module('app.static')
    .run(RoutesConfig);

  /* @ngInject */
  function RoutesConfig(configHelper, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.static',
      config: {
        abstract: true,
        url: "/stat",
        template: '<ui-view/>',
      }
    }, {
      state: 'app.static.help',
      config: {
        title: 'Help',
        url: "/help",
        templateUrl: 'src/static/pages/help.html',
      }
    }, {
      state: 'app.static.terms',
      config: {
        title: 'Terms of Use',
        url: "/terms",
        templateUrl: 'src/static/pages/terms.html',
      }
    }];
  }

}());
