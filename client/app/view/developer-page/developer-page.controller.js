'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, Developer, $stateParams) {
    $scope.developerData = Developer.get({ id: $stateParams.developer_id });
    $scope.showFunny = false;
    $scope.showTab = {
      projects: true,
      workExperiences: false,
      educations: false
    };

    $scope.show = function(tabName) {
      for (var key in $scope.showTab) {
        $scope.showTab[key] = false;
      }
      $scope.showTab[tabName] = true;
    };

    $scope.hasUrl = function(urlType) {
      return $scope.developerData.hasUrl(urlType);
    };

    $scope.hasProject = function() {
      return $scope.developerData.hasProject();
    };

    $scope.profilePictureAvailable = function() {
      return $scope.developerData.profilePictureAvailable();
    };

  });
