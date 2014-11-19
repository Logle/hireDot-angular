'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, User) {
    $scope.developers = User.query();
    console.log($scope.developers);
    scope.showFunny = false;

    $scope.showTab = {
      projects: true,
      workExperiences: false,
      educations: false
    };

    $scope.show = function(tabName) {
      for (var key in scope.showTab) {
        scope.showTab[key] = false;
      }
      scope.showTab[tabName] = true;
    };
  });
