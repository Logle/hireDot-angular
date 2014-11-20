'use strict';

describe('Controller: ProjectPageCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var ProjectPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectPageCtrl = $controller('ProjectPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
