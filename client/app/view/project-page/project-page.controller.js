'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, $stateParams, Project) {
    $scope.projectData = Project.get({ id: $stateParams.project_id});
    console.log($scope.projectData);
  });
