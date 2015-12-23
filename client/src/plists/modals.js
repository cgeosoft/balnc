/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.plists')
    .factory('PlistsModals', PlistsModals);

  PlistsModals.$inject = ['modalHelper'];

  function PlistsModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "PlistForm",
        config: {
          templateUrl: 'src/plists/form/view.html',
          controller: "PlistFormController",
          size: "md",
          backdrop: 'static',
        }
      }];
    }
  }

}());
