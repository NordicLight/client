'use strict';

angular.module('clientApp')
.factory("snapshotFactory",[ function() {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var snapshotButtonPressed = false;
    var myDeviceid = '';
    var myUser = '';
    var myToken = '';

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.setSnapshotRequested = function (deviceid,user,token) {
    	
    	myDeviceid = deviceid;
    	myUser = user;
    	myToken = token;

    	snapshotButtonPressed = true;
    };

	factory.getSnapshotRequested = function () {

		var retString = '';

		if(snapshotButtonPressed){
			snapshotButtonPressed = false;
			retString = 'pressed' + ',' + myDeviceid + ',' + myUser + ',' + myToken; 
			return retString;
		}else{
			return '';
		}
	};

	return factory;

}]);