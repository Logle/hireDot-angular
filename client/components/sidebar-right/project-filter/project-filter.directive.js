'use strict';

angular.module('hireDotApp')
  .directive('projectFilter', function () {
    return {
      templateUrl: 'components/sidebar-right/project-filter/project-filter.html',
      restrict: 'E',
      controller: function ($scope, Project) {
        $scope.orderByOptions = [{
          orderBy: 'Newest',
          value: '-lastUpdated'
        }, {
          orderBy: 'Oldest',
          value: 'lastUpdated'
        }, {
          orderBy: 'Most Views',
          value: '-views'
        }, {
          orderBy: 'Least Views',
          value: 'views'
        }];

        $scope.projects = Project.query();

        $scope.sortProjects = function(sortCriteria) {
          Project.sortBy(sortCriteria);
        };

        $scope.searchProjects = function(projectName) {
          Project.search(projectName);
        };

        $scope.resetProjectStatus= function() {
          Project.queryStatus.skip = 0;
          Project.queryStatus.isBusy = false;
          Project.queryStatus.isFinished = false;
        };
      }
    };
  });