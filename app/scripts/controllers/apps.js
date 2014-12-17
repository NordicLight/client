'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AppCtrl',['$scope','$rootScope','activityFactory','appFactory','chartFactory','dateFactory','$location', function ($scope,$rootScope,activityFactory,appFactory,chartFactory,dateFactory,$location) {
 
    if($rootScope.user == null || $rootScope.user.length == 0){
       $location.path('/');
    };

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceDataArray=[];      //Data holds all device navbar object data
    $scope.deviceData="";           //Data holds device navbar
    $scope.tableDataArray = [];     //Data holds table data
    $scope.savedData;               //Data is a backup of all chart data

    //Device status
    $scope.onlinestatus;            //Online or offline
    $scope.devicename;              //Name of device
    $scope.onlinetime;              //When was the device seen
    $scope.customStyle = {};        //Color for text

    /*******************************************
    * Init
    ********************************************/

    //called on load
    function onload() {

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

      //set up callback
      activityFactory.registerUpdateCallback(function(){

          /*var today = new Date();
          var month = today.getMonth()+1;
          var day = today.getDate();*/

          //Get date chart
          $scope.chartdata = activityFactory.getChartData();
         
       
          //chartClick(month.toString() + day.toString());

        });
      //Trigger loading of data
      activityFactory.triggerChartData();
     
      //App data
      appFactory.getApps(function(data) {

      		//Save data
      		$scope.savedData = data;

       		//Get pie chart
      		var pieData = chartFactory.getAppChartData(data,dateFactory.getTodayString());
      		$scope.chartDataPie = pieData;

      		//Get Table data
      		$scope.tableDataArray = chartFactory.getAppTableData();
      		
      		
      });

    }
    onload();

    /*******************************************
    * Chart bar - https://github.com/chinmaymk/angular-charts/blob/master/README.md
    ********************************************/
    $scope.chartType = "bar";
    $scope.chartconfig = {
      title: 'Activity hours (click for details)',
      tooltips: true,
      labels: false,
      mouseover: function() { },
      mouseout: function() { },
      click: function(d) {  

       var temp;

       temp = this.x.substring(0, 2) + this.x.substring(3, 5);
       chartClick(temp);

     },
     legend: {
      display: true,
      position: 'right'
    }
  };

  function chartClick(clickDate){
    var array = [];
    var objDate;
    var timeId;

    //Clickdate is in format MMDD

    //Update table
    for(var i=0;i<$scope.savedData.length;i++) {
      timeId = $scope.savedData[i].timeid;
      objDate = timeId.toString();
      if(objDate.indexOf(clickDate) > -1) {
        array.push($scope.savedData[i]);
      }
    }
    //array = chartFactory.sortArray(array);
    //$scope.tableDataArray = array;

    //Update pie - TODO is not working with year wrap over

    clickDate = dateFactory.getYearString() + clickDate;
    var pieData = chartFactory.getAppChartData($scope.savedData,clickDate);
    $scope.chartDataPie = pieData;

    //Get Table data
    $scope.tableDataArray = chartFactory.getAppTableData();
  };

    /*******************************************
    * Chart pie
    ********************************************/

    $scope.chartTypePie = "pie";
    $scope.chartConfigPie = {
      title: 'Apps',
      tooltips: true,
      labels: true,
      mouseover: function() { },
      mouseout: function() { },
      click: function(d) {  
     },
     legend: {
      display: true,
      position: 'left'
    },
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
