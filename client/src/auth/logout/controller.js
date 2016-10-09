(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LogoutController', LogoutController);

  /* @ngInject */
  function LogoutController(AppUser) {
    var vm = this;

    AppUser
      .getCurrent()
      .$promise
      .then(function (_user) {
        vm.name = _user.fullname.split(" ")[1];
      });

  }

} ());
