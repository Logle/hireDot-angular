'use strict';

angular.module('hireDotApp')
  .controller('EditProfileCtrl', function ($scope) {
    $scope.message = 'Hello';
	$scope.jobs = [];
  	$scope.addWork = function () {
  		$scope.jobs.push($scope.currentWork);
      $scope.currentWork = {};
  };
  $scope.colleges = [];
    $scope.addSchool = function () {
      $scope.colleges.push($scope.currentc);
      $scope.currentc = {};
  };
  $scope.remove = function(arrayToRemoveFrom, row) {
    arrayToRemoveFrom.splice(row,1);
  };
});