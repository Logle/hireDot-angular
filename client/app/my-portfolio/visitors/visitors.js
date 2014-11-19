'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.visitors', {
        url: '/analytics',
        views: {
          "visitors": {
            templateUrl: 'app/my-portfolio/visitors/visitors.html',
            controller: 'VisitorsCtrl'
          }
        }
      });
  });