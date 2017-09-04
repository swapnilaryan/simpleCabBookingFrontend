'use strict';

/**
 * @ngdoc function
 * @name simpleCabBookingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the simpleCabBookingApp
 */
angular.module('simpleCabBookingApp')
    .controller('MainCtrl', function ($state, $scope, dashboardService) {
        var timeDifference = function timeDifference(dashboard, property) {
            var temp = "";
            var diff = (moment().valueOf() - moment(dashboard[property]).valueOf())/1000;
            var hours = parseInt(diff/60/60);
            var minutes = parseInt(diff/60);
            var seconds = parseInt(diff%60);
            if(hours)
                temp += hours+ ' hours ';
            if(minutes)
                 temp += minutes + ' mins ';
            temp += seconds + ' seconds ';
            return temp;
        };
        $scope.refresh = function () {
            dashboardService.getAllRequestStatus().then(function (response) {
                if (response.status === 200) {
                    $scope.dashboard = response.data;
                    for (var i = 0; i < $scope.dashboard.length; i++) {
                        $scope.dashboard[i].cr_request_accepted_time=(isNaN(moment($scope.dashboard[i].cr_request_accepted_time).valueOf())) ?null:moment($scope.dashboard[i].cr_request_accepted_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.dashboard[i].cr_requested_time=(isNaN(moment($scope.dashboard[i].cr_requested_time).valueOf())) ?null:moment($scope.dashboard[i].cr_requested_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.dashboard[i].cr_request_completed_time=(isNaN(moment($scope.dashboard[i].cr_request_completed_time).valueOf())) ? null : moment($scope.dashboard[i].cr_request_completed_time).format('YYYY-MM-DD HH:mm:ss');
                        if($scope.dashboard[i].cr_status==='Ongoing')
                            $scope.dashboard[i].time_elapsed = timeDifference($scope.dashboard[i], 'cr_request_accepted_time');
                        else if($scope.dashboard[i].cr_status==='Waiting')
                            $scope.dashboard[i].time_elapsed = timeDifference($scope.dashboard[i], 'cr_requested_time');
                        else if($scope.dashboard[i].cr_status==='Completed')
                            $scope.dashboard[i].time_elapsed = timeDifference($scope.dashboard[i], 'cr_request_completed_time');
                    }
                }
            });
        };

        $scope.refresh();

    });
