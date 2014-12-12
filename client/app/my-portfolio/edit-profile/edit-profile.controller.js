'use strict';

angular.module('hireDotApp')
  .controller('EditProfileCtrl', function ($scope, Auth, MonthsYears, $state) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.months = MonthsYears.months;
    $scope.years = MonthsYears.years;

    $scope.validateLinkedinUrl = function(value) {
      if (value && value.indexOf('linkedin.com') > -1) return true;
      return false;
    };

    $scope.validateGithubUrl = function(value) {
      if (value && value.indexOf('github.com') > -1) return true;
      return false;
    };

    $scope.validateFacebookUrl = function(value) {
      if (value && value.indexOf('facebook.com') > -1) return true;
      return false;
    };

    $scope.validateTwitterUrl = function(value) {
      if (value && value.indexOf('twitter.com') > -1) return true;
      return false;
    };

    $scope.workStartDate = {};
    $scope.workEndDate = {};

    $scope.addWorkExperience = function(companyName, title, workStartDate, workEndDate) {
      Auth.addWorkExperience(companyName, title, workStartDate, workEndDate);
      $scope.workStartDate = {};
      $scope.workEndDate = {};
      $scope.companyName = "";
      $scope.title = "";
    };

    $scope.removeWorkExperience = function(index) {
      Auth.removeWorkExperience(index);
    };

    $scope.educationStartDate = {};
    $scope.educationEndDate = {};

    $scope.addEducation = function(schoolName, degree, fieldOfStudy, educationStartDate, educationEndDate) {
      Auth.addEducation(schoolName, degree, fieldOfStudy, educationStartDate, educationEndDate);
      $scope.educationStartDate = {};
      $scope.educationEndDate = {};
      $scope.schoolName = "";
      $scope.degree = "";
      $scope.fieldOfStudy = "";
    };

    $scope.removeEducation = function(index) {
      Auth.removeEducation(index);
    };

    $scope.editProfile = function() {
      delete $scope.currentUser.cohort;
      delete $scope.currentUser.followDevelopers;
      delete $scope.currentUser.followProjects;
      delete $scope.currentUser.projects;

      Auth.update($scope.currentUser).then(function(result) {
        if (result) {
          $scope.updateSuccess = true;
          setTimeout(function() {
            $scope.updateSuccess = false;
            $scope.$apply();
          }, 2000);
        }
      });
    };
  });

