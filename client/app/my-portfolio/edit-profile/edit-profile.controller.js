'use strict';

angular.module('hireDotApp')
  .controller('EditProfileCtrl', function ($scope, Auth, MonthsYears) {
    $scope.currentUser = Auth.getCurrentUser();
    $scope.months = MonthsYears.months;
    $scope.years = MonthsYears.years;

    $scope.addWorkExperience = function(companyName, title, startMonth, startYear, endMonth, endYear) {
      if (companyName && title) {
        var workExperienceObj = {
          company: {
            name: companyName
          },
          title: title,
          startDate: {
            month: startMonth,
            year: startYear
          },
          endDate: {
            month: endMonth,
            year: endYear
          }
        };

        console.log(workExperienceObj);
        // $scope.currentUser.workExperiences.push({})
      }
    };

    $scope.updateProfile = function() {
      console.log($scope.currentUser);
    };

    $scope.message = 'Hello';
	  $scope.jobs = [];
  	$scope.addWork = function () {
  		$scope.jobs.push($scope.currentWork);
      $scope.currentWork = {};
    };
    $scope.colleges = [];
    $scope.addSchool = function () {
      $scope.colleges.push($scope.currentc);
      $scope.currentc = {};
    };
    $scope.remove = function(arrayToRemoveFrom, row) {
      arrayToRemoveFrom.splice(row,1);
    };

    filepicker.setKey("AtkSLyTTvS4uniWtmTRttz");
    $scope.initializeFilePicker = function() {
      console.log('got this far');
     filepicker.pick(
      { mimetype: 'image/*'},
      function onSuccess(Blob) {
        // person.images = Blob;
        console.log('hi');
      },
      function onError(FPError){
        console.log(FPError.toString());
      }
    );
   };



  });

