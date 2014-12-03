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
  				var index = $scope.users.indexOf(user);
  				$scope.users.splice(index, 1);
  			})
  			.error(function() {
  				console.log('unable to delete user');
  			});
  	};

    $http.get('/api/cohorts')
      .success(function(cohorts) {
        $scope.cohorts = cohorts;
      })
      .error(function() {
        console.error('unable to get cohorts');
      });

    $scope.updateRole = function($event, user) {
      var oldRole = user.role;
      var newRole = $($event.target).text().toLowerCase();
      user.role = newRole;
      $http.put('/api/users/update', {user: user})
        .error(function() {
          console.error("unable to update user's role");
          user.role = oldRole; // reverts back to the original role if it doesn't update the database
        })
    };

    $scope.updateCohort = function(user) {
      $http.put('/api/users/update', {user: user})
        .error(function() {
          console.error("unable to update user's cohort");
          // revert back
        });
    };
  });
