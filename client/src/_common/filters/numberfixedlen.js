
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('numberFixedLen', numberFixedLen)

  /* @ngInject */
  function numberFixedLen() {
    return function(a, b) {
      return (1e4 + a + "").slice(-b)
    }
  }

}());
