'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.display-team', {
        url: '/display-team',
        views: {
          "display-team": {
            templateUrl: 'app/my-portfolio/team/display-team/display-team.html',
            controller: 'DisplayTeamCtrl'
          }
        }
      });
  });