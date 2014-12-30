'use strict';

angular.module('clientApp')
.controller('ChatCtrl',['$http','$log','$scope','$rootScope','activityFactory','configFactory','$location','ngProgress','flash', function($http,$log,$scope,$rootScope,activityFactory,configFactory,$location,ngProgress,flash){

	 if($rootScope.user == null || $rootScope.user.length == 0){
       $location.path('/');
    };

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceDataArray=[];      //Data holds all device navbar object data
    $scope.deviceData=[];          //Data holds device navbar user information
    $scope.image;					//Screenshot
    $scope.deviceid;

    //Device status
    $scope.onlinestatus;            //Online or offline
    $scope.devicename;              //Name of device
    $scope.onlinetime;         //When was the device seen
    $scope.customStyle = {};        //Color for text

    $scope.flash = flash;

    var screenshotToken = 1;

    /*******************************************
    * Init
    ********************************************/

    //called on load
    function onload() {

	    activityFactory.getDeviceData($rootScope.user,function(data) {

        var name;
        var obj;
        var devicename;
        var deviceid;

        for(var i=0;i<data.length;i++){
          obj = data[i];
          name = obj.devicename;
          $scope.deviceData.push(name);
          $scope.deviceDataArray.push(obj);
        }

        //Trigger online data

        deviceid = $scope.deviceDataArray[0].deviceid;
        $scope.deviceid = deviceid;
        devicename = $scope.deviceDataArray[0].devicename;
        getOnlineData(deviceid,$rootScope.user,devicename);

      });

      //Show any old screenshots stored in root
      if($rootScope.screenshot == null || $rootScope.screenshot.length == 0){
      } else {
        $scope.image = $rootScope.screenshot;
      }
	}
	onload();

	/*******************************************
    * Functions
    ********************************************/

    function getOnlineData(deviceid,user,devicename){

          //Get online status - start with first device
          activityFactory.getOnlineData(function(onlinedata) {

            if(onlinedata === null || onlinedata.length === 0){
            $scope.devicename = devicename; //Improve usability. if no data on server an user clicks
            $scope.onlinestatus = '?';
            $scope.devicetype = '?';
            $scope.onlinetime = '';
          }else{
           $scope.onlinestatus = onlinedata[0].status;
           $scope.onlinetime = onlinedata[0].timestamp;
           $scope.devicename = onlinedata[0].devicename;
           $scope.devicetype = onlinedata[0].type;
           if($scope.onlinestatus === 'online'){
             turnGreen();
           }else{
            turnBlack();
          }
        }
      },deviceid,user);
    }

	function turnGreen (){
		$scope.customStyle.style = {'color':'green'};
	}

	function turnBlack (){
		$scope.customStyle.style = {'color':'red'};
	}

	function stopProgress() {
        //Stop progressbar - could have been initiated from login or create account
        ngProgress.stop();
        ngProgress.hide();
    }

    /*******************************************
    * Screenshot socket.io
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

		}

	});

	$scope.sendMsg = function(){

    if($scope.onlinestatus === 'online'){

        screenshotToken++;

        flash.clear();
        $scope.image = '';
    		ngProgress.start();

    		$log.info($scope.chatMessage);
    		//io.socket.post($scope.baseUrl+'/chat/addconv/',{user:$rootScope.user,message: $scope.chatMessage});
    		io.socket.post($scope.baseUrl+'chat/addconv/',{user:$rootScope.user, deviceid:$scope.deviceid, token:screenshotToken});
    		$scope.chatMessage = "";

        //Wait for return image
        setTimeout(function(){  
            //Trigger a resourse load for client to detect button press
            $http.get($scope.baseUrl+'screenshot/get?deviceid=' + $scope.deviceid)
            .success(function(data){
              var obj = data[0];
              if(obj != null){

                if(obj.token == screenshotToken){

                   $scope.image = obj.screenshot;
                   $scope.screenshotTimestamp = 'Screenshot successful';

                   //Save screenshot to root so that we can show it swithching between tabs
                   $rootScope.screenshot = obj.screenshot;
                 
                }else{

                   $scope.image = obj.screenshot;
                   //$scope.screenshotTimestamp  = obj.token.toString() + ' ' +  screenshotToken.toString();
                   $scope.screenshotTimestamp = 'Screenshot request not matching. Old screenshot with client timestamp ' + obj.timestamp ;
                }
                stopProgress();

              } else {
                 flash.setMessage('Failed to extract screenshot from server');
                 stopProgress();
              }
            });
          }, 5000);
      }else{
         flash.setMessage('Client needs to be online to take screenshot');
      }

	};

  /*******************************************
  * Callbacks
  ********************************************/

  $scope.onDeviceClick = function(index){
      var deviceid;
      var devicename;

      //Load the data from the clicked device
      deviceid = $scope.deviceDataArray[index].deviceid;
      $scope.deviceid = deviceid;
      devicename = $scope.deviceDataArray[index].devicename;
     
      //Trigger online data
      getOnlineData(deviceid,$rootScope.user,devicename);
  };

}]);