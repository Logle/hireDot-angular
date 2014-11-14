'use strict';

angular.module('hireDotApp')
  .factory('Project', function ($resource) {
    var Project = $resource('/api/projects')

    Project.allProjects = [];

    Project.search = function(projectName) {
      this.query({ name: projectName }, function(projects) {
        angular.copy(projects, Project.allProjects)
      });
    };

    Project.sortBy = function(sortCriteria) {
      this.query(sortCriteria, function(projects) {
        angular.copy(projects, Project.allProjects)
      });
    };

    return Project;
  });
