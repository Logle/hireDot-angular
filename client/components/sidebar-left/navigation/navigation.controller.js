'use strict';

angular.module('hireDotApp')
  .controller('NavigationCtrl', function ($scope, $location, $window, Auth) {
    $scope.menu = [{
      title: 'Browse',
      logo: 'fa fa-suitcase',
      showSubMenu: false,
      subMenu: [{
        title: 'Projects',
        link: '/projects'
      }, {
        title: 'Developers',
        link: '/developers'
      }]
    }, {
      title: 'Favorites',
      logo: 'fa fa-star',
      showSubMenu: false,
      subMenu: [{
        title: 'Projects'
      }, {
        title: 'Developers'
      }]
    },{
      title: 'My Portfolio',
      logo: 'fa fa-user',
      showSubMenu: false,
      subMenu: [{
        title: 'Edit Profile',
        link: '/my_portfolio/edit_profile'
      }, {
        title: 'Create and Edit Projects',
        link: '/my_portfolio/create_edit_projects'
      }, {
        title: 'Visitors',
        link: '/my_portfolio/visitors'
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