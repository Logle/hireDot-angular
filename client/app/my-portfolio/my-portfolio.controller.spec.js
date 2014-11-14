'use strict';

describe('Controller: MyPortfolioCtrl', function () {

  // load the controller's module
  beforeEach(module('hireDotApp'));

  var MyPortfolioCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyPortfolioCtrl = $controller('MyPortfolioCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
