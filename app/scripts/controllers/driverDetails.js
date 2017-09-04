'use strict';
angular.module('simpleCabBookingApp')
    .controller('DriverDetailsCtrl', function ($scope, dashboardService, $stateParams) {
        var timeDifference = function timeDifference(dashboard, property) {
            var temp = "";
            var diff = (moment().valueOf() - moment(dashboard[property]).valueOf())/1000;
            var hours = parseInt(diff/60/60);
            var minutes = parseInt(((diff/60/60)%1)*60);
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
                    $scope.driverDashboard = response.data;
                    $scope.driverDashboardCopy = response.data;
                    for (var i = 0; i < $scope.driverDashboard.length; i++) {
                        $scope.driverDashboard[i].cr_request_accepted_time=(isNaN(moment($scope.driverDashboard[i].cr_request_accepted_time).valueOf())) ?null:moment($scope.driverDashboard[i].cr_request_accepted_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.driverDashboard[i].cr_requested_time=(isNaN(moment($scope.driverDashboard[i].cr_requested_time).valueOf())) ?null:moment($scope.driverDashboard[i].cr_requested_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.driverDashboard[i].cr_request_completed_time=(isNaN(moment($scope.driverDashboard[i].cr_request_completed_time).valueOf())) ? null : moment($scope.driverDashboard[i].cr_request_completed_time).format('YYYY-MM-DD HH:mm:ss');
                        if($scope.driverDashboard[i].cr_status==='Ongoing')
                            $scope.driverDashboard[i].time_elapsed = timeDifference($scope.driverDashboard[i], 'cr_request_accepted_time');
                        else if($scope.driverDashboard[i].cr_status==='Waiting')
                            $scope.driverDashboard[i].time_elapsed = timeDifference($scope.driverDashboard[i], 'cr_requested_time');
                        else if($scope.driverDashboard[i].cr_status==='Completed')
                            $scope.driverDashboard[i].time_elapsed = timeDifference($scope.driverDashboard[i], 'cr_request_completed_time');
                    }
                }
            });
            dashboardService.getDriverDetails($stateParams).then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    $scope.driverDetails = response.data;
                    $scope.driverDetailsCopy = response.data;
                    for (var i = 0; i < $scope.driverDetails.length; i++) {
                        // console.log("$scope.driverDetails[i]", $scope.driverDetails[i]);
                        $scope.driverDetails[i].cr_request_accepted_time=(isNaN(moment($scope.driverDetails[i].cr_request_accepted_time).valueOf())) ?null:moment($scope.driverDetails[i].cr_request_accepted_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.driverDetails[i].cr_requested_time=(isNaN(moment($scope.driverDetails[i].cr_requested_time).valueOf())) ?null:moment($scope.driverDetails[i].cr_requested_time).format('YYYY-MM-DD HH:mm:ss');
                        $scope.driverDetails[i].cr_request_completed_time=(isNaN(moment($scope.driverDetails[i].cr_request_completed_time).valueOf())) ? null : moment($scope.driverDetails[i].cr_request_completed_time).format('YYYY-MM-DD HH:mm:ss');
                        if($scope.driverDetails[i].cr_status==='Ongoing'){
                            $scope.driverDetails[i].accepted_time = timeDifference($scope.driverDetails[i], 'cr_request_accepted_time');
                            $scope.driverDetails[i].requested_time = timeDifference($scope.driverDetails[i], 'cr_requested_time');
                            var duration = (moment().valueOf() - moment($scope.driverDetailsCopy[i].cr_request_accepted_time).valueOf())/1000;
                            if(parseInt(duration, 10)>=300){
                                $scope.completeRequest($scope.driverDetails[i]['cr_customer_id'], moment().format('YYYY-MM-DD HH:mm:ss'));
                            }
                        }
                        else if($scope.driverDetails[i].cr_status==='Waiting')
                            $scope.driverDetails[i].time_elapsed = timeDifference($scope.driverDetails[i], 'cr_requested_time');
                        else if($scope.driverDetails[i].cr_status==='Complete'){
                            $scope.driverDetails[i].accepted_time = timeDifference($scope.driverDetails[i], 'cr_request_accepted_time');
                            $scope.driverDetails[i].requested_time = timeDifference($scope.driverDetails[i], 'cr_requested_time');
                            $scope.driverDetails[i].completed_time = timeDifference($scope.driverDetails[i], 'cr_request_completed_time');
                        }

                    }
                    // console.log($scope.driverDetails);
                }
            }, function (errResponse) {
                alert("Something wrong happened" + JSON.stringify(errResponse));
            });
        };
        $scope.refresh();

        setInterval(function(){
            $scope.refresh();
        }, 1000);

        $scope.acceptCabRequest = function (customer_id) {
            dashboardService.acceptCabRequest({driver_id:$stateParams.id,customer_id:customer_id }).then(function (response) {
                // console.log(response);
                $scope.refresh();
            }, function (response) {
                // console.log(response);
                alert("Can't accept request right now. Driver Busy");
            })
        };

        $scope.completeRequest = function (customer_id, completed_time) {
            dashboardService.completeRequest({driver_id:$stateParams.id,customer_id:customer_id,completed_time:completed_time }).then(function (response) {
                console.log(response);
                // $scope.refresh();
            }, function (response) {
                // console.log(response);
                alert("Something wrong happened====");
            })
        };
    });
