'use strict';

angular.module('clientApp')
.factory("loginFactory",['$http','configFactory','ngProgress','$location','$rootScope', function($http,configFactory,ngProgress,$location,$rootScope) {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var observerCallback = [];	 	//Callback back to controller
    var loginEmail;
    var clientLogin;

    /*******************************************
    * Factory Interal Methods
    ********************************************/
    function callCallback(msg){

    	//Call callback when we are done
    	if(observerCallback.length > 0) {
    		var callback = observerCallback[0];
    		callback(msg);
    	}
    }

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.startProgress = function () {
    	ngProgress.start();
    };

    factory.stopProgress = function () {
        ngProgress.stop();
        ngProgress.hide();
    };

    factory.succesfullLogin = function () {
        $rootScope.user = loginEmail;
        if(clientLogin){
        	 $location.path('/chatclient');
        }else{
        	 $location.path('/activity');
        }
        clientLogin = false;
    };

    factory.registerClientLogin = function () {
        clientLogin = true;
    };

    factory.registerUpdateCallback = function (callback) {
    	observerCallback[0] = callback;
    };

    factory.login = function(email,password) {

    	var url;
    	var retPW;

    	loginEmail = email;
    	url = configFactory.getBaseURL() + 'user?user=';
    	$http.get(url + email).
    	success(function(data, status, headers, config) {

    		if(data.length >0) {

    			retPW = data[0].password;
    			if(retPW === password) {
    				callCallback('success');
    			}else{
    				callCallback('Incorrect password!');
    			}

    		}else{
    			callCallback('Failed to login!');
    		}

    	}).
    	error(function(data, status, headers, config) {
    		callCallback('Internal Error!');
    	});
    };

    return factory;

}]);