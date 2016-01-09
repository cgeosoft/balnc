(function() {
  'use strict';

  angular
    .module('app.contacts')
    .constant("CompanyTabs", [{
      heading: {
        icon: "bars",
        title: 'Overview'
      },
      route: 'app.contacts.company.profile.overview',
    }, {
      heading: {
        icon: "calendar",
        class: "hidden-xs",
        title: 'Events'
      },
      route: 'app.contacts.company.profile.events',
    }, {
      heading: {
        icon: "money",
        class: "hidden-xs",
        title: 'Transactions'
      },
      route: 'app.contacts.company.profile.transactions',
    }, {
      heading: {
        icon: "files-o",
        class: "hidden-xs",
        title: 'Files'
      },
      route: 'app.contacts.company.profile.files',
    }]);


}());
