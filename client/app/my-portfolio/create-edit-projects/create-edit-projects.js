'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my_portfolio.create_edit_projects', {
        url: '/create_edit_projects',
        templateUrl: 'app/my-portfolio/create-edit-projects/create-edit-projects.html',
        controller: 'CreateEditProjectsCtrl'
      });
  });