'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, Developer, $stateParams, User, Auth, $modal) {
    $scope.developerData = Developer.get({ id: $stateParams.developer_id });
    // console.log($scope.developerData);
    $scope.showFunny = false;
    $scope.showTab = {
      projects: true,
      workExperiences: false,
      educations: false
    };
    $scope.show = function(tabName) {
      for (var key in $scope.showTab) {
        $scope.showTab[key] = false;
      }
      $scope.showTab[tabName] = true;
    };
    $scope.hasUrl = function(urlType) {
      return $scope.developerData.hasUrl(urlType);
    };

    $scope.hasProject = function() {
      return $scope.developerData.hasProject();
    };
    $scope.profilePictureAvailable = function() {
      return $scope.developerData.profilePictureAvailable();
    };

    $scope.developerData.$promise.then(function(result) {
      if ( Auth.getCurrentUser().followDevelopers.indexOf(result._id) === -1 ){
        $scope.isFollowed = 0;
      } else {  $scope.isFollowed = 1;  }
    });
    $scope.isFollowedString = ['Follow', 'UnFollow'];

    $scope.followDeveloper = function() {
      User.followDeveloper({'user' : Auth.getCurrentUser()._id ,'dev' : $scope.developerData._id});
    };

    $scope.openResume = function(){
      var modalService = $modal.open({
        templateUrl: 'resumeModal.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        windowClass: 'developer-resume-modal',
        resolve: {
          resume: function() {
            return $scope.developerData.resumeUrl
          }
        }
      });
    }
  })
  .controller('ModalInstanceCtrl', function($scope, $modalInstance, resume){
    $scope.resume = resume ;
    $scope.close = function(){
      $modalInstance.close();
    }
  });
