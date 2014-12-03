'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LogoutCtrl',['$scope','$location','$rootScope', function ($scope,$location,$rootScope) {
    
    $rootScope.logedin = false;
    $location.path('/login');

  }]);
