'use strict';

angular.module('hireDotApp')
  .controller('EditProfileCtrl', function ($scope) {
    $scope.message = 'Hello';
	$scope.jobs = [];
  	$scope.addWork = function () {
  		var newJob = {
  			CN: $scope.CN,
  			title: $scope.title,
  			sd: $scope.sd,
  			ed: $scope.ed
  		}
  		console.log('adding: ', newJob)
  		$scope.jobs.push(newJob);
  };
});