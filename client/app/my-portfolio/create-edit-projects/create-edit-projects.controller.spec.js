'use strict';

describe('Controller: CreateEditProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var CreateEditProjectsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateEditProjectsCtrl = $controller('CreateEditProjectsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
