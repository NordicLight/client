'use strict';

angular.module('clientApp')
.factory("dateFactory",[ function() {

	var factory = {};

	/*******************************************
    * Factory External Methods
    ********************************************/

    //date Int is of formnat YYYYMMDD
    factory.checkDateInt = function(dateInt){

        var dateString,year,month,day;

        dateString = dateInt.toString();
        year = dateString.substring(0,4);
        month = dateString.substring(4,6);
        day = dateString.substring(6,8);

        var d = new Date(year,month,day);

        if(d.getFullYear() !== parseInt(year) || d.getMonth() !== parseInt(month) || d.getDate() !== parseInt(day)){
            return null;
        }
        return d;
    };

    factory.getYearString = function () {
        var today,year;

        today = new Date();
        year = today.getFullYear();
        return year;
    };

    factory.getTodayString = function () {

    	var today,year,month,day,ret;

    	today = new Date();
    	year = today.getFullYear();
        month = today.getMonth()+1;
        day = today.getDate();

        if(month.toString().length === 1){
    		month = '0' + month;
    	}
    	if(day.toString().length === 1){
    		day = '0' + day;
    	}

	    ret = year.toString() + month.toString() + day.toString();
    	return ret;
    };

    factory.getTodayInt = function () {

    	var today,year,month,day,ret;

    	today = new Date();
    	year = today.getFullYear();
        month = today.getMonth()+1;
        day = today.getDate();

        if(month.toString().length === 1){
    		month = '0' + month;
    	}
    	if(day.toString().length === 1){
    		day = '0' + day;
    	}

	    ret = parseInt(year.toString() + month.toString() + day.toString());
    	return ret;
    };


    factory.getSearchDateInt = function (nbrDays) {

    	var oneWeekAgo, test,year,month,day,searchDate;

    	oneWeekAgo = new Date();
    	test = oneWeekAgo.setDate(oneWeekAgo.getDate() - nbrDays);
    	oneWeekAgo = new Date(test);

    	year = oneWeekAgo.getFullYear();
    	month = oneWeekAgo.getMonth()+1;
    	day = oneWeekAgo.getDate();

    	if(month.toString().length === 1){
    		month = '0' + month;
    	}
    	if(day.toString().length === 1){
    		day = '0' + day;
    	}

		//Get the search dat
		searchDate = parseInt(year.toString() + month.toString() + day.toString());

		return searchDate;

	};

	return factory;
}]);