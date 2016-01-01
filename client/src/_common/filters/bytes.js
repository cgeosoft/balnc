/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('bytes', bytes)

  /* @ngInject */
  function bytes() {
    return function(bytes, precision) {
      if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
      if (bytes === 0) return 'Empty';
      if (typeof precision === 'undefined') precision = 1;
      var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
        number = (Math.floor(Math.log(bytes) / Math.log(1024)));
      return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
  }
}());
