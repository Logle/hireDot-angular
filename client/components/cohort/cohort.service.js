'use strict';

angular.module('hireDotApp')
  .factory('Cohort', function ($resource) {
    var Cohort = $resource('/api/cohorts');

    Cohort.cohortsTypeahead = [{
      name: "All Cohorts",
      _id: "all"
    }];

    Cohort.query({}, function(cohorts) {
      cohorts.forEach(function(cohort) {
        Cohort.cohortsTypeahead.push(cohort);
      });
    });

    return Cohort;
  });
