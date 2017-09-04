'use strict';

/**
 * @ngdoc function
 * @name simpleCabBookingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the simpleCabBookingApp
 */
angular.module('simpleCabBookingApp')
    .controller('DriverCtrl', function ($scope, dashboardService, $state) {
        dashboardService.getAllDriver().then(function (response) {
            if (response.status === 200) {
                $scope.drivers = response.data;
            }
        }, function (errResponse) {
            alert("Something wrong happened" + errResponse);
        });
    });
