'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ActivityCtrl',['$scope','$rootScope','activityFactory','dateFactory','ngProgress','$location', function ($scope,$rootScope,activityFactory,dateFactory,ngProgress,$location) {

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
    $scope.onlinetime;         //When was the device seen
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

        //Load chart data for first device
        activityFactory.triggerChartData(deviceid,$rootScope.user);

      });

      //Callback for chart data triggered by triggerChartData
      activityFactory.registerUpdateCallback(function(){

        var today = new Date();
        var month = today.getMonth()+1;
        var day = today.getDate();

          //extract data
          $scope.chartdata = activityFactory.getChartData();
          $scope.tableDataArray = activityFactory.getTableData();
          $scope.savedData = $scope.tableDataArray;

          var date = dateFactory.getTodayString();
          date = date.substring(4,8);

          chartClick(date);
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

      function stopProgress() {
        //Stop progressbar - could have been initiated from login or create account
        ngProgress.stop();
        ngProgress.hide();
      }

      function turnGreen (){
        $scope.customStyle.style = {'color':'green'};
      }

      function turnBlack (){
        $scope.customStyle.style = {'color':'red'};
      }

    /*******************************************
    * Chart - https://github.com/chinmaymk/angular-charts/blob/master/README.md
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
    },
  };

  function chartClick(clickDate){
    var array = [];
    var objDate;
    var timeId;

    for(var i=0;i<$scope.savedData.length;i++) {
      timeId = $scope.savedData[i].timeid;
      objDate = timeId.toString();
      if(objDate.indexOf(clickDate) > -1) {
        array.push($scope.savedData[i]);
      }
    }

    $scope.tableDataArray = array;
  }

  /*******************************************
  * Callbacks
  ********************************************/

  $scope.onDeviceClick = function(index){
      var deviceid;
      var devicename;

      //Load the data from the clicked device
      deviceid = $scope.deviceDataArray[index].deviceid;
      devicename = $scope.deviceDataArray[index].devicename;
      activityFactory.triggerChartData(deviceid,$rootScope.user);

      //Trigger online data
      getOnlineData(deviceid,$rootScope.user,devicename);
  };

}]);
