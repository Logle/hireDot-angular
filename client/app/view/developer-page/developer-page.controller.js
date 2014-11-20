'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, User, $stateParams) {
    $scope.developerData = User.get({ id: $stateParams.developer_id });

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
  });
