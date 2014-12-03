'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('LoginCtrl',['$scope','$http','$location','$rootScope','flash','configFactory', function ($scope,$http,$location,$rootScope,flash,configFactory) {

   var retPW;

   $scope.master = {};
   $scope.flash = flash;

   $scope.text = '';

   $scope.login = function() {

        var url;

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
          }

        }else{
  				//TODO - add better user feedback
         //window.alert("Failed to login!");
         flash.setMessage('Failed to login!');
       };

     }).
        error(function(data, status, headers, config) {
  			//TODO - add user feedback
        window.alert("Error!");
      });
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();

    }]);
