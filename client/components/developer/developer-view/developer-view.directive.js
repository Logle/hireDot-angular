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
        scope.showFunny = false;

        scope.showTab = {
          projects: true,
          workExperiences: false,
          educations: false
        };

        scope.show = function(tabName) {
          for (var key in scope.showTab) {
            scope.showTab[key] = false;
          }
          scope.showTab[tabName] = true;
        };
      }
    };
  });