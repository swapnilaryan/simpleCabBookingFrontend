'use strict';

/**
 * @ngdoc function
 * @name simpleCabBookingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the simpleCabBookingApp
 */
angular.module('simpleCabBookingApp')
    .controller('CustomerCtrl', function ($state, $scope, dashboardService) {
        $scope.customer = {
            customer_name: "",
            customer_number: null
        };
        $scope.ride = {
            customer_id: null
        };
        $scope.createCustomer = function () {
            if ($scope.customer.customer_name && $scope.customer.customer_number) {
                dashboardService.createCustomer($scope.customer).then(function (response) {
                    if (response.status === 201) {
                        alert("Hello " + response.data[0].customer_name + ' your customer id is ' + response.data[0].customer_id);
                    }
                }, function (errResponse) {
                    alert("Something wrong happened"+errResponse);
                });
            }
        };

        $scope.letsRide = function () {
            if ($scope.ride.customer_id) {
                dashboardService.requestCab($scope.ride).then(function (response) {
                    if (response.status === 201) {
                        alert("Ride Requested");
                    } else {
                        alert("Something wrong happened");
                    }
                }, function (errResponse) {
                    alert(errResponse.data.error.message);
                });
            }
        }
    });
