(function () {
  'use strict'

  angular
        .module('app._common')
        .factory('AccountService', AccountService)

    /* @ngInject */
  function AccountService (AppUser, $q) {
    var service = {
      _accounts: [],

      loadAccounts: loadAccounts
    }

    return service

    function loadAccounts () {
      var _id = AppUser.getCurrentId()
            // $q.resolve();
      if (!_id) {
        return $q.resolve()
      }

      return AppUser
                .accounts({
                  id: _id
                })
                .$promise
                .then(function (accounts) {
                  service._accounts = accounts
                })
    }
  }
}())
