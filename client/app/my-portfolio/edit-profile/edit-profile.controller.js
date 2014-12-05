'use strict';

angular.module('hireDotApp')
  .controller('EditProfileCtrl', function ($scope, Auth, MonthsYears) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.months = MonthsYears.months;
    $scope.years = MonthsYears.years;

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

    $scope.updateProfile = function() {
      console.log($scope.currentUser);
    };
  });

