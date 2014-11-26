'use strict';

describe('Directive: developerCardProjects', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/developer/developer-card-projects/developer-card-projects.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<developer-card-projects></developer-card-projects>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the developerCardProjects directive');
  }));
});