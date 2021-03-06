'use strict';

angular.module('hireDotApp')
  .factory('Project', function ($resource, $sce) {
    var Project = $resource('/api/projects/:id/:controller', {}, {
      typeahead: {
        method: 'get',
        isArray: true,
        params: {
          controller:'typeahead'
        }
      }
    });

    // ===== For Typeaheads ======
    Project.projectsTypeahead = [];

    Project.searchTypeAhead = function(projectName) {
      var findCriteria;

      if (!projectName) {
        findCriteria = {}
      } else {
        findCriteria = {
          name: projectName
        };
      }

      Project.typeahead(findCriteria, function(projects) {
        angular.copy(projects, Project.projectsTypeahead);
      });
    };

    // ====== For Ng-repeats =====
    Project.allProjectsForNgRepeat = [];

    Project.search = function(projectName) {
      this.query({ name: projectName }, function(projects) {
        angular.copy(projects, Project.allProjectsForNgRepeat);
      });
    };

    // Lazy-loading
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
          angular.copy(projects, self.allProjectsForNgRepeat);

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      } else {
        this.sortCriteria.skip = this.queryStatus.skip;

        this.query(this.sortCriteria, function(projects) {
          if (projects.length === 0 ) {
            self.queryStatus.isFinished = true;
          }

          projects.forEach(function(project) {
            self.allProjectsForNgRepeat.push(project);
          });

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      }
    };

    Project.resetQueryStatus = function() {
      this.queryStatus.skip = 0;
      this.queryStatus.isBusy = false;
      this.queryStatus.isFinished = false;
    };

    // For object instances
    Project.prototype.hasUrl = function(urlType) {
      switch(urlType) {
            case 'github':
              if (this.githubUrl && this.githubUrl !== "") { return true; }
              break;
            case 'url':
              if (this.url && this.url !== "") { return true; }
              break;
          }

      return false;
    };

    Project.prototype.getVideoEmbedUrl = function() {
      var self = this;

      var youtubeId = function() {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = self.videoURL.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
      }();

      return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + youtubeId);
    };

    return Project;
  });

