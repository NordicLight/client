'use strict';

angular.module('clientApp')
.factory("configFactory",[ function() {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var debug = false;

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.check = function (user,pass) {
    	return user;
    };

	factory.getBaseURL = function () {

		if(debug){
			return 'http://localhost:1337/';
		}else{
			return 'http://cloud-monitor-server.herokuapp.com/';
		}

	};

	return factory;

}]);