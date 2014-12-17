'use strict';

angular.module('clientApp')
.factory("snapshotFactory",[ function() {

	var factory = {};

	/*******************************************
    * Variables
    ********************************************/
    var snapshotButtonPressed = false;

	/*******************************************
    * Factory External Methods
    ********************************************/

    factory.setSnapshotRequested = function () {
    	snapshotButtonPressed = true;
    };

	factory.getSnapshotRequested = function () {

		if(snapshotButtonPressed){
			snapshotButtonPressed = false;
			return 'pressed';
		}else{
			return '';
		}
	};

	return factory;

}]);