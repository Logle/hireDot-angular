'use strict';

angular.module('hireDotApp')
  .controller('HeaderCtrl', function ($scope, $location, $window, Auth, $rootScope) {
    $rootScope.collapseLeftPanel = false;
    $rootScope.collapseRightPanel = true;

    $scope.toggleLeftPanel = function() {
      $rootScope.collapseLeftPanel = !$rootScope.collapseLeftPanel;
      $rootScope.collapseRightPanel = true;
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

    // auto-hide both panels for mobile views
    if (window.innerWidth < 768) {
      $rootScope.collapseLeftPanel = true;
      $rootScope.collapseRightPanel = true;
    }

    $(window).resize(function() {
      $scope.$apply(function() {
        if (window.innerWidth < 768) {
          $rootScope.collapseLeftPanel = true;
          $rootScope.collapseRightPanel = true;
        }
      });
    });
  });