'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('favorites', {
        url: '/favorites',
        abstract: true,
        template: '<div ui-view=""></div>'
      });
  });