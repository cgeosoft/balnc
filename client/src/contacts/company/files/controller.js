(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyFilesController", ContactsCompanyFilesController);

  /* @ngInject */
  function ContactsCompanyFilesController($stateParams, Container, FilesModals) {
    var vm = this;

    vm.container = $stateParams.id;
    vm.UploadFiles = UploadFiles;
    // vm.Download = Download;

    activate();

    function activate() {
      _loadFiles();
    }

    function UploadFiles() {
      FilesModals
        .AddFiles({
          Label: "Company",
          Container: vm.container
        })
        .then(function() {
          _loadFiles();
        });
    }

    //
    // function Download(file) {
    //   Container
    //     .download({
    //       container: vm.container,
    //       file: file,
    //     })
    //     .$promise
    //     .then(function(data) {
    //       console.log(data);
    //     });
    // }

    function _loadFiles() {
      vm.loading = true;
      return Container
        .getFiles({
          container: vm.container,
        })
        .$promise
        .then(function(data) {
          vm.Files = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }


  }

}());
