'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/projects',
        templateUrl: 'app/browse-all/projects/projects.html',
        controller: 'ProjectsCtrl'
      });
  });