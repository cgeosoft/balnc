(function() {
  'use strict';

  angular
    .module('app.contacts')
    .constant("DataFilters", {
      one_month: {
        alias: "one_month",
        label: "+-1 Month",
        value: {
          // date
        },
      },
      three_months: {
        alias: "three_months",
        label: "+-3 Months",
        value: {
          // date
        },
      },
      all: {
        alias: "all",
        label: "All Transactions",
        value: false,
      }
    })
    .constant("ChartGroups", {
      daily: {
        alias: "daily",
        label: "Daily",
        value: "DD/MM/YYYY",
      },
      weekly: {
        alias: "weekly",
        label: "Weekly",
        value: "[W]ww MM/YYYY",
      },
      monthly: {
        alias: "monthly",
        label: "Monthly",
        value: "MM/YYYY",
      }
    })

})();
