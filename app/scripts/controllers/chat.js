'use strict';

angular.module('clientApp')
.controller('ChatCtrl',['$http','$log','$scope','$rootScope','activityFactory','configFactory','$location','ngProgress','flash', function($http,$log,$scope,$rootScope,activityFactory,configFactory,$location,ngProgress,flash){

	/*if($rootScope.user == null || $rootScope.user.length == 0){
       $location.path('/');
    };*/

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceDataArray=[];      //Data holds all device navbar object data
    $scope.deviceData="";           //Data holds device navbar
    $scope.image;					//Screenshot
    $scope.deviceid;

    //Device status
    $scope.onlinestatus;            //Online or offline
    $scope.devicename;              //Name of device
    $scope.onlinetime;         //When was the device seen
    $scope.customStyle = {};        //Color for text

    $scope.flash = flash;

    /*******************************************
    * Init
    ********************************************/

    //called on load
    function onload() {

	    //TODO - handle more then one device
	    activityFactory.getDeviceData(function(data) {
	    	var deviceid = data.deviceid;
	    	$scope.deviceid = deviceid;
	    	var temp = data.devicename;
	    	$scope.devicename = temp;
	    	$scope.deviceData = {"first":temp};
	    	$scope.deviceDataArray.push(data);

	        //Get online status
	        activityFactory.getOnlineData(function(onlinedata) {

	        	if(onlinedata == null || onlinedata.length === 0){
	        		$scope.onlinestatus = '?';
	        		$scope.onlinetime = '?';
	        	}else{
	        		$scope.onlinestatus = onlinedata[0].status;
	        		$scope.onlinetime = onlinedata[0].timestamp;
	        		if($scope.onlinestatus === 'online'){
	        			turnGreen();
	        		} 
	        	}
	        },deviceid);

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
    $scope.baseUrl = configFactory.getBaseURL();
	//$scope.baseUrl = 'http://localhost:1337';
	$scope.chatList =[];
	$scope.getAllchat = function(){

		//start listen to socket
		io.socket.get($scope.baseUrl+'chat/addconv');

		//Request data
		/*$http.get($scope.baseUrl+'chat')
		.success(function(success_data){

			var obj;
			for(var i=0;i<success_data.length;i++){
				obj = success_data[i];
				$scope.chatList.push(obj);
			}

			$log.info(success_data);
		});*/
	};

	$scope.getAllchat();
	//$scope.chatUser = "nikkyBot"
	//$scope.chatMessage="";

	//Socket callback
	io.socket.on('chat',function(obj){

		if(obj.verb === 'created'){

			/*$log.info(obj)
			$scope.chatList.push(obj.data);
			$scope.$digest();*/

			//Trigger a resourse load for client to detect button press - old solution
			/*$http.get($scope.baseUrl+'screenshotButton'+'/'+ $scope.deviceid)
			.success(function(success_data){
			});*/

			setTimeout(function(){  
				//Trigger a resourse load for client to detect button press
				$http.get($scope.baseUrl+'screenshot/get?deviceid=' + $scope.deviceid)
				.success(function(data){
					var obj = data[0];
					if(obj != null){
						$scope.image = obj.screenshot;
						$scope.screenshotTimestamp = obj.timestamp;
						stopProgress();
					} else {
						 flash.setMessage('Failed to extract Screenshot from server');
						 stopProgress();
					}
				});
			}, 5000);
		}

	});

	$scope.sendMsg = function(){

		flash.clear();
		ngProgress.start();

		$log.info($scope.chatMessage);
		//io.socket.post($scope.baseUrl+'/chat/addconv/',{user:$rootScope.user,message: $scope.chatMessage});
		io.socket.post($scope.baseUrl+'chat/addconv/',{user:'user',message: $scope.deviceid});
		$scope.chatMessage = "";
	};

	/*******************************************
	* Chaning color of device status
	********************************************/

	function turnGreen (){
		$scope.customStyle.style = {'color':'green'};
	}

	function turnBlack (){
		$scope.customStyle.style = {'color':'black'};
	}

	function stopProgress() {
        //Stop progressbar - could have been initiated from login or create account
        ngProgress.stop();
        ngProgress.hide();
      }
}]);