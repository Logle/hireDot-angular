'use strict';

angular.module('hireDotApp')
  .factory('User', function ($resource) {
    var User = $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      typeahead: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'typeahead'
        }
      },
      followDeveloper: {
        method: 'PUT',
        params: {
          controller: 'followDeveloper'
        }
      },
      followProject: {
        method: 'PUT',
        params: {
          controller: 'followProject'
        }
      },
      update: {
        method: 'PUT',
        params: {
          controller: 'update'
        }
      }
	  });

    // ===== For Typeaheads =====
    User.usersTypeahead = [];

    User.searchTypeAhead = function(userName, roleType) {
      var findCriteria = {};

      if (userName !== '') findCriteria.name = userName;
      if (roleType !== '') findCriteria.role = roleType;

      User.typeahead(findCriteria, function(users) {
        angular.copy(users, User.usersTypeahead);
      });
    };


    // ===== For Ng-repeats =====
    User.allUsersForNgRepeat = [];

    User.search = function(userName, roleType) {
      var findCriteria = {};

      if (userName !== '') findCriteria.name = userName;
      if (roleType !== '') findCriteria.role = roleType;

      this.query(findCriteria, function(users) {
        angular.copy(users, User.allUsersForNgRepeat);
      });
    };

    // Lazy-loading
    User.queryStatus = {
      skip: 0,
      isBusy: false,
      isFinished: false
    };

    User.sortBy = function(sortCriteria) {
      var self = this;

      this.queryStatus.isBusy = true;

      if (this.queryStatus.skip === 0) {
        this.sortCriteria = sortCriteria;

        this.query(sortCriteria, function(users) {
          angular.copy(users, self.allUsersForNgRepeat);

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      } else {
        this.sortCriteria.skip = this.queryStatus.skip;

        this.query(this.sortCriteria, function(users) {
          if (users.length === 0) {
            self.queryStatus.isFinished = true;
          }

          users.forEach(function(user) {
            self.allUsersForNgRepeat.push(user);
          });

          self.queryStatus.skip += 10;
          self.queryStatus.isBusy = false;
        });
      }
    };

    User.resetQueryStatus = function() {
      this.queryStatus.skip = 0;
      this.queryStatus.isBusy = false;
      this.queryStatus.isFinished = false;
    };

    return User;
  });
