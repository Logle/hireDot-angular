'use strict';

angular.module('hireDotApp')
  .factory('Cohort', function ($resource) {
    return $resource('/api/cohorts');
  });
