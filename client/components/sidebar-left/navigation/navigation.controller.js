'use strict';

angular.module('hireDotApp')
  .controller('NavigationCtrl', function ($scope, $location, $window, Auth) {
    $scope.menu = [{
      title: 'Projects',
      link: '/',
      logo: 'fa fa-suitcase',
      showSubMenu: false,
      subMenu: [{
        title: 'Link 1',
        link: '/'
      }, {
        title: 'Link 2',
        link: '/'
      }]
    },{
      title: 'Developers',
      link: '/developers',
      logo: 'fa fa-users',
      showSubMenu: false,
      subMenu: [{
        title: 'Link 1',
        link: '/'
      }, {
        title: 'Link 2',
        link: '/'
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