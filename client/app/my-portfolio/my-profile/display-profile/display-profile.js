'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my_portfolio.display_profile', {
        url: '/display_profile',
        templateUrl: 'app/my-portfolio/my-profile/display-profile/display-profile.html',
        controller: 'DisplayProfileCtrl'
    });
  });