'use strict';

describe('Controller: DisplayProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var DisplayCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisplayCtrl = $controller('DisplayCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
