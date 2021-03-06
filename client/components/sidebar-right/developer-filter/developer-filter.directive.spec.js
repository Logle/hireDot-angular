'use strict';

describe('Directive: developerFilter', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/sidebar-right/developer-filter/developer-filter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<developer-filter></developer-filter>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the developerFilter directive');
  }));
});