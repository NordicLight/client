'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('MapCtrl',['$scope','$http','$rootScope','configFactory','activityFactory','$location', function ($scope,$http,$rootScope,configFactory,activityFactory,$location) {

    if($rootScope.user == null || $rootScope.user.length == 0){
       $location.path('/');
    };

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceDataArray=[];      //Data holds all device navbar object data
    $scope.deviceData="";
    $scope.posData="";
   
    //Device status
    $scope.onlinestatus;            //Online or offline
    $scope.devicename;              //Name of device
    $scope.onlinetime;              //When was the device seen
    $scope.customStyle = {};        //Color for text

 	  //Define map object
 	  //http://www.honobono-life.info/wpeng/google-maps-for-angularjs-marker-eventv2-0-7/
 	  google.maps.visualRefresh = true;
 	  angular.extend($scope, {
 	  	map: {
 	  		control: {},
 	  		center: {
 	  			latitude: 45,
 	  			longitude: -73
 	  		},
 	  		options: {
 	  			streetViewControl: false,
 	  			panControl: false,
 	  			maxZoom: 20,
 	  			minZoom: 3
 	  		},
 	  		zoom: 15,
 	  		dragging: true,
 	  		bounds: {},
 	  		markers: [],
 	  		refresh: function () {
 	  			$scope.map.control.refresh(origCenter);
 	  		}
 	  	}
 	  });

    /*******************************************
    * Init
    ********************************************/

    function onload() {

      var lat;
      var lon;
      var obj;
      var name;
      var url;

        //TODO - handle more then one device
        activityFactory.getDeviceData(function(data) {
          var deviceid = data.deviceid;
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

      //on load - extract locations for all devices
      url = configFactory.getBaseURL() + 'map';
      $http.get(url).success(function(data) {
      	$scope.posData=data;

      	//Show first one
      	if(data.length > 0){

      		obj = data[0];
      		lat = obj.lat;
      		lon = obj.lon;
      		name = obj.devicename;

         var array = [];
         array.push({
           id:1,
           latitude: lat,
           longitude: lon,
           showWindow: true,
           title: name
         });
         $scope.map.markers = array;
         $scope.map.center = {latitude: lat,longitude: lon};
       }

     }).error(function(data){
     });

   };
   onload();

  	//Load table  
  	$scope.onDeviceClick =  function click(e) {
  		window.alert("click");
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

}]);
