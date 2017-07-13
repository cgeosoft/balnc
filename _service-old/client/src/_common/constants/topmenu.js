
(function() {
  'use strict';

  angular
    .module('app._common')
    .constant("topmenu", [{
      name: "States",
      link: "#",
      subtree: [{
        name: "state 1",
        link: "state1"
      }, {
        name: "state 2",
        link: "state2"
      }]
    }])

}());
