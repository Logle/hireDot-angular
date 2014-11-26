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
          return developerData.hasUrl(urlType);
        };

        scope.profilePictureAvailable = function(developerData) {
          return developerData.profilePictureAvailable();
        };
      }
    };
  });