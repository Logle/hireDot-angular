'use strict';

describe('Directive: projectCard', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/project/project-card/project-card.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<project-card></project-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the projectCard directive');
  }));
});