'use strict';

angular.module('hireDotApp')
  .controller('DevelopersCtrl', function ($scope, User) {
    $scope.users = User.allUsersForNgRepeat;

    $scope.nextUsers = function() {
      User.sortBy();
    };

    $scope.queryStatus = User.queryStatus;
  });
