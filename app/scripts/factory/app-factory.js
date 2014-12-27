'use strict';

angular.module('clientApp')
.factory("appFactory",['$http','dateFactory','configFactory', function($http,dateFactory,configFactory) {

	var factory = {};

	/*******************************************
    * Factory External Methods
    ********************************************/

	factory.getApps = function (deviceid,user,callback) {

		var searchDate;
        searchDate = dateFactory.getSearchDateInt(14);

        var url = configFactory.getBaseURL() + 'app/getitems?timeid=' + searchDate + '&deviceid=' + deviceid + '&user=' + user;

        $http.get(url).success(callback);
	};

	return factory;

}]);