'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.display-profile', {
        url: '/display-profile',
        views: {
        "display-profile": {
          templateUrl: 'app/my-portfolio/profile/display-profile/display-profile.html',
          controller: 'DisplayProfileCtrl'
        }
      }
    });
  });