/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.plists')
    .factory('PlistsService', PlistsService);

  /* @ngInject */
  function PlistsService($resource, Plist) {

    var service = {
      GetPlists: GetPlists,
      GetPlist: GetPlist,
      SavePlist: SavePlist,
      DeletePlist: DeletePlist,
    }

    return service;

    function GetPlists(params) {
      var params = params || {};
      return Plist
        .find({
          filter: {
            order: params.order || "CreatedAt DESC",
          },
        })
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function GetPlist(id) {
      return Plist
        .findById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });
    }

    function SavePlist(plist) {

      if (!plist.id) {
        plist.CreatedAt = new Date();
      }

      return Plist
        .updateOrCreate(plist)
        .$promise
        .then(function(item) {
          return item;
        });

    }

    function DeletePlist(id) {

      return Plist
        .deleteById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });

    }

  }
}());
