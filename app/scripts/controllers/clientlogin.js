'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ClientloginCtrl',['$scope','flash','loginFactory', function ($scope,flash,loginFactory) {

 	var retPW;

 	$scope.master = {};
 	$scope.flash = flash;

 	$scope.text = '';

 	$scope.login = function() {

 		 // This seems to take, on timt to time, some time. Use progress bar. will be tunned off in activity
        loginFactory.startProgress();

        //Login callback
 		loginFactory.registerUpdateCallback(function(msg){
 			loginFactory.stopProgress();

 			if(msg === 'success'){
 				loginFactory.succesfullLogin();
 			}else{
 				flash.setMessage(msg);
 			}
 		});

 		//Start login
 		loginFactory.registerClientLogin();
 		loginFactory.login($scope.user.email,$scope.user.password);
 	};

 	$scope.reset = function() {
 		$scope.user = angular.copy($scope.master);
 	};
 	$scope.reset();

 	function stopProgress() {
    }

}]);
