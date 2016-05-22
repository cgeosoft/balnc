
(function() {
  'use strict';

  angular
    .module('app._common')
    .directive('pwCheck', pwCheck)

  /* @ngInject */
  function pwCheck() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function() {
          scope.$apply(function() {
            var v = elem.val() === $(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }

}());
