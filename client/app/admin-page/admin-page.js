'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin_page', {
        url: '/admin_page',
        abstract: true,
        template: '<div ui-view=""></div>'
      });
  });