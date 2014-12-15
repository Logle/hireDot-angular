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

    $scope.checkCohort = function(user, cohorts) {
      var foundCohort = false;

      cohorts.forEach(function(cohort) {
        if (user.cohort &&
            user.cohort.name === cohort.name) foundCohort = true;
      });

      if (!foundCohort) user.cohort = cohorts[0];
    };

    $scope.deleteUser = function(user) {
      var userIdToDelete = user._id,
          devPosition;

      user.$delete(function onSuccess() {
            $scope.users.some(function(user, index) {
              if (user._id === userIdToDelete) {
                devPosition = index;
                return true;
              }
            });

            $scope.users.splice(devPosition, 1);
          });
    };

    $scope.hired = [true, false];

    $scope.updateUser = function(userData, updateType) {
      var modifiedUserData = {
        _id: userData._id
      };

      var onSuccess, onError;

      switch(updateType) {
        case 'role':
          modifiedUserData.role = userData.role;
          onSuccess = function() {
            userData.updateRoleSuccess = true;
            setTimeout(function() {
              userData.updateRoleSuccess = false;
              $scope.$apply();
            }, 2000);
          };
          onError = function() {
            userData.updateRoleError = true;
            setTimeout(function() {
              userData.updateRoleError = false;
              $scope.$apply();
            }, 2000);
          };
          break;
        case 'cohort':
          modifiedUserData.cohort = userData.cohort._id;
          onSuccess = function() {
            userData.updateCohortSuccess = true;
            setTimeout(function() {
              userData.updateCohortSuccess = false;
              $scope.$apply();
            }, 2000);
          };
          onError = function() {
            userData.updateCohortError = true;
            setTimeout(function() {
              userData.updateCohortError = false;
              $scope.$apply();
            }, 2000);
          };
          break;
        case 'hired':
          modifiedUserData.hired = userData.hired;
          onSuccess = function() {
            userData.updateHiredSuccess = true;
            setTimeout(function() {
              userData.updateHiredSuccess = false;
              $scope.$apply();
            }, 2000);
          };
          onError = function() {
            userData.updateHiredError = true;
            setTimeout(function() {
              userData.updateHiredError = false;
              $scope.$apply();
            }, 2000);
          };
          break;
      }

      User.update(modifiedUserData)
          .$promise
          .then(onSuccess, onError);
    };
  });
