'use strict';

describe('Controller: AdminPageCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var AdminPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPageCtrl = $controller('AdminPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
