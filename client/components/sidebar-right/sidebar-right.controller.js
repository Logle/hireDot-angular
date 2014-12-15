'use strict';

angular.module('hireDotApp')
  .controller('SidebarRightCtrl', function ($scope, $http, socket, Project, Auth, $state) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.isAdmin = Auth.isAdmin;

    $scope.stateCheck = function(stateType) {
      var currentState = $state.current.name;

      var stateCheck = false;

      switch(stateType) {
        case 'projects':
          var allowedState = ['main', 'admin_page.assign_projects'];
          if (allowedState.indexOf(currentState) !== -1) stateCheck = true;
          break;
        case 'developers':
          var allowedState = ['developers'];
          if (allowedState.indexOf(currentState) !== -1) stateCheck = true;
          break;
        case 'users':
          var allowedState = ['admin_page.assign_users'];
          if (allowedState.indexOf(currentState) !== -1) stateCheck = true;
          break;
      }

      return stateCheck;
    };
  });
