/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .directive('ngPrint', ngPrint)

  /* @ngInject */
  function ngPrint() {
    var printSection = document.getElementById('printSection');
    // if there is no printing section, create one
    if (!printSection) {
      printSection = document.createElement('div');
      printSection.id = 'printSection';
      document.body.appendChild(printSection);
    }

    function link(scope, element, attrs) {

      element.on('click', function() {
        var elemToPrint = document.getElementById(attrs.printElementId);
        if (elemToPrint) {
          printElement(elemToPrint);
        }
      });

      var beforePrint = function() {
        console.log('Functionality to run before printing.');
      };
      var afterPrint = function() {
        console.log('Functionality to run after printing');
        printSection.innerHTML = '';
      };

      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
          if (mql.matches) {
            beforePrint();
          } else {
            afterPrint();
          }
        });
      }

      window.onbeforeprint = beforePrint;
      window.onafterprint = afterPrint;

    }

    function printElement(elem) {
      // clones the element you want to print
      var domClone = elem.cloneNode(true);
      printSection.appendChild(domClone);
      window.print();
    }
    return {
      link: link,
      restrict: 'A'
    };
  }

}());
