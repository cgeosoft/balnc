(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyController", ContactsCompanyController);

  /* @ngInject */
  function ContactsCompanyController($stateParams, Company) {
    var vm = this;

    vm.Tabs = [{
      heading: {
        icon: "bars",
        title: 'Info'
      },
      route: 'app.contacts.company.info',
      params: {
        class: "visible-xs visible-sm",
      }
    }, {
      heading: {
        icon: "bell-o",
        class: "hidden-xs",
        title: 'Overview'
      },
      route: 'app.contacts.company.overview',
    }, {
      heading: {
        icon: "calendar",
        class: "hidden-xs",
        title: 'Events'
      },
      route: 'app.contacts.company.events',
    }, {
      heading: {
        icon: "users",
        class: "hidden-xs",
        title: 'Persons'
      },
      route: 'app.contacts.company.persons',
    }, {
      heading: {
        icon: "money",
        class: "hidden-xs",
        title: 'Transactions'
      },
      route: 'app.contacts.company.transactions',
    }, {
      heading: {
        icon: "files-o",
        class: "hidden-xs",
        title: 'Files'
      },
      route: 'app.contacts.company.files',
    }];

    activate();

    function activate() {
      vm.Company = Company.findById({
        id: $stateParams.id,
      });
    }


  }

}());
