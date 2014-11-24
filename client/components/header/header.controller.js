'use strict';

angular.module('hireDotApp')
  .controller('HeaderCtrl', function ($scope, $location, $window, Auth, $rootScope) {
    $rootScope.collapseLeftPanel = false;
    $rootScope.collapseRightPanel = false;

    $scope.toggleLeftPanel = function() {
      $rootScope.collapseLeftPanel = !$rootScope.collapseLeftPanel;
      $rootScope.collapseRightPanel = false;
    };

    $scope.toggleRightPanel = function() {
      $rootScope.collapseRightPanel = !$rootScope.collapseRightPanel;
      $rootScope.collapseLeftPanel = true;
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.getCurrentUser = Auth.getCurrentUser;
  });