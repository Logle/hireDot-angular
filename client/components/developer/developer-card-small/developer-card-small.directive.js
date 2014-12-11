'use strict';

angular.module('hireDotApp')
  .directive('developerCardSmall', function () {
    return {
      templateUrl: 'components/developer/developer-card-small/developer-card-small.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function(scope) {
        scope.developerHasUrl = function(urlType, developerData) {
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
      }
    };
  });