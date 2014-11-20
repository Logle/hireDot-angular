'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view.project_page', {
        url: '/:project_id/project_page',
        templateUrl: 'app/view/project-page/project-page.html',
        controller: 'ProjectPageCtrl'
      });
  });