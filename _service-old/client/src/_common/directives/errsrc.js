
(function() {
  'use strict';

  angular
    .module('app._common')
    .directive('errSrc', errSrc)

  /* @ngInject */
  function errSrc() {
    return {
      link: function(scope, element, attrs) {
        if (!attrs.ngSrc) {
          attrs.$set('src', attrs.errSrc);
        }

        element.bind('error', function() {

          if (attrs.errSrc == "REMOVE") {
            element.remove();
            return;
          }
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });

      }
    }
  }

}());
