'use strict';

angular.module('clientApp')
.factory("appFactory", function($http,dateFactory) {

	var factory = {};

	/*******************************************
    * Factory External Methods
    ********************************************/

	factory.test = function() {
		return "hej";
	};

	factory.getApps = function (callback) {

		var searchDate;
        searchDate = dateFactory.getSearchDateInt(14);

       $http.get('http://localhost:1337/app/getitems?timeid='+ searchDate).success(callback);
	};

	return factory;

});