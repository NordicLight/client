'use strict';

describe('Controller: ClientloginCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ClientloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientloginCtrl = $controller('ClientloginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
