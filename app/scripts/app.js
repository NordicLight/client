'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'angularCharts',
    'uiGmapgoogle-maps',
    'flash',
    'ngProgress',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/createaccount', {
        templateUrl: 'views/createaccount.html',
        controller: 'CreateaccountCtrl'
      })
      .when('/app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/screenshot', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/chatclient', {
        templateUrl: 'views/chatclient.html',
        controller: 'ChatclientCtrl'
      })
      .when('/clientlogin', {
        templateUrl: 'views/clientlogin.html',
        controller: 'ClientloginCtrl'
      })
      .when('/clientcreateaccount', {
        templateUrl: 'views/clientcreateaccount.html',
        controller: 'ClientcreateaccountCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
