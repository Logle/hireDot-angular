'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit-profile', {
        url: '/edit-profile',
        templateUrl: 'app/my-portfolio/edit-profile/edit-profile.html',
        controller: 'EditProfileCtrl'
      });
  });