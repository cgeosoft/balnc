(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyEventsController", ContactsCompanyEventsController);

  /* @ngInject */
  function ContactsCompanyEventsController($stateParams, Event) {
    var vm = this;

    vm.reload = reload;

    vm.params = {
      range: "WEEK",
    };

    var _ranges = {
      "WEEK": {
        from: moment().subtract(7, "days"),
        to: moment().add(7, "days"),
      },
      "HALFMONTH": {
        from: moment().subtract(15, "days"),
        to: moment().add(15, "days"),
      },
      "MONTH": {
        from: moment().subtract(1, "month"),
        to: moment().add(1, "month"),
      }
    };

    activate();

    function activate() {
      _loadEvents();
    }

    function reload() {
      activate();
    }

    function _loadEvents() {
      vm.loading = true;
      return Event
        .find({
          filter: {
            where: {
              date: {
                gt: _ranges[vm.params.range].from,
                lt: _ranges[vm.params.range].to,
              },
              companyId: $stateParams.id,
            },
            order: "date DESC",
          }
        })
        .$promise
        .then(function(data) {
          vm.Events = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }


  }

}());
