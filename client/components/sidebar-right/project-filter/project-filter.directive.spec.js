'use strict';

describe('Directive: projectFilter', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/sidebar-right/project-filter/project-filter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<project-filter></project-filter>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the projectFilter directive');
  }));
});