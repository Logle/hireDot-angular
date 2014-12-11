'use strict';

describe('Controller: AssignUsersCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var AssignUsersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignUsersCtrl = $controller('AssignUsersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
