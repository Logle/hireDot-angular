'use strict';

angular.module('hireDotApp')
  .factory('Developer', function (User) {
    var Developer = User;

    // ===== For Typeaheads =====
    Developer.developersTypeahead = [];

    Developer.typeahead({}, function(developers) {
      angular.copy(developers, Developer.developersTypeahead);
    });

    // ===== For Ng-repeats =====
    Developer.allDevelopersForNgRepeat = [];

    Developer.search = function(developerName) {
      this.query({ name: developerName }, function(developers) {
        angular.copy(developers, Developer.allDevelopersForNgRepeat);
      });
    };

    // Lazy-loading
    Developer.queryStatus = {
      skip: 0,
      isBusy: false,
      isFinished: false
    };

    Developer.sortBy = function(sortCriteria) {
      var self = this;

      this.queryStatus.isBusy = true;

      if (this.queryStatus.skip === 0) {
        this.sortCriteria = sortCriteria;

        this.query(sortCriteria, function(developers) {
          angular.copy(developers, self.allDevelopersForNgRepeat);

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      } else {
        this.sortCriteria.skip = this.queryStatus.skip;

        this.query(this.sortCriteria, function(developers) {
          if (developers.length === 0) {
            self.queryStatus.isFinished = true;
          }

          developers.forEach(function(developer) {
            self.allDevelopersForNgRepeat.push(developer);
          });

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      }
    };

   Developer.resetQueryStatus = function() {
      this.queryStatus.skip = 0;
      this.queryStatus.isBusy = false;
      this.queryStatus.isFinished = false;
    };

    // For object instances
    Developer.prototype.hasUrl = function(urlType) {
      switch(urlType) {
            case 'email':
              if (this.email && this.email !== "") { return true; }
              break;
            case 'linkedin':
              if (this.linkedinUrl && this.linkedinUrl !== "") { return true; }
              break;
            case 'github':
              if (this.githubUrl && this.githubUrl !== "") { return true; }
              break;
            case 'facebook':
              if (this.facebookUrl && this.facebookUrl !== "") { return true; }
              break;
            case 'twitter':
              if (this.twitterUrl && this.twitterUrl !== "") { return true; }
              break;
          }

      return false;
    };

    Developer.prototype.hasProject = function() {
      if (this.projects !== null && this.projects.length !== 0) return true;
      return false;
    };

    Developer.prototype.profilePictureAvailable = function() {
      if (this.linkedin.pictureUrl || (this.profilePicture &&
          this.profilePicture.crops)) {
        return true;
      } else {
        return false;
      }
    };

    return Developer;
  });
