
(function() {
  'use strict';

  angular
    .module('app.files')
    .factory('FilesModals', FilesModals);

  FilesModals.$inject = ['modalHelper'];

  function FilesModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "AddFiles",
        config: {
          templateUrl: 'src/files/add/view.html',
          controller: "FilesAddController",
          size:"md",
        }
      }];
    }
  }

}());
