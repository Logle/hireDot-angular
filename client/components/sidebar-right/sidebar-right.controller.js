'use strict';

angular.module('hireDotApp')
  .controller('SidebarRightCtrl', function ($scope, $http, socket, Project, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
  });
