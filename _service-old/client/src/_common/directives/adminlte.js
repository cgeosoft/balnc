(function() {
    'use strict';

    angular
        .module('app._common')
        .directive('contentWrapper', contentWrapper);

    /* @ngInject */
    function contentWrapper($window, $timeout) {

        var directive = {
            restrict: "C",
            link: link
        };

        return directive;

        function link(scope, wrapper, attrs) {

            fix(wrapper);

            angular.element($window)
                .bind('resize', function() {
                    fix(wrapper);
                });

        }

        function fix(element) {
            var window_height = window.innerHeight;
            var footer_height = 77;

            element.css({
                height: window_height - footer_height + "px"
            });

        }

    }

}());
