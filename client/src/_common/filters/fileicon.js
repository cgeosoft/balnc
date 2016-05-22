
(function() {
  'use strict';

  angular
    .module('app._common')
    .filter('fileicon', fileicon)

  /* @ngInject */
  function fileicon() {
    var _icons = {
      "application/pdf": "fa-file-pdf-o",
      "application/powerpoint": "fa-file-powerpoint-o",
      "application/x-msword": "fa-file-word-o",
      "application/x-msexcel": "fa-file-excel-o",
      "application/x-mspowerpoint": "fa-file-powerpoint-o",
      "audio/x-mpeg-3": "fa-file-audio-o",
      "image/gif": "fa-file-image-o",
      "image/png": "fa-file-image-o",
      "image/tiff": "fa-file-image-o",
      "image/jpeg": "fa-file-image-o",
      "video/avi": "fa-file-video-o",
      "video/mpeg": "fa-file-video-o",
      "video/msvideo": "fa-file-video-o",
      "video/quicktime": "fa-file-video-o",
      "application/zip": "fa-file-zip-o"
    };
    return function(a) {
      return _icons[a] || "fa-file-o";
    }
  }
}());
