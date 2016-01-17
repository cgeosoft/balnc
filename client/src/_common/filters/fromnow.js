/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('fromNow', fromNow)

  /* @ngInject */
  function fromNow() {
    return function(date) {
      return moment(date).fromNow();
    }
  }

}());
