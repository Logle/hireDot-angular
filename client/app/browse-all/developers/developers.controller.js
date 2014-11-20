'use strict';

angular.module('hireDotApp')
  .controller('DevelopersCtrl', function ($scope, Developer) {
    $scope.developers = Developer.query();
  });
