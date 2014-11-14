'use strict';

angular.module('hireDotApp')
  .filter('limitText', function () {
    return function(string, usage) {
      switch (usage) {
        case 'projectTechTags':
          if ((!string) || (string === "")) {
            return "No tech tags available";
          } else if (string.length > 60) {
            return string.substr(0, 60) + "...";
          } else {
            return string;
          }
          break;

        case 'projectTitle':
          if (string.length > 20) {
            return string.substr(0, 20) + "...";
          } else {
            return string;
          }
          break;

        case 'developerTitle':
          if (string.length > 50) {
            return string.substr(0, 50) + "...";
          } else {
            return string;
          }
          break;
      }
    };
  });