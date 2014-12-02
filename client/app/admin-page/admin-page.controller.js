'use strict';

angular.module('hireDotApp')
  .controller('AdminPageCtrl', function ($scope, $http) {
  	$http.get('/api/users/getAll')
  		.success(function(users) {
  			$scope.users = users;
  		})
  		.error(function() {
  			console.error('unable to get users');
  		});
  });
