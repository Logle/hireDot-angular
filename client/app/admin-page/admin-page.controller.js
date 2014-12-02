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

  	$scope.delete = function(user) {
  		$http.delete('/api/users/' + user._id)
  			.success(function() {

  			})
  			.error(function() {
  				console.log('unable to delete user');
  			});
  	};
  });
