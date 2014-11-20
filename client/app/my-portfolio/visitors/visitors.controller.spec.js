'use strict';

describe('Controller: VisitorsCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var VisitorsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisitorsCtrl = $controller('VisitorssCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
