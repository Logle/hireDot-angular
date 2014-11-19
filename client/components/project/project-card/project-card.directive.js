'use strict';

angular.module('hireDotApp')
  .directive('projectCard', function () {
    return {
      templateUrl: 'components/project/project-card/project-card.html',
      restrict: 'E',
      scope: {
        projectData: '=projectData'
      },
      link: function(scope, projectData) {
        scope.imageAvailable = function(projectData) {
          if (projectData.images.length > 0 &&
              projectData.images[0] &&
              projectData.images[0].crops) {
            return true;
          } else {
            return false;
          }
        };
      }
    };
  });