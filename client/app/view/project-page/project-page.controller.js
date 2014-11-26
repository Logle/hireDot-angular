'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, $stateParams, Project) {
    $scope.projectData = Project.get({ id: $stateParams.project_id});

    $scope.developerHasUrl = function(urlType, developerData) {
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
  });
