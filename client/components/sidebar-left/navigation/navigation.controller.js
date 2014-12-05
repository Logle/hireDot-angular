'use strict';

angular.module('hireDotApp')
  .controller('NavigationCtrl', function ($scope, $location, $window, Auth) {
    $scope.menu = [{
      title: 'Browse',
      logo: 'fa fa-suitcase',
      show: function() { return true; },
      subMenu: [{
        title: 'Projects',
        link: '/projects',
        show: function() { return true; }
      }, {
        title: 'Developers',
        link: '/developers',
        show: function() {
          return Auth.isLoggedIn();
        }
      }],
      showSubMenu: false
    }, {
      title: 'Favorites',
      logo: 'fa fa-star',
      show: function() {
        return Auth.isLoggedIn();
      },
      subMenu: [{
        title: 'Projects',
        show: function() {
          return Auth.isLoggedIn();
        }
      }, {
        title: 'Developers',
        show: function() {
          return Auth.isLoggedIn();
        }
      }],
      showSubMenu: false
    },{
      title: 'My Portfolio',
      logo: 'fa fa-user',
      show: function() {
        return Auth.isLoggedIn();
      },
      subMenu: [{
        title: 'Edit Profile',
        link: '/my_portfolio/edit_profile',
        show: function() {
          return Auth.isLoggedIn();
        }
      }, {
        title: 'Create and Edit Projects',
        link: '/my_portfolio/create_edit_projects',
        show: function() {
          return Auth.isLoggedIn();
        }
      }, {
        title: 'Visitors',
        link: '/my_portfolio/visitors',
        show: function() {
          return Auth.isLoggedIn();
        }
      }],
      showSubMenu: false
    }, {
      title: 'Admin Page',
      logo: 'fa fa-gears',
      show: function() {
        return Auth.isAdmin();
      },
      subMenu: [{
        title: 'Assign Users',
        link: '/admin_page',
        show: function() {
          return Auth.isAdmin();
        }
      }, {
        title: 'Invite Users',
        link: '/admin_page',
        show: function() {
          return Auth.isAdmin();
        }
      }, {
        title: 'Something Else',
        link: '/admin_page',
        show: function() {
          return Auth.isAdmin();
        }
      }],
      showSubMenu: false
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.showSub = function(item) {
      $scope.menu.forEach(function(item) {
        item.showSubMenu = false;
      });
      item.showSubMenu = true;
    };
  });