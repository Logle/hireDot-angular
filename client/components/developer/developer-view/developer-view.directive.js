'use strict';

angular.module('hireDotApp')
  .directive('developerView', function () {
    return {
      templateUrl: 'components/developer/developer-view/developer-view.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function (scope) {
      }
    };
  });