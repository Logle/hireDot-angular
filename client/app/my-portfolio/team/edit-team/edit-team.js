'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.edit-team', {
        url: '/edit-team',
        views: {
          "edit-team": {
            templateUrl: 'app/my-portfolio/team/edit-team/edit-team.html',
            controller: 'EditTeamCtrl'
          }
        }
      });
  });