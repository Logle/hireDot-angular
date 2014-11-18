'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my_portfolio', {
        url: '/my_portfolio',
        abstract: true,
        template: '<div ui-view=""></div>'
      });
  });