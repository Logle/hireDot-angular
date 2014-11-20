'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, Project) {
  	// Project.search();
  	$scope.projects = Project.query();
  	console.log($scope.projects);
  	// $scope.oneExample = Project.query()[0];
    // $scope.message = 'Hello';
  });
