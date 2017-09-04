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
            }
        }
    });
