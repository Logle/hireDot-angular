'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('favorites.follow_projects', {
        url: '/follow_projects',
        templateUrl: 'app/favorites/follow-projects/follow-projects.html',
        controller: 'FollowProjectsCtrl'
    });
  });