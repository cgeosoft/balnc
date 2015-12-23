/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('numberFixedLen', numberFixedLen)

  numberFixedLen.$inject = []

  function numberFixedLen() {
    return function(a, b) {
      return (1e4 + a + "").slice(-b)
    }
  }
}());
