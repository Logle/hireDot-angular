'use strict';

angular.module('hireDotApp')
  .controller('ProjectsCtrl', function ($scope, $http, socket, Project, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.projects = Project.allProjects;

    $scope.nextProjects = function() {
      Project.sortBy();
    };

    $scope.queryStatus = Project.queryStatus;
  });
