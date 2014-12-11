'use strict';


angular.module('clientApp')
.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:1337');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

/*angular.module('clientApp')
.factory('mySocket',['socketFactory', function (socketFactory) {
	

      var socket = socketFactory('http://localhost:1337/user');
      socket.forward('broadcast');
      return socket;
  }]);*/

/*angular.module('clientApp').factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:1337/user/listen');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});*/