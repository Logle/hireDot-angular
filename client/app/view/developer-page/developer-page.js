'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view.developer_page', {
        url: '/developer_page',
        templateUrl: 'app/view/developer-page/developer-page.html',
        controller: 'DeveloperPageCtrl'
    });
  });