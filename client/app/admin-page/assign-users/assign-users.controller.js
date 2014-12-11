'use strict';

angular.module('hireDotApp')
  .controller('AssignUsersCtrl', function ($scope, $http, User, Cohort) {
    $scope.users = User.allUsersForNgRepeat;

    $scope.nextUsers = function() {
      User.sortBy();
    };

    $scope.queryStatus = User.queryStatus;

    $scope.userRoles = ['user', 'developer', 'employer', 'admin'];

    $scope.cohorts = Cohort.cohorts;

    $scope.assignRole = function(userData, roleType) {
      console.log(userData);
      // console.log(roleType);
    };

    $scope.checkCohort = function(user, cohorts) {
      var foundCohort = false;

      cohorts.forEach(function(cohort) {
        if (user.cohort &&
            user.cohort.name === cohort.name) foundCohort = true;
      });

      if (!foundCohort) user.cohort = cohorts[0];
    };

    $scope.deleteUser = function(user) {
      user.delete();
    };

  	// refactor this using q and promises or something
   //  $http.get('/api/users/getAll')
  	// 	.success(function(users) {
  	// 		$scope.users = users;
   //      $http.get('/api/cohorts')
   //        .success(function(cohorts) {
   //          $scope.cohorts = cohorts;
   //          $scope.users.forEach(function(user) {
   //            var index;
   //            for (var i = 0, len = $scope.cohorts.length; i < len; i++) {
   //              if (user.cohort && user.cohort._id === $scope.cohorts[i]._id) {
   //                index = i;
   //                break;
   //              }
   //            }
   //            user.cohort = $scope.cohorts[index];
   //          });
   //        })
   //        .error(function() {
   //          console.error('unable to get cohorts');
   //        });
  	// 	})
  	// 	.error(function() {
  	// 		console.error('unable to get users');
  	// 	});

  	// $scope.delete = function(user) {
  	// 	$http.delete('/api/users/' + user._id)
  	// 		.success(function() {
  	// 			var index = $scope.users.indexOf(user);
  	// 			$scope.users.splice(index, 1);
  	// 		})
  	// 		.error(function() {
  	// 			console.log('unable to delete user');
  	// 		});
  	// };

   //  $scope.updateRole = function($event, user) {
   //    var oldRole = user.role;
   //    var newRole = $($event.target).text().toLowerCase();
   //    user.role = newRole;
   //    $http.put('/api/users/update', {user: user})
   //      .error(function() {
   //        console.error("unable to update user's role");
   //        user.role = oldRole; // reverts back to the original role if it doesn't update the database
   //      })
   //  };

   //  $scope.updateCohort = function(user) {
   //    $http.put('/api/users/update', {user: user})
   //      .error(function() {
   //        console.error("unable to update user's cohort");
   //        // revert back
   //      });
   //  };

   //  $scope.toggleApprove = function(user) {
   //    user.approvedAsDeveloper = !user.approvedAsDeveloper;
   //    $http.put('/api/users/update', {user: user})
   //      .error(function() {
   //        console.error("unable to update user's approval");
   //        // revert back
   //      });
   //  };
  });