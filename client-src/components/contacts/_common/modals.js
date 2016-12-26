(function () {
  'use strict'

  angular
        .module('app.contacts')
        .factory('ContactsModals', ContactsModals)

  ContactsModals.$inject = ['modalHelper']

  function ContactsModals (modalHelper) {
    return modalHelper.configureModals(getModals())

    function getModals () {
      return [{
        modal: 'AddPerson',
        config: {
          templateUrl: 'contacts/person.add/view.html',
          controller: 'ContactsAddPersonController',
          size: 'sm'
        }
      }, {
        modal: 'AddCompany',
        config: {
          templateUrl: 'contacts/company.add/view.html',
          controller: 'ContactsAddCompanyController',
          size: 'sm'
        }
      }, {
        modal: 'AddEvent',
        config: {
          templateUrl: 'contacts/event.add/view.html',
          controller: 'ContactsAddEventController'
        }
      }, {
        modal: 'ExportImport',
        config: {
          templateUrl: 'contacts/exportimport/view.html',
          controller: 'ContactsExportImportController'
        }
      }]
    }
  }
}())
