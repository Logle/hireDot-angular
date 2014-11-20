'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project-page', {
        url: '/project-page',
        templateUrl: 'app/view/project-page/project-page.html',
        controller: 'ProjectPageCtrl'
      });
  });