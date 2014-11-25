'use strict';

angular.module('hireDotApp')
  .controller('DevelopersCtrl', function ($scope, Developer) {
    $scope.developers = Developer.allDevelopersForNgRepeat;

    $scope.nextDevelopers = function() {
      Developer.sortBy();
    };

    $scope.queryStatus = Developer.queryStatus;
  });
