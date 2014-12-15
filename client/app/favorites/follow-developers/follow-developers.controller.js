'use strict';

angular.module('hireDotApp')
  .controller('FollowDevelopersCtrl', function ($scope, Auth) {
    $scope.followDevelopers = Auth.getCurrentUser().followDevelopers;
  });
