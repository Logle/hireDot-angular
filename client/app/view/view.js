'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/view',
        abstract: true,
        template: '<div ui-view=""></div>'
      });
  });