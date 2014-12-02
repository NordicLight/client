'use strict';

angular.module('clientApp')
.factory("activityFactory", function($http,dateFactory) {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var observerCallback = [];	 				//Callback back to controller

    var tableDataArray = [];     				//Table data
    var graphData = {series: [],data: []};		//Graph data

	/*******************************************
    * Internal Methods
    ********************************************/

    function TableData(timeid,device,day,start,stop,dur){
    	this.timeid = timeid;
    	this.device = device;
    	this.day = day;
    	this.start = start;
    	this.stop = stop;
    	this.dur = dur;
    }

    function durToHour(len){
      len = len/3600; //get hours
      len = len.toFixed(1);
      len = parseFloat(len);
      return len;
  	}

  	function durToMin(len){
      len = len/60; //get hours
      len = len.toFixed(0);
      len = parseFloat(len);
      return len;
  	}

  	function extractAndSaveData(data){
  		var obj;
  		var temp;

	    //Empty array
	    while(tableDataArray.length>0) {
	      	tableDataArray.pop();
	     }

	    for(var i=0;i<data.length;i++){
	     	obj = data[i];
	      	temp = new TableData(obj.timeid,obj.devicename,obj.sleep.substring(0,10),obj.awake.substring(11,19),obj.sleep.substring(11,19),durToMin(obj.duration));
	      	tableDataArray.push(temp);
	     }
  	}

    /*******************************************
    * Factory External Methods
    ********************************************/

    factory.test = function() {
    	return 'hej';
    };

    factory.registerUpdateCallback = function (callback) {
    	observerCallback[0] = callback;
    };

    factory.getTableData = function () {
    	return tableDataArray;
    };

    factory.getChartData = function () {
    	return graphData;
    };

    factory.getDeviceData = function (callback) {
    	$http.get('http://localhost:1337/activity/getdevices').success(callback);
    };

    factory.triggerChartData = function () {

      var searchDate;
      searchDate = dateFactory.getSearchDateInt(14);

	  //on load to get chart
	  $http.get('http://localhost:1337/activity/getitems?timeid=' + searchDate).success(function(data) {

	  	var len;
	  	var obj;
	  	var dateid;
	  	var tempArray = [];
	  	var i; 
	  	var loop; 
	  	var name;
      var lasttime;

        //Convert data format to right format for table
        extractAndSaveData(data);

        if(data.length>0) {

        	loop = true;
        	i = 0;
        	while(loop){

        		obj = data[i];
        		dateid = obj.timeid;

              //Add empty days to fill gaps in serie - Before date id will miss empty dates after
              while(dateid !== searchDate) {

                 //We need to check date to get wrap arounds
                if(dateFactory.checkDateInt(searchDate) === null){
                  break;
                }

              	name = searchDate.toString();
              	name = name.substring(4, 6) + '-' + name.substring(6, 8);
              	tempArray.push({x:name,y:[0]}); 
              	searchDate++;
              }

              len = 0;
              while(dateid === obj.timeid) {
                  //Combine duration of several logged objects in one day
                  len = len + obj.duration;
                  name = obj.timeid.toString();
                  name = name.substring(4, 6) + '-' + name.substring(6, 8);
                  i++;
                  if(i<data.length){
                  	obj = data[i];
                  }else{
                  	loop = false;
                  	break;
                  }
              }

              len = durToHour(len);
              tempArray.push({x:name,y:[len]}); 

          }

          graphData.data = tempArray;

          console.log(graphData);
          //$scope.chartdata = graphData;
      }

         //Add today if it is missing - The algo above only backfills
         lasttime = data[data.length-1].timeid;
         if(lasttime < dateFactory.getTodayInt()){
            //No data is logged today. Add today so that it looks better!
              name = dateFactory.getTodayString().substring(4, 6) + '-' + dateFactory.getTodayString().substring(6, 8);
              tempArray.push({x:name,y:[0]}); 

         }

         //Call callback when we are done
         if(observerCallback.length > 0) {
         	var callback = observerCallback[0];
         	callback();
         }

     }).error(function(data) {
     });

     //return graphData;
 };

 return factory;

});