'use strict';

angular.module('hireDotApp')
  .directive('developerCard', function () {
    return {
      templateUrl: 'components/developer/developer-card/developer-card.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function(scope, developerData) {
        scope.hasUrl = function(developerData, urlType) {
          switch(urlType) {
            case 'email':
              if (developerData.email && developerData.email !== "") { return true; }
              break;
            case 'linkedin':
              if (developerData.linkedinUrl && developerData.linkedinUrl !== "") { return true; }
              break;
            case 'github':
              if (developerData.githubUrl && developerData.githubUrl !== "") { return true; }
              break;
            case 'facebook':
              if (developerData.facebookUrl && developerData.facebookUrl !== "") { return true; }
              break;
            case 'twitter':
              if (developerData.twitterUrl && developerData.twitterUrl !== "") { return true; }
              break;
          }

          return false;
        };

        scope.hasProject = function(developerData) {
          if (developerData.projects !== null && developerData.projects.length !== 0) return true;
          return false;
        };
      }
    };
  });