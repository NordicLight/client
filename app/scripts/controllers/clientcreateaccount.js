'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CreateaccountCtrl
 * @description
 * # CreateaccountCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ClientcreateaccountCtrl',['$scope','$http','$location','$rootScope','flash','configFactory','loginFactory','ngProgress', function ($scope,$http,$location,$rootScope,flash,configFactory,loginFactory,ngProgress) {

 	var today,year,month,day,date,obj;
 	$scope.flash = flash;

 	$scope.create = function() {

 		if($scope.user.email && $scope.pw1){

 			obj = {timeid:"",user:"",password:""};

 			//Get date
      today = new Date();
		  year = today.getFullYear();
		  month = today.getMonth()+1;
		  day = today.getDate();
		  date = year.toString() + month.toString() + day.toString();

 			obj.timeid = date
 			obj.user = $scope.user.email;
 			obj.password = $scope.pw1;
 			obj.type = "free";

 			//TODO - check that the user is not existing

 			// This seems to take, on timt to time, some time. Use progress bar. will be tunned off in activity
      ngProgress.start();

 			var url = configFactory.getBaseURL() + 'user';
 			$http.post(url,obj).
 				success(function(data, status, headers, config) {
 				
          stopProgress();
 					$rootScope.user = $scope.user.email;
          loginFactory.setUser(obj.user);
          loginFactory.setPass(obj.password);
         
 					$location.path('/chatclient');
				}).
 				error(function(data, status, headers, config) {
 					flash.setMessage('Error could not contact server!');
 					stopProgress();
				}
			);

 		}else{
      	//TODO - add error user feedback
    };

  };

  function stopProgress() {
    //Stop progressbar - could have been initiated from login or create account
    ngProgress.stop();
    ngProgress.hide();
  }

}]);
