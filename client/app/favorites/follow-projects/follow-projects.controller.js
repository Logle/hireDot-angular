'use strict';

angular.module('hireDotApp')
  .controller('FollowProjectsCtrl', function ($scope, Auth) {
    $scope.followProjects = Auth.getCurrentUser().followProjects;
  });
