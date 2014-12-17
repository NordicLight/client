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
    $scope.deviceData="";           //Data holds device navbar user information
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

      //$scope.onlinestatus = 'Online';
      //$scope.devicename = 'Johans Mac';   

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
      //Trigger loading of data
      activityFactory.triggerChartData();

    }
    onload();

    function stopProgress() {
        //Stop progressbar - could have been initiated from login or create account
        ngProgress.stop();
        ngProgress.hide();
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

  /*$scope.chartconfig = {
  title: '', // chart title
  tooltips: true,
  labels: false, // labels on data points
  // exposed events
  mouseover: function() {},
  mouseout: function() {},
  click: function() {},
  // legend config
  legend: {
    display: true, // can be either 'left' or 'right'.
    position: 'left',
    // you can have html in series name
    htmlEnabled: false
  },
  // override this array if you're not happy with default colors
  colors: [],
  innerRadius: 0, // Only on pie Charts
  lineLegend: 'lineEnd', // Only on line Charts
  lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
  isAnimate: true, // run animations while rendering chart
  yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
  xAxisMaxTicks: 7 // Optional: maximum number of X axis ticks to show if data points exceed this number
};*/

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
* Chaning color of device status
********************************************/

function turnGreen (){
  $scope.customStyle.style = {'color':'green'};
}

function turnBlack (){
  $scope.customStyle.style = {'color':'black'};
}

}]);
