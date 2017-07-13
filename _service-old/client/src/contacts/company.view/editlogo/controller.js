(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller("ContactsCompanyEditLogoController", ContactsCompanyEditLogoController);

  /* @ngInject */
  function ContactsCompanyEditLogoController($uibModalInstance, ModalParams, Company, FileUploader) {
    var vm = this;

    vm.Company = ModalParams.Company;
    vm.Uploader = new FileUploader({
      vm: vm,
      url: '/api/Containers/' + vm.Company.id + '/upload',
    });
    vm.Uploader.onCompleteItem = function(item, response, status, headers) {
      vm.Company.logo = '/api/Containers/' + vm.Company.id + '/download/' + item.file.name;
      Company.upsert(vm.Company);
    };
    vm.Uploader.onAfterAddingFile = function(item) {
      // console.info('After adding a file', item);
      // console.info(vm.Uploader.queue);
    };
    vm.Save = Save;

    activate();


    function Upload() {}


    function activate() {

    }

    function Save() {
      vm.Uploader.uploadItem(0);
    }


  }

}());
