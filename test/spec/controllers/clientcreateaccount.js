'use strict';

describe('Controller: ClientcreateaccountCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ClientcreateaccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientcreateaccountCtrl = $controller('ClientcreateaccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
