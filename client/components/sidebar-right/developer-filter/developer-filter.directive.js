'use strict';

angular.module('hireDotApp')
  .directive('developerFilter', function () {
    return {
      templateUrl: 'components/sidebar-right/developer-filter/developer-filter.html',
      restrict: 'E',
      controller: function ($scope, $timeout, Developer, Cohort) {
        $scope.orderByOptions = [{
          orderBy: 'Most Views',
          value: '-visitors'
        }, {
          orderBy: 'Least Views',
          value: 'visitors'
        }];

        $scope.developersTypeahead = Developer.developersTypeahead;

        $scope.cohortsTypeahead = Cohort.cohortsTypeahead;

        $scope.hiredOrLookingFilter = [{
          status: "All",
          hired: "all"
        },{
          status: "Looking",
          hired: false,
        }, {
          status: "Hired",
          hired: true
        }];

        $scope.sortDevelopers = function(sortCriteria, hiredOrLooking, selectedCohort) {
          var sortCriteria = {
            value: sortCriteria.value,
            hired: hiredOrLooking.hired,
            cohort: selectedCohort._id
          };

          Developer.sortBy(sortCriteria);
        };

        $scope.searchDevelopers = function(developerName) {
          Developer.search(developerName);
        };

        $scope.onSortByChange = function(sortCriteria, hiredOrLooking, selectedCohort) {
          Developer.resetQueryStatus();
          $scope.sortDevelopers(sortCriteria, hiredOrLooking, selectedCohort);
        };
      }
    };
  });