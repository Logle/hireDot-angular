'use strict';

angular.module('hireDotApp')
  .controller('NavigationCtrl', function ($scope, $location, $window, Auth) {
    $scope.menu = [{
      title: 'Browse',
      link: '/',
      logo: 'fa fa-suitcase',
      showSubMenu: false,
      subMenu: [{
        title: 'Projects',
        link: '/'
      }, {
        title: 'Developers',
        link: '/developers'
      }]
    }, {
      title: 'My Portfolio',
      link: '/my_portfolio',
      logo: 'fa fa-user',
      showSubMenu: false,
      subMenu: [{
        title: 'Display Profile',
        link: '/my_portfolio/display_profile'
      }, {
        title: 'Edit Profile',
        link: '/my_portfolio/edit_profile'
      }]
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });