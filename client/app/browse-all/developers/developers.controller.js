'use strict';

angular.module('hireDotApp')
  .controller('DevelopersCtrl', function ($scope, User) {
    $scope.developers = User.allUsersForNgRepeat;

    $scope.nextDevelopers = function() {
      User.sortBy();
    };

    $scope.queryStatus = User.queryStatus;
  });
