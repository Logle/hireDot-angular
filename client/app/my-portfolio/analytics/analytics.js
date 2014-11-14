'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio.analytics', {
        url: '/analytics',
        views: {
          "analytics": {
            templateUrl: 'app/my-portfolio/analytics/analytics.html',
            controller: 'AnalyticsCtrl'
          }
        }
      });
  });