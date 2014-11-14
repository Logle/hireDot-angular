'use strict';

describe('Controller: EditTeamCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var EditTeamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditTeamCtrl = $controller('EditTeamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
