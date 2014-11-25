'use strict';

angular.module('hireDotApp')
  .factory('Project', function ($resource) {
    var Project = $resource('/api/projects/:id');

    Project.allProjects = [];

    Project.search = function(projectName) {
      this.query({ name: projectName }, function(projects) {
        angular.copy(projects, Project.allProjects);
      });
    };

    Project.queryStatus = {
      skip: 0,
      isBusy: false,
      isFinished: false
    };

    Project.sortBy = function(sortCriteria) {
      var self = this;

      this.queryStatus.isBusy = true;

      if (this.queryStatus.skip === 0) {
        this.sortCriteria = sortCriteria;

        this.query(sortCriteria, function(projects) {
          angular.copy(projects, self.allProjects);

          self.queryStatus.skip += 30;
          self.queryStatus.isBusy = false;
        });
      } else {
        this.sortCriteria.skip = this.queryStatus.skip;

        this.query(this.sortCriteria, function(projects) {
          if (projects.length === 0 ) {
            self.queryStatus.isFinished = true;
          }

          projects.forEach(function(project) {
            self.allProjects.push(project)
          });

          self.queryStatus.skip += 30;
          self.queryStatus.isBusy = false;
        });
      }
    };

    return Project;
  });

