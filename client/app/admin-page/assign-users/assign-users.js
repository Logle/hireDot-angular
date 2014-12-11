'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin_page.assign_users', {
        url: '/assign_users',
        templateUrl: 'app/admin-page/assign-users/assign-users.html',
        controller: 'AssignUsersCtrl'
      });
  });
