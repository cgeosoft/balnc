(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyFilesController", ContactsCompanyFilesController);

  /* @ngInject */
  function ContactsCompanyFilesController($stateParams) {
    var vm = this;

    activate();

    function activate() {
    }

  }

}());
