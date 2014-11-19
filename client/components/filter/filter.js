'use strict';

angular.module('hireDotApp')
  .filter('filterText', function () {
    return function(string, usage) {
      if ((!string) || (string === "")) return "--";
      return string;
    };
  })
  .filter('filterTimePeriod', function() {
    return function(workExperience) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      var startDate = workExperience.startDate.month ?
                      months[workExperience.startDate.month - 1] + " " + workExperience.startDate.year :
                      workExperience.startDate.year;
      var endDate;

      if (workExperience.isCurrent) {
        endDate = "Current";
      } else {
        endDate = workExperience.endDate.month ?
                  months[workExperience.endDate.month - 1] + " " + workExperience.endDate.year :
                  workExperience.endDate.year;
      }

      return startDate + " - " + endDate;
    };
  });