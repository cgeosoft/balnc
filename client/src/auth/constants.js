(function() {
  'use strict';

  angular
    .module('app.auth')
    .constant('LoginMessages', {
      SESSIONEND: {
        Type: "danger",
        Message: "You were signed out",
        Details: "Probably your session was timed out",
      },
      SIGNOUT: {
        Type: "success",
        Message: "You were signed out",
        Details: "You may login again using the form",
      },
      REGISTERED: {
        Type: "success",
        Message: "Your account is ready, you can login now",
        Details: false,
      },
      AUTHERROR: {
        Type: "danger",
        Message: "Authentication Error",
        Details: null,
      },
      UNAVAILABLE: {
        Type: "danger",
        Message: "Service is not available",
        Details: "Please try again later. If the problem insist, contact your system administrator",
      },
      LOGIN_FAILED: {
        Type: "danger",
        Message: "Name or password is incorrect",
        Details: "Please try again",
      },
    });

}());
