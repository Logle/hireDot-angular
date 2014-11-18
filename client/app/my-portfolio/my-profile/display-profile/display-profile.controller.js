'use strict';

angular.module('hireDotApp')
  .controller('DisplayProfileCtrl', function ($scope, User) {
    $scope.developers = User.query();
    console.log($scope.developers);
  });
