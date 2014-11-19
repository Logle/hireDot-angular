'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/projects',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });