'use strict';

angular.module('clientApp')
.factory("loginFactory",['$http','configFactory','ngProgress','$location','$rootScope', function($http,configFactory,ngProgress,$location,$rootScope) {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var observerCallback = [];	 	//Callback back to controller
    var loginEmail;
    var loginPassword;
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

    function updateLoginTime(email){

        http://localhost:1337/user/updatelogintime?user=johan.b.brodin@gmail.com&logintime=20141223
        var url;
        var dateString;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        dateString = yyyy.toString() + mm.toString() + dd.toString();

        //TODO add coorect date
        url = configFactory.getBaseURL() + 'user/updatelogintime?user=' + email + '&' + 'logintime=' + dateString;
        $http.get(url).
        success(function(data) {
        });

    }

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.getUser = function () {
       return loginEmail;
    };

    factory.setUser = function (user) {
     loginEmail = user;
    };

    factory.getPass = function () {
       return loginPassword;
    };

    factory.setPass = function (pass) {
     loginPassword = pass;
    };

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
        loginPassword = password;

    	url = configFactory.getBaseURL() + 'user?user=';
    	$http.get(url + email).
    	success(function(data, status, headers, config) {

    		if(data.length >0) {

    			retPW = data[0].password;
    			if(retPW === password) {
                    if(clientLogin === false){
                        updateLoginTime(email);
                    }
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