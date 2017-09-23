(function() {
    'use strict';

    angular
        .module('app._common')
        .directive('pushMenu', pushMenu);

    pushMenu.$inject = ['$window', '$document'];

    function pushMenu($window, $document) {

        var screenSizes = {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        };

        var directive = {
            restrict: "A",
            link: link
        };

        return directive;

        function link(scope, element, attrs) {

            var _body = angular.element($document[0].body);

            element.bind("click", function() {

                if ($window.innerWidth > (screenSizes.sm - 1)) {
                    if (_body.hasClass('sidebar-collapse')) {
                        _body
                            .removeClass('sidebar-collapse');
                    } else {
                        _body
                            .addClass('sidebar-collapse');
                    }
                } else {
                    if (_body.hasClass('sidebar-open')) {
                        _body
                            .removeClass('sidebar-open')
                            .removeClass('sidebar-collapse');
                    } else {
                        _body
                            .addClass('sidebar-open');
                    }
                }

            });

        }

    }

}());
