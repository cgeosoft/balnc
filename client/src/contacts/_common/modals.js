/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.contacts')
    .factory('ContactsModals', ContactsModals);

  ContactsModals.$inject = ['modalHelper'];

  function ContactsModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "AddPerson",
        config: {
          templateUrl: 'src/contacts/addperson/view.html',
          controller: "ContactsAddPersonController",
          size:"sm",
        }
      }, {
        modal: "AddCompany",
        config: {
          templateUrl: 'src/contacts/addcompany/view.html',
          controller: "ContactsAddCompanyController",
          size:"sm",
        }
      }, {
        modal: "AddEvent",
        config: {
          templateUrl: 'src/contacts/addevent/view.html',
          controller: "ContactsAddEventController",
        }
      }, {
        modal: "ExportImport",
        config: {
          templateUrl: 'src/contacts/exportimport/view.html',
          controller: "ContactsExportImportController",
        }
      }];
    }
  }

}());
