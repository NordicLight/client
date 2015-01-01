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
    $scope.deviceData=[];           //Data holds device navbar user information
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
          deviceid = $scope.deviceDataArray[$rootScope.activedIndex].deviceid;
          devicename = $scope.deviceDataArray[$rootScope.activedIndex].devicename;
          getOnlineData(deviceid,$rootScope.user,devicename);

          //Load chart data for first device
          activityFactory.triggerChartData(deviceid,$rootScope.user);

          //Get App data
          getAppData(deviceid,$rootScope.user);

      });

      //Callback for chart data triggered by triggerChartData
      activityFactory.registerUpdateCallback(function(){

          //Get date chart
          $scope.chartdata = activityFactory.getChartData();
         
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

    function getAppData(deviceid,user){

      //Get app data
      appFactory.getApps(deviceid,user,function(data) {

          //Save data
          $scope.savedData = data;

          //Get pie chart
          var pieData = chartFactory.getAppChartData(data,dateFactory.getTodayString());
          $scope.chartDataPie = pieData;

          //Get Table data
          $scope.tableDataArray = chartFactory.getAppTableData();
      });
    }

    function turnGreen (){
      $scope.customStyle.style = {'color':'green'};
    }

    function turnBlack (){
      $scope.customStyle.style = {'color':'red'};
    }

    /*******************************************
    * Chart bar - https://github.com/chinmaymk/angular-charts/blob/master/README.md
    ********************************************/
    $scope.chartType = "bar";
    $scope.chartconfig = {
      title: 'Apps Hours (click for details)',
      tooltips: true,
      labels: false,
      mouseover: function() { },
      mouseout: function() { },
      click: function(d) {  

       var temp;

       //temp = this.x.substring(0, 2) + this.x.substring(3, 5);
       temp = this.x.substring(0, 4) + this.x.substring(5, 7) + this.x.substring(8, 10);
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
    /*for(var i=0;i<$scope.savedData.length;i++) {
      timeId = $scope.savedData[i].timeid;
      objDate = timeId.toString();
      if(objDate.indexOf(clickDate) > -1) {
        array.push($scope.savedData[i]);
      }
    }*/
    //array = chartFactory.sortArray(array);
    //$scope.tableDataArray = array;

    //Update pie - TODO is not working with year wrap over
    //clickDate = dateFactory.getYearString() + clickDate;

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
  * Callbacks
  ********************************************/

  $scope.onDeviceClick = function(index){
      var deviceid;
      var devicename;

      $rootScope.activedIndex = index;

      //Load the data from the clicked device
      deviceid = $scope.deviceDataArray[index].deviceid;
      devicename = $scope.deviceDataArray[index].devicename;
      activityFactory.triggerChartData(deviceid,$rootScope.user);
      getAppData(deviceid,$rootScope.user);

      //Trigger online data
      getOnlineData(deviceid,$rootScope.user,devicename);
  };


  }]);
