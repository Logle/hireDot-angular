'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my_portfolio.edit_profile', {
        url: '/edit_profile',
        templateUrl: 'app/my-portfolio/edit-profile/edit-profile.html',
        controller: 'EditProfileCtrl'
      });
  });