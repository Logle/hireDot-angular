'use strict';

describe('Directive: developerCardProfile', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/developer/developer-card-profile/developer-card-profile.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<developer-card-profile></developer-card-profile>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the developerCardProfile directive');
  }));
});