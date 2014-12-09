'use strict';

angular.module('hireDotApp')
  .controller('ResumeModalInstanceCtrl', function($scope, $modalInstance, developerData){
    $scope.developerData = developerData;

    $scope.hasResume = developerData.resumeUrl === '' ? false : true;

    $scope.close = function(){
      $modalInstance.close();
    };
  });