'use strict';

angular.module('clientApp')
.controller('ChatCtrl',['$http','$log','$scope','$rootScope','activityFactory', function($http,$log,$scope,$rootScope,activityFactory){

	 //TODO
    /*if($rootScope.user.length == 0){
      return;
    };*/

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceData="";           //Data holds device navbar

    /*******************************************
    * Init
    ********************************************/

    //called on load
    function onload() {

      //device navbar data
      activityFactory.getDeviceData(function(data) {
        $scope.deviceData = data; 
      });

    }
    onload();

    /*******************************************
    * Chat
    ********************************************/

    //Sails wiki documentation
    //https://github.com/xdissent/sails-wiki/blob/master/sockets.md

	$scope.predicate = '-id';
	$scope.reverse = false;
	//$scope.baseUrl = 'http://sails-socket-maangalabs.herokuapp.com';
	$scope.baseUrl = 'http://localhost:1337';
	$scope.chatList =[];
	$scope.getAllchat = function(){

		//start listen to socket
		io.socket.get($scope.baseUrl+'/chat/addconv');

		//Request data
		$http.get($scope.baseUrl+'/chat')
		.success(function(success_data){

			var obj;
			for(var i=0;i<success_data.length;i++){
				obj = success_data[i];
				if(obj.user.valueOf() == $rootScope.user.valueOf()){
					$scope.chatList.push(obj);
				}	
			}

			$log.info(success_data);
		});
	};

	$scope.getAllchat();
	$scope.chatUser = "nikkyBot"
	$scope.chatMessage="";

	//Socket callback
	io.socket.on('chat',function(obj){

		if(obj.verb === 'created'){
			$log.info(obj)
			$scope.chatList.push(obj.data);
			$scope.$digest();
		}

	});

	$scope.sendMsg = function(){
		$log.info($scope.chatMessage);
		io.socket.post($scope.baseUrl+'/chat/addconv/',{user:$rootScope.user,message: $scope.chatMessage});
		$scope.chatMessage = "";
	};
}]);