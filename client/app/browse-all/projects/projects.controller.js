'use strict';

angular.module('hireDotApp')
  .controller('ProjectsCtrl', function ($scope, $http, socket, Project, Auth) {
    $scope.projects = Project.allProjects;
    $scope.isLoggedIn = Auth.isLoggedIn;
  });
