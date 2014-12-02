'use strict';

angular.module('clientApp')
.factory("chartFactory", function() {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/

    var appList = [];

	/*******************************************
    * Factory External Methods
    ********************************************/
    function AppObj(name,timeid){
    	this.name = name;
    	this.runtime = 0;
    	this.timeid=timeid;
    }

    function isNameInList(name,list){

    	var i,app;

    	for(i=0;i<list.length;i++){

    		app = list[i];
    		if(name.valueOf() ===  app.name.valueOf()){
    			return true;
    		}
    	}

    	return false;
    }

    function durToMin(len){
      len = len/60; //get hours
      len = len.toFixed(2);
      len = parseFloat(len);
      return len;
  }

  function removeObjects(data,timeid){

  	var i;
  	var apps = [];

  	for(i=0;i<data.length;i++){
  		if(parseInt(timeid) === data[i].timeid){
  			apps.push(data[i]);
  		}
  	}

  	return apps;
  }

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.getAppTableData = function () {
    	return appList;
    };

    factory.getAppChartData = function (data,timeid) {

    	var jasonOne,jasonTwo,app,i,t,dur,name;
    	var graphData;

    	graphData = {series: [],data: []};
    	appList = [];

		//Remove all objects that is not matching timeid
		data = removeObjects(data,timeid);

		for(i=0;i<data.length;i++) {

			jasonOne = data[i];
			app = new AppObj(jasonOne.name,jasonOne.timeid);

			//Only allow one app although we can have multipla Jason app objects
			while(isNameInList(app.name,appList) === true){
				i++;
				if(i<data.lenth){
					jasonOne = data[i];
					app = new AppObj(jasonOne.name);
				}else{
					app = null;
					break;
				}
				
			}
			
			if(app !== null){

				//Update runtime via parsing data one more time
				for(t=0;t<data.length;t++){
					jasonTwo = data[t];
					if(app.name.valueOf() === jasonTwo.name.valueOf()){
						app.runtime = app.runtime + parseInt(jasonTwo.runtime);
					}
				}

				//add app to vector
				appList.push(app);
			}

		}

		//Construct the graph data		
		for(i=0;i<appList.length;i++){
			app = appList[i];

			//Add app name to serie
			graphData.series.push(app.name);

			//Add runtime to data
			dur = durToMin(app.runtime);
			//name = app.name + ' ' + dur + ' min';
			graphData.data.push({x:app.name,y:[dur]}); 
		}

		//Testing
		//graphData.series.push('Johan');
		//graphData.data.push({x:'test',y:[5]});

		return graphData;
	};

	return factory;

});