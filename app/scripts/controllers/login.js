'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('LoginCtrl',['$scope','$http','$location','$rootScope','flash','configFactory','ngProgress', function ($scope,$http,$location,$rootScope,flash,configFactory,ngProgress) {

   var retPW;

   $scope.master = {};
   $scope.flash = flash;

   $scope.text = '';

   $scope.login = function() {

    var url;

        // This seems to take, on timt to time, some time. Use progress bar. will be tunned off in activity
        ngProgress.start();

        url = configFactory.getBaseURL() + 'user?user=';
        $http.get(url + $scope.user.email).
        success(function(data, status, headers, config) {

         if(data.length >0) {

           retPW = data[0].password;
           if(retPW == $scope.user.password) {

            $rootScope.user = $scope.user.email;
            $location.path('/activity');
          }else{
  						//TODO - add better user feedback
 						//window.alert("Incorrect password!");
            flash.setMessage('Incorrect password!');
            stopProgress();
          }

        }else{
  				//TODO - add better user feedback
         //window.alert("Failed to login!");
         flash.setMessage('Failed to login!');
         stopProgress();
       };

     }).
        error(function(data, status, headers, config) {
  			//TODO - add user feedback
        window.alert("Error!");
        stopProgress();
      });
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();

      function stopProgress() {
        //Stop progressbar - could have been initiated from login or create account
        ngProgress.stop();
        ngProgress.hide();
      }

    }]);
