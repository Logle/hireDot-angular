'use strict';

describe('Controller: AdminInvitationCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var AdminInvitationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminInvitationCtrl = $controller('AdminInvitationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
