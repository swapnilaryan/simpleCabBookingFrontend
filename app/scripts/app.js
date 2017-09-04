'use strict';

/**
 * @ngdoc overview
 * @name simpleCabBookingApp
 * @description
 * # simpleCabBookingApp
 *
 * Main module of the application.
 */
angular
    .module('simpleCabBookingApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url:'/',
                templateUrl: '../views/main.html',
                controller: 'MainCtrl'
            })
            .state('customer',{
                url:'/customer',
                templateUrl: '../views/customer.html',
                controller: 'CustomerCtrl'
            })
            .state('driver',{
                url:'/driver',
                templateUrl: '../views/driver.html',
                controller: 'DriverCtrl'
            })
            .state('details',{
                url:'/driver/details?:id',
                templateUrl: '../views/driverDetails.html',
                controller: 'DriverDetailsCtrl'
            });

        $urlRouterProvider.otherwise('/');
        // $routeProvider
        //     .when('/', {
        //         templateUrl: 'views/main.html',
        //         controller: 'MainCtrl',
        //         controllerAs: 'main'
        //     })
        //     .when('/about', {
        //         templateUrl: 'views/driver.html',
        //         controller: 'AboutCtrl',
        //         controllerAs: 'about'
        //     })
        //     .otherwise({
        //         redirectTo: '/'
        //     });
    });
