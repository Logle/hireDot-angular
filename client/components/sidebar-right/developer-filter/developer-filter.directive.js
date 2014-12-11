'use strict';

angular.module('hireDotApp')
  .directive('developerFilter', function () {
    return {
      templateUrl: 'components/sidebar-right/developer-filter/developer-filter.html',
      restrict: 'E',
      controller: function ($scope, $timeout, User, Cohort) {
        $scope.orderByOptions = [{
          orderBy: 'Most Views',
          value: '-visitors'
        }, {
          orderBy: 'Least Views',
          value: 'visitors'
        }];

        $scope.usersTypeahead = User.usersTypeahead;

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

        $scope.sortUsers = function(sortCriteria, roleType, hiredOrLooking, selectedCohort) {
          var sortCriteria = {
            value: sortCriteria.value,
            hired: hiredOrLooking.hired,
            cohort: selectedCohort._id
          };

          if (roleType !== '') sortCriteria.role = roleType;

          User.resetQueryStatus();
          User.sortBy(sortCriteria);
        };

        $scope.searchUsers = function(userName, roleType) {
          User.searchTypeAhead(userName, roleType);
          User.search(userName, roleType);
        };
      }
    };
  });