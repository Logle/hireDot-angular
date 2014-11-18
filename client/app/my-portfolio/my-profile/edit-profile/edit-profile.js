'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.edit-profile', {
        url: '/edit-profile',
        views: {
          "edit-profile": {
            templateUrl: 'app/my-portfolio/my-profile/edit-profile/edit-profile.html',
            controller: 'EditProfileCtrl'
          }
        }
      });
  });