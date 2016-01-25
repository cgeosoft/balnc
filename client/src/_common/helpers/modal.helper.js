/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .provider('modalHelper', modalHelperProvider);

  /* @ngInject */
  function modalHelperProvider() {
    /* jshint validthis:true */
    this.$get = modalHelper;

    /* @ngInject */
    function modalHelper($uibModal, $q) {

      var service = {
        configureModals: configureModals
      };

      return service;

      function configureModals(modals) {
        var _ret = {};
        angular.forEach(modals, function(modal) {
          _ret[modal.modal] = function(obj) {
            var config = {
              controllerAs: 'vm',
              resolve: {
                ModalParams: function() {
                  return obj || {};
                }
              }
            };
            angular.extend(config, modal.config);

            return $uibModal
              .open(config)
              .result
              .then(ModalResultComplete)
              .catch(ModalResultFailed);

            function ModalResultComplete(response) {
              return response;
            }

            function ModalResultFailed(reason) {
              if (reason && reason !== "backdrop click") {
                return $q.reject();
              }
            }
          };
        });
        return _ret;
      }
    }
  }

}());
