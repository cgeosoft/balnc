(function () {
  'use strict'

  angular
    .module('app.contacts')
    .controller('ContactsAddPersonController', ContactsAddPersonController)

  /* @ngInject */
  function ContactsAddPersonController ($uibModalInstance, ModalParams, Company) {
    var vm = this

    vm.Save = Save

    activate()

    function activate () {
      loadCompanies()
    }

    function loadCompanies () {
      vm.Companies = Company.find({
        filter: {
          order: 'name ASC'
        }
      })
    }

    function Save () {}
  }
}())
