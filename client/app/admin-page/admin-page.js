'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin_page', {
        url: '/admin_page',
        templateUrl: 'app/admin-page/admin-page.html',
        controller: 'AdminPageCtrl'
      });
  });