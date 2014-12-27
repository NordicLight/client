'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('MapCtrl',['$scope','$http','$rootScope','configFactory','activityFactory','$location','flash', function ($scope,$http,$rootScope,configFactory,activityFactory,$location,flash) {

  if($rootScope.user == null || $rootScope.user.length == 0){
    $location.path('/');
  };

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceDataArray=[];      //Data holds all device navbar object data
    $scope.deviceData=[];           //Data holds device navbar user information
    $scope.posData="";
    $scope.flash = flash;           //Error message to user

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

      //Reset flash message
      flash.clear();

      activityFactory.getDeviceData($rootScope.user,function(data) {

        var name;
        var obj;
        var devicename;
        var deviceid;
        var name;
        
        for(var i=0;i<data.length;i++){
          obj = data[i];
          name = obj.devicename;
          $scope.deviceData.push(name);
          $scope.deviceDataArray.push(obj);
        }

        //Trigger online data
        deviceid = $scope.deviceDataArray[0].deviceid;
        devicename = $scope.deviceDataArray[0].devicename;
        getOnlineData(deviceid,$rootScope.user,devicename);

        //Trigger load map data first device
        getMapData(deviceid);
      });
      
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

  function getMapData(deviceid){

        var lat;
        var lon;
        var obj;
        var url;
        var name;

        //load map data
        url = configFactory.getBaseURL() + 'map/getmapdata?deviceid=' + deviceid + '&user=' + $rootScope.user;
        $http.get(url).success(function(data) {
          $scope.posData=data;

          //Should only be one
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
         }else{
            flash.setMessage('No device position stored in server');
         }

       }).error(function(data){
       });

  }

  function turnGreen (){
    $scope.customStyle.style = {'color':'green'};
  }

  function turnBlack (){
    $scope.customStyle.style = {'color':'red'};
  }

  /*******************************************
  * Callbacks
  ********************************************/

    //Load new device  
  $scope.onDeviceClick =  function click(index) {
    var deviceid;
    var devicename;

    //Reset flash message
    flash.clear();

    //Load the data from the clicked device
    deviceid = $scope.deviceDataArray[index].deviceid;
    devicename = $scope.deviceDataArray[index].devicename;

    //Trigger online data
    getOnlineData(deviceid,$rootScope.user,devicename);
  };


}]);
