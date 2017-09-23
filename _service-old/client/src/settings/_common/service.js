
(function() {
  'use strict';

  angular
    .module('app.settings')
    .factory('SettingsService', SettingsService);

  /* @ngInject */
  function SettingsService($resource) {

    var service = {
      GetSettings: GetSettings,
      GetSetting: GetSetting,
      SaveSetting: SaveSetting,
      DeleteSetting: DeleteSetting,
    }

    return service;

    function GetSettings(params) {
      return $resource(APP.Service + "_design/models/_view/Settings")
        .get()
        .$promise
        .then(function(data) {
          return _.chain(data.rows)
            .map(function(item) {
              return item.value;
            })
            .sortBy(function(item) {
              return item.DrewAt || 0;
            })
            .reverse()
            .value();
        });
    }

    function GetSetting(id) {
      return $resource(APP.Service + id)
        .get()
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function SaveSetting(Setting) {
      Setting.Type = "Setting";
      return $resource(APP.Service)
        .save(Setting)
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function DeleteSetting(Setting) {

      Setting._deleted = true;
      Setting.DeletedAt = new Date();

      return $resource(APP.Service)
        .save(Setting)
        .$promise;
    }

  }
}());
