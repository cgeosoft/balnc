(function () {
  'use strict';

  angular
    .module('app._common')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController(AppUser) {
    var vm = this;

    AppUser
      .getCurrent()
      .$promise
      .then(function (_user) {
        vm.name = _user.fullname.split(" ")[1];
      });

  }

} ());
