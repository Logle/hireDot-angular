'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-portfolio', {
        url: '/my-portfolio',
        templateUrl: 'app/my-portfolio/my-portfolio.html',
        controller: 'MyPortfolioCtrl'
      });
  });