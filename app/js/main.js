'use strict';

angular.module('balance', ['ui.router'])

.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
            // Paste this in browser's console
            //var $rootScope = angular.element(document.querySelectorAll("[ui-view]")[0]).injector().get('$rootScope');

            // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
            // });
            //
            // $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeError - fired when an error occurs during transition.');
            //     console.log(arguments);
            // });
            //
            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
            // });
            //
            // $rootScope.$on('$viewContentLoaded', function(event) {
            //     console.log('$viewContentLoaded - fired after dom rendered', event);
            // });
            //
            // $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            //     console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            //     console.log(unfoundState, fromState, fromParams);
            // });

        }
    ]
)

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider

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
            controller: "ContactsCtrl"
        })
        .state('app.contacts.search', {
            url: "/",
            templateUrl: "views/contacts/search.html",
        })
        .state('app.contacts.details', {
            url: "/{:cid}",
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

.controller("ContactsCtrl", function($scope) {})

.controller("FinancialCtrl", function($scope) {})


// $(function(){
// 	$(".dropdown").dropdown();
// 	$(".toggle-sidebar").on("click",function(){
// 		$(".wrapper").toggleClass("sidebar-off");
// 	});
// });
