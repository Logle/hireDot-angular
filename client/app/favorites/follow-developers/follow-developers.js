'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('favorites.follow_developers', {
        url: '/follow_developers',
        templateUrl: 'app/view/follow-developers/follow-developers.html',
        controller: 'FollowDevelopersCtrl'
    });
  });