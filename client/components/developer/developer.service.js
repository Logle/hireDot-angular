'use strict';

angular.module('hireDotApp')
  .factory('Developer', function (User) {
    var Developer = User,
        isSearching = false;

    Developer.allDevelopers = [];

    Developer.search = function(developerName) {
      if (isSearching === false) {
        if (developerName.length > 2 || developerName.length === 0) {
          isSearching = true;
          this.query({ name: developerName }, function(developers) {
            isSearching = false;
            angular.copy(developers, Developer.allDevelopers);
          });
        }
      }
    };

    Developer.sortBy = function(sortCriteria) {
      this.query(sortCriteria, function(developers) {
        angular.copy(developers, Developer.allDevelopers);
      });
    };

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
      if (this.profilePicture &&
          this.profilePicture.crops) {
        return true;
      } else {
        return false;
      }
    };

    return Developer;
  });
