'use strict';

angular.module('hireDotApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      },

      addWorkExperience: function(companyName, title, workStartDate, workEndDate) {
        workStartDate.month = workStartDate.month || {};
        workEndDate.month = workEndDate.month || {};

        if (companyName && title) {
          var workExperienceObj = {
            company: {
              name: companyName
            },
            title: title,
            startDate: {
              month: workStartDate.month.number,
              year: workStartDate.year
            },
            endDate: {
              month: workEndDate.month.number,
              year: workEndDate.year
            }
          };
          currentUser.workExperiences.push(workExperienceObj);
        }
      },

      removeWorkExperience: function(index) {
        currentUser.workExperiences.splice(index, 1);
      },

      addEducation: function(schoolName, degree, fieldOfStudy, educationStartDate, educationEndDate) {
        educationStartDate.month = educationStartDate.month || {};
        educationEndDate.month = educationEndDate.month || {};

        if (schoolName) {
          var educationObj = {
            schoolName: schoolName,
            degree: degree || "",
            fieldOfStudy: fieldOfStudy || "",
            startDate: {
              month: educationStartDate.month.number,
              year: educationStartDate.year
            },
            endDate: {
              month: educationEndDate.month.number,
              year: educationEndDate.year
            }
          };
          currentUser.educations.push(educationObj);
        }
      },

      removeEducation: function(index) {
        currentUser.educations.splice(index, 1);
      },

      followDeveloper: function(developerId) {
        return User.followDeveloper({ id: currentUser._id }, {
          developerToFollowId: developerId
        }).$promise;
      },

      editProfile: function(developerData) {
        return User.editProfile(developerData).$promise;
      }
    };
  });
