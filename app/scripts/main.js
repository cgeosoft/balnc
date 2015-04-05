'use strict';

angular.module('balance', ['ui.router'])

.run(
    function($rootScope, $state, $stateParams, $fakedb) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$fakedb = $fakedb;
    }

)

// Sexy directive for semantic-ui-dropdown
.directive('dropdown', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            $(element).dropdown();
        }
    };
})

.directive('megamenu', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            $(element).popup({
                inline: true,
                exclusive: true,
                movePopup: false,
                preserve: true,
                on: "click",
                transition: 'fly down',
                duration: 750,
            });
        }
    };
})

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider


        .state('login', {
        url: '/login',
        templateUrl: "views/login/login.html",
        controller: "LoginCtrl"
    })


    .state('app', {
            abstract: true,
            templateUrl: "views/_layouts/main.html",
            controller: "AppCtrl"
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: "views/dashboard/index.html",
            controller: "DashboardCtrl"
        })

    .state('app.contacts', {
            url: "/contacts",
            abstract: true,
            templateUrl: "views/contacts/_layout.html",
            controller: "ContactsCtrl",
        })
        .state('app.contacts.empty', {
            url: "/",
            templateUrl: "views/contacts/empty.html",
            controller: function($state, $fakedb) {

                $fakedb.companies().then(function(companies) {
                    var _company = companies[0];
                    $state.go("app.contacts.details", {
                        alias: _company.alias
                    });
                })

            },
        })
        .state('app.contacts.details', {
            url: "/:alias",
            templateUrl: "views/contacts/details.html",
        })

    .state('app.financial', {
            url: "/financial",
            abstract: true,
            templateUrl: "views/financial/_layout.html",
            controller: "FinancialCtrl"
        })
        .state('app.financial.dashboard', {
            url: "/",
            templateUrl: "views/financial/dashboard.html",
        })
        .state('app.financial.details', {
            url: "/{:fid}",
            templateUrl: "views/financial/details.html",
        })
})

.controller("AppCtrl", function($scope) {
    $scope.topmenu = [{
        "label": "Dashboard",
        "sref": "app.dashboard",
    }, {
        "label": "Contacts",
        "sref": "app.contacts.search",
    }, {
        "label": "Financial",
        "sref": "app.financial.dashboard",
    }];
})

.controller("DashboardCtrl", function($scope) {})

.controller("ContactsCtrl", function($scope) {

    $fakedb.companies().then(function(companies) {
        $scope.companies = companies;
    })

})

.controller("FinancialCtrl", function($scope) {})

.controller("LoginCtrl", function($scope, $timeout) {
    // $scope.loading = true;
    $scope.LoginSubmit = function() {
        $scope.loading = true;
        $timeout(function() {
            $scope.$state.go("app.dashboard")
        }, 2000);
    }
})

.factory("$fakedb", function($http) {
    return {
        companies: function() {
            return $http
                .get("data/database.json")
                .then(function(response) {
                    if (response.error) {
                        console.log("Remote Data Error", response.data);
                    }
                    return response.data.Companies;
                }, function(response) {
                    //console.log("response",response);
                    var errorStatus;
                    if (response.status === 0) {
                        errorStatus = 'Could not connect to server<br>Check your internet connectivity';
                    } else if (response.status == 401) {
                        errorStatus = 'Unauthorized';
                    } else if (response.status == 405) {
                        errorStatus = 'HTTP verb not supported [405]';
                    } else if (response.status == 500) {
                        errorStatus = 'Internal Server Error [500].';
                    } else {
                        errorStatus = JSON.parse(JSON.stringify(response.data.error));
                    }

                    return {
                        error: true,
                        data: errorStatus
                    };
                });
        }
    }
})


// $(function(){
// 	$(".dropdown").dropdown();
// 	$(".toggle-sidebar").on("click",function(){
// 		$(".wrapper").toggleClass("sidebar-off");
// 	});
// });
