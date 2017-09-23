(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyController", ContactsCompanyController);

  /* @ngInject */
  function ContactsCompanyController($stateParams, Company, CompanyTabs, CompanyModals) {
    var vm = this;

    vm.Tabs = CompanyTabs;

    vm.EditLogo = EditLogo;

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

    function EditLogo() {
      
      CompanyModals
        .EditLogo({
          Company: vm.Company
        });
    }


  }

}());
