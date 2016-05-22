
(function() {
  'use strict';

  angular
    .module('app._common')
    .directive('ngConfirmClick', ngConfirmClick)

  /* @ngInject */
  function ngConfirmClick() {
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }

}());
