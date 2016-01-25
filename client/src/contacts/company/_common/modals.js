/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.contacts')
    .factory('CompanyModals', CompanyModals);

  CompanyModals.$inject = ['modalHelper'];

  function CompanyModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "EditLogo",
        config: {
          templateUrl: 'src/contacts/company/editlogo/view.html',
          controller: "ContactsCompanyEditLogoController",
          size:"md",
        }
      }];
    }
  }

}());
