(function() {
  'use strict';

  angular
    .module('app.files')
    .controller("FilesAddController", FilesAddController);

  /* @ngInject */
  function FilesAddController($uibModalInstance, ModalParams, FileUploader) {
    var vm = this;

    vm.Label = ModalParams.Label;
    vm.Container = ModalParams.Container;

    vm.Upload = Upload;

    activate();

    function activate() {}


    function Upload() {}

    var uploader = vm.uploader = new FileUploader({
      vm: vm, // to automatically update the html. Default: $rootScope
      url: '/api/containers/'+vm.Container+'/upload',
      formData: [{
        key: 'value'
      }]
    });

    // ADDING FILTERS
    uploader.filters.push({
      name: 'filterName',
      fn: function(item, options) { // second user filter
        console.info('filter2');
        return true;
      }
    });

    // REGISTER HANDLERS
    // --------------------
    uploader.onAfterAddingFile = function(item) {
      console.info('After adding a file', item);
    };
    // --------------------
    uploader.onAfterAddingAll = function(items) {
      console.info('After adding all files', items);
    };
    // --------------------
    uploader.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('When adding a file failed', item);
    };
    // --------------------
    uploader.onBeforeUploadItem = function(item) {
      console.info('Before upload', item);
    };
    // --------------------
    uploader.onProgressItem = function(item, progress) {
      console.info('Progress: ' + progress, item);
    };
    // --------------------
    uploader.onProgressAll = function(progress) {
      console.info('Total progress: ' + progress);
    };
    // --------------------
    // uploader.onSuccessItem = function(item, response, status, headers) {
    //   console.info('Success', response, status, headers);
    //   vm.$broadcast('uploadCompleted', item);
    // };
    // --------------------
    uploader.onErrorItem = function(item, response, status, headers) {
      console.info('Error', response, status, headers);
    };
    // --------------------
    uploader.onCancelItem = function(item, response, status, headers) {
      console.info('Cancel', response, status);
    };
    // --------------------
    uploader.onCompleteItem = function(item, response, status, headers) {
      console.info('Complete', response, status, headers);
    };
    // --------------------
    uploader.onCompleteAll = function() {
      console.info('Complete all');
    };

  }

}());
