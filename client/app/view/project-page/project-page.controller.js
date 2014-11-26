'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, $stateParams, Project) {
    $scope.projectData = Project.get({ id: $stateParams.project_id});
    // console.log($scope.projectData);
    $scope.hasUrl = function(){
    	if (($scope.projectData.hasOwnProperty('url'))&&($scope.projectData.url != null)) return false
    		else return true;
    };
    $scope.hasGitHub = function(){
    	if (($scope.projectData.hasOwnProperty('githubUrl'))&&($scope.projectData.githubUrl != null)) return false
    		else return true;
    };
    $scope.hasStack = function(){
    	if (($scope.projectData.hasOwnProperty('techTags'))&&($scope.projectData.techTags != null)) return false
    		else return true;
    };
  });
