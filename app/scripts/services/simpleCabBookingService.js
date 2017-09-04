angular.module('simpleCabBookingApp')
    .factory('dashboardService', function ($http) {
        return {
            getAllRequestStatus: function() {
                return $http.get(site_config.url+'/getAllRequestStatus');
            },
            createCustomer: function (requestBody) {
                return $http.post(site_config.url+'/createCustomer', requestBody);
            },
            requestCab: function (requestBody) {
                return $http.post(site_config.url+'/requestCab', requestBody);
            },
            getAllDriver: function () {
                return $http.get(site_config.url+'/getAllDriver');
            },
            getDriverDetails: function (requestParams) {
                return $http.get(site_config.url+'/driver/'+requestParams.id);
            },
            acceptCabRequest: function (requestBody) {
                return $http.post(site_config.url+'/acceptCabRequest', requestBody);
            },
            completeRequest: function (requestBody) {
                console.log(requestBody);
                return $http.post(site_config.url+'/completeRequest', requestBody);
            }
        }
    });
