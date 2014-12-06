'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ActivityCtrl',['$scope','$rootScope','activityFactory','dateFactory','ngProgress', function ($scope,$rootScope,activityFactory,dateFactory,ngProgress) {

    //TODO
    /*if($rootScope.user.length == 0){
      return;
    };*/

    /*******************************************
    * Variables
    ********************************************/
    $scope.deviceData="";           //Data holds device navbar
    $scope.tableDataArray = [];     //Data holds table data
    $scope.savedData;               //Data is a backup of all chart data

    /*******************************************
    * Init
    ********************************************/

    //called on load
    function onload() {

      ngProgress.stop();
      ngProgress.hide();

      activityFactory.getDeviceData(function(data) {
        $scope.deviceData = data; 
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
    * Backup
    ********************************************/

    //On load - Extract unique devices for navbar
      /*$http.get("http://localhost:1337/activity/getdevices").success(function(data) {
        $scope.deviceData=data;
      }).error(function(data){
      });*/

    //load on start
    /*angular.element(document).ready(function(){
      console.log("start");
      $scope.addData();
    });*/

    //Button TESTING
    /*$scope.loadData = function() {
      $scope.textAreaData="Fetching data...";

      $http.get("http://localhost:1337/activity").success(function(data) {
        $scope.textAreaData = data;
        $scope.savedData = data;
        $scope.tableData=data;
      }).error(function(data){
      });
};*/

    //Load table  
    /*function loadTextArea(e) {
      $scope.textAreaData=$scope.tableDataArray[e];
     
    };
    $scope.viewActivity = loadTextArea;*/

      //On load - get all data from database
     /* $http.get("http://localhost:1337/activity").success(function(data) {
        $scope.textAreaData = data;
        $scope.tableData=data;

        extractData(data);

      }).error(function(data){
      });*/

}]);
