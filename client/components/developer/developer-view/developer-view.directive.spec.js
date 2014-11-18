'use strict';

describe('Directive: developerView', function () {

  // load the directive's module and view
  beforeEach(module('hireDotApp'));
  beforeEach(module('components/developer/developer-view/developer-view.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<developer-view></developer-view>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the developerView directive');
  }));
});