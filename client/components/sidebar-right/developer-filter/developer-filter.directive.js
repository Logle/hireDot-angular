'use strict';

angular.module('hireDotApp')
  .directive('developerFilter', function () {
    return {
      templateUrl: 'components/sidebar-right/developer-filter/developer-filter.html',
      restrict: 'E',
      controller: function (scope, element, attrs) {
      }
    };
  });