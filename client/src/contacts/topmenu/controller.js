(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsTopMenuController", ContactsTopMenuController);

  /* @ngInject */
  function ContactsTopMenuController($state, ContactsModals) {
    var vm = this;

    vm.AddCompany = AddCompany;
    vm.AddPerson = AddPerson;
    vm.AddEvent = AddEvent;
    vm.ExportImport = ExportImport;

    activate();

    function activate() {

    }

    function AddCompany() {
      ContactsModals
        .AddCompany()
        .then(function(response) {
          $state.go("app.contacts.company", {
            id: response.id
          });
        });
    }

    function AddPerson() {
      ContactsModals
        .AddPerson()
        .then(function(response) {
          $state.go("app.contacts.person", {
            id: response.id
          });
        });
    }

    function AddEvent() {
      ContactsModals
        .AddEvent()
        .then(function(response) {
          $state.go("app.contacts.events.event", {
            id: response.id
          });
        });
    }

    function ExportImport() {
      ContactsModals
        .ExportImport()
        .then(function() {});
    }

  }

}());
