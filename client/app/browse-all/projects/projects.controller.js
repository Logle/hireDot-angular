'use strict';

angular.module('hireDotApp')
  .controller('ProjectsCtrl', function ($scope, $http, socket, Project) {
    $scope.projects = Project.allProjects;
  });
