'use strict';

describe('Controller: DeveloperPageCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var DeveloperPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeveloperPageCtrl = $controller('DeveloperPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
