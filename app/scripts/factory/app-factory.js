'use strict';

angular.module('clientApp')
.factory("appFactory",['$http','dateFactory','configFactory', function($http,dateFactory,configFactory) {

	var factory = {};

	/*******************************************
    * Factory External Methods
    ********************************************/

	factory.getApps = function (callback) {

		var searchDate;
        searchDate = dateFactory.getSearchDateInt(14);

        var url = configFactory.getBaseURL() + 'app/getitems?timeid=';

        //$http.get('http://localhost:1337/app/getitems?timeid='+ searchDate).success(callback);
        $http.get(url + searchDate).success(callback);
	};

	return factory;

}]);