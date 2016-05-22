
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('join', join)

  /* @ngInject */
  function join() {
    return function(array, separator) {
      if (!array) {
        return '';
      }
      if (!separator) {
        separator = ', ';
      }
      return array.join(separator);
    };
  }
}());
