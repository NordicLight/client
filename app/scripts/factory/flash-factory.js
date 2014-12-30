'use strict';

angular.module('flash', [])
.factory("flash",['$rootScope', function($rootScope) {

    var queue = [];
    var currentMessage = "";
    var show = false;

    $rootScope.$on("$routeChangeSuccess", function() {
      //currentMessage = queue.shift() || "";
      currentMessage = "";
      show = false;
    });

  return {

    clear: function(){
      currentMessage = "";
      show = false;
    },
    show: function() {
      return show;
    },
    setMessage: function(message) {
      //queue.push(message);
      currentMessage = message;
      show = true;
    },
    getMessage: function() {
      //return queue[0];
      return currentMessage;
    }

  };
}]);