'use strict';

angular.module('clientApp')
.factory("snapshotFactory",['$rootScope', function($rootScope) {

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

        try {

            //All snappshots from all users are triggering this function. only notify this user if user match!
            if($rootScope.user == user || $rootScope.user.length > 0){
                snapshotButtonPressed = true;
            }

        }
        catch(err) {}
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