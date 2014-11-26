'use strict';

angular.module('hireDotApp')
  .directive('developerCardProjects', function () {
    return {
      templateUrl: 'components/developer/developer-card-projects/developer-card-projects.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function(scope) {
        scope.projectPictureAvailable = function(project) {
          if (project.images.length > 0 &&
              project.images[0] &&
              project.images[0].crops) {
            return true;
          } else {
            return false;
          }
        };
      }
    };
  });