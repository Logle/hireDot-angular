'use strict';

angular.module('hireDotApp')
  .controller('MainCtrl', function ($scope, $http, socket, Project) {
    $scope.projects = Project.allProjects;
  });
