'use strict';

angular.module('hireDotApp')
  .directive('developerCard', function () {
    return {
      templateUrl: 'components/developer/developer-card/developer-card.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function(scope) {
        scope.hasUrl = function(developerData, urlType) {
          return developerData.hasUrl(urlType);
        };

        scope.hasProject = function(developerData) {
          return developerData.hasProject();
        };

        scope.profilePictureAvailable = function(developerData) {
          return developerData.profilePictureAvailable();
        };

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