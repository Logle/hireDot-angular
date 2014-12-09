'use strict';

angular.module('hireDotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin-invitation', {
        url: '/admin-invitation',
        templateUrl: 'app/admin-invitation/admin-invitation.html',
        controller: 'AdminInvitationCtrl'
      });
  });