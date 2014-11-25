'use strict';

angular.module('hireDotApp')
  .directive('developerFilter', function () {
    return {
      templateUrl: 'components/sidebar-right/developer-filter/developer-filter.html',
      restrict: 'E',
      controller: function ($scope, Developer, Cohort) {
        $scope.orderByOptions = [{
          orderBy: 'Most Views',
          value: '-visitors'
        }, {
          orderBy: 'Least Views',
          value: 'visitors'
        }];

        $scope.cohortsFilter = Cohort.query();

        $scope.hiredOrLookingFilter = [{
          status: "Looking"
        }, {
          status: "Hired"
        }];

        $scope.sortDevelopers = function(sortCriteria) {
          Developer.sortBy(sortCriteria);
        };

        $scope.searchDevelopers = function(developerName) {
          Developer.search(developerName);
        };
      }
    };
  });