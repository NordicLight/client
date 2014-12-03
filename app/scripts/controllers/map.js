'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('MapCtrl', function ($scope,$http,$rootScope,configFactory) {

    /*if($rootScope.user.length === 0){
      return;
    }*/

 	$scope.deviceData="";
 	$scope.posData="";

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

  	//called on load
  	function onload() {

  		var lat;
  		var lon;
  		var obj;
  		var name;
      var url;

      //On load - Extract unique devices for navbar
      url = configFactory.getBaseURL() + 'activity/getdevices';
      $http.get(url).success(function(data) {
      	$scope.deviceData=data;
      }).error(function(data){
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

  });
