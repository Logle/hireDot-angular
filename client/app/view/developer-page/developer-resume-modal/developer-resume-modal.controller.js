'use strict';

angular.module('hireDotApp')
  .controller('ResumeModalInstanceCtrl', function($scope, $modalInstance, userData){
    $scope.userData = userData;

    $scope.hasResume = userData.resumeUrl === '' ? false : true;

    $scope.close = function(){
      $modalInstance.close();
    };
  });