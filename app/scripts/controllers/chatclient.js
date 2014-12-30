'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ChatclientCtrl
 * @description
 * # ChatclientCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ChatclientCtrl',['$scope','$http','configFactory','snapshotFactory','$rootScope', function ($scope,$http,configFactory,snapshotFactory,$rootScope) {
   
   	/*******************************************
    * Variables
    ********************************************/

	$scope.username = $rootScope.user;

  	/*******************************************
    * Listen for screenshot
    ********************************************/

    $scope.baseUrl = configFactory.getBaseURL();
	//$scope.baseUrl = 'http://localhost:1337';
	
	//start listen to socket
	io.socket.get($scope.baseUrl+'chat/addconv');

	//Socket callback
	io.socket.on('chat',function(obj){

		if(obj.verb === 'created'){

			//Trigger a resourse load for client to detect button press
			/*$http.get($scope.baseUrl+'screenshotButton'+'/'+ obj.data.message)
			.success(function(success_data){
			});*/

			var deviceid = obj.data.deviceid;
			var user = obj.data.user;
			var token = obj.data.token;
			snapshotFactory.setSnapshotRequested(deviceid,user,token);
		}

	});

  }]);
