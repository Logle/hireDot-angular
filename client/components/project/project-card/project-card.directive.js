'use strict';

angular.module('hireDotApp')
  .directive('projectCard', function () {
    return {
      templateUrl: 'components/project/project-card/project-card.html',
      restrict: 'E',
      scope: {
        projectData: '=projectData'
      }
    };
  });