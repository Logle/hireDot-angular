'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('developers', {
        url: '/developers',
        templateUrl: 'app/developers/developers.html',
        controller: 'DevelopersCtrl'
      });
  });