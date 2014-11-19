'use strict';

angular.module('hireDotApp')
  .controller('DevelopersCtrl', function ($scope, User) {
    $scope.developers = User.query();
  });
