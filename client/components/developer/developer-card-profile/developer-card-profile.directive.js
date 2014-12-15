'use strict';

angular.module('hireDotApp')
  .directive('developerCardProfile', function () {
    return {
      templateUrl: 'components/developer/developer-card-profile/developer-card-profile.html',
      restrict: 'E',
      scope: {
        developerData: '=developerData'
      },
      link: function(scope) {
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

        scope.profilePictureAvailable = function(developerData) {
          if (developerData.linkedin.pictureUrl || (developerData.profilePicture &&
              developerData.profilePicture.crops)) {
            return true;
          } else {
            return false;
          }
        };
      }
    };
  });