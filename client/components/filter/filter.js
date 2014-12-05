'use strict';

angular.module('hireDotApp')
  .filter('filterText', function () {
    return function(string, usage) {
      if ((!string) || (string === "")) return "--";
      return string;
    };
  })
  .filter('filterTimePeriod', function(MonthsYears) {
    return function(workExperience) {
      if (!workExperience.startDate) return "--";

      var months = MonthsYears.months;

      var startDate = workExperience.startDate.month ?
                      months[workExperience.startDate.month - 1]["name"] + " " + workExperience.startDate.year :
                      workExperience.startDate.year;
      var endDate;

      if (workExperience.isCurrent) {
        endDate = "Current";
      } else {
        endDate = workExperience.endDate.month ?
                  months[workExperience.endDate.month - 1]["name"] + " " + workExperience.endDate.year :
                  workExperience.endDate.year;
      }

      return startDate + " - " + endDate;
    };
  })
  .filter('filterTime', function(MonthsYears) {
    return function(dateObj) {
      if (!dateObj || (!dateObj.month && !dateObj.year)) return "--";

      var months = MonthsYears.months;
      if (!dateObj.month || !dateObj.year) {
        if (!dateObj.month) return dateObj.year;
        if (!dateObj.year) return months[dateObj.month - 1]["name"];
      } else {
        return months[dateObj.month - 1]["name"] + " " + dateObj.year;
      }
    };
  });