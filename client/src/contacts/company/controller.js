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

    vm.Print = function() {
      var docDefinition = {
        content: 'ελλάδα Ά an sample PDF printed with pdfMakeThis is an sample PDF printed with pdfMakeThis is an sample PDF printed with pdfMake'
      };
      // or become pretty complex (having multi-level tables, images, lists, paragraphs, margins, styles etc...).
      //
      // As soon as you have the document-definition-object, you're ready to create and open/print/download the PDF:

      // open the PDF in a new window
      pdfMake.createPdf(docDefinition).open();

      // print the PDF (temporarily Chrome-only)
      // pdfMake.createPdf(docDefinition).print();

      // download the PDF (temporarily Chrome-only)
      // pdfMake.createPdf(docDefinition).download('optionalName.pdf');
    }

    activate();

    function activate() {
      vm.Company = Company.findById({
        id: $stateParams.id,
      });
    }


  }

}());
