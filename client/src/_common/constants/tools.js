/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .constant("TOOLS", [{
      "alias": "pcdetails",
      "title": "PC Details",
      "icon": "keyboard-o",
      "state": "app.pcdetails",
      "version": "0.1",
    }, {
      "alias": "quakes",
      "title": "Earthquakes Explorer",
      "icon": "bullseye",
      "state": "app.quakes",
      "version": "0.1",
    }, {
      "alias": "clock",
      "title": "Clock Tools",
      "icon": "clock-o",
      "state": "app.clock",
      "version": "0.1",
    }])

}());

// < ul class = "uib-dropdown-menu" >
//   < li > < a ui - sref = "app.pcdetails" > < i class = "fa fa-keyboard-o fa-fw" > < /i> PC Technical Details</a > < /li>
//    < li > < a ui - sref = "app.quakes" > < i class = "fa fa-bullseye fa-fw" > < /i> Earthquakes Map Explorer</a > < /li> < li class = "disabled" >
// < a ui - sref = "app.none" > Clock Tools(alarm, stopwatch) < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Network Tools(speed test, ping, traceroute) < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Screen Share < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Random Data Generators(passwords, lorem, datasets) < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Refenes(Group Expenses Manager) < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Dynamic IP Registry < /a></li >
//   < li class = "disabled" > < a ui - sref = "app.none" > Facebook Cover Generator < /a></li >
