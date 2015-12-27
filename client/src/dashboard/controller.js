(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller("DashboardController", DashboardController);

  /* @ngInject */
  function DashboardController() {
    var vm = this;

    activate();

    function activate() {
      vm.news = _.sortBy([{
        "date": "Mon Dec 14 2015 21:45:38 GMT+0000",
        "content": "Tempor ut qui non mollit qui.",
        "title": "ea enim veniam laboris ullamco",
        "url": "http://google.com"
      }, {
        "date": "Sun Dec 06 2015 21:45:38 GMT+0000",
        "content": "Officia id nulla nulla id ipsum minim.",
        "title": "cillum aute deserunt labore est",
        "url": "http://google.com"
      }, {
        "date": "Tue Dec 08 2015 21:45:38 GMT+0000",
        "content": "Ullamco ut voluptate aliqua laboris nostrud.",
        "title": "velit occaecat adipisicing tempor sit",
        "url": "http://google.com"
      }, {
        "date": "Fri Dec 11 2015 21:45:38 GMT+0000",
        "content": "Ipsum nisi non adipisicing ex aute veniam.",
        "title": "non do ipsum et cillum",
        "url": "http://google.com"
      }], 'date');
    }


  }

}());
