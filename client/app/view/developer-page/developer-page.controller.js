'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, Developer, $stateParams, User, Auth, $modal) {
    $scope.developerData = Developer.get({ id: $stateParams.developer_id });

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
      Auth.followDeveloper($stateParams.developer_id);
    };

    $scope.openResume = function() {
      var modalService = $modal.open({
        templateUrl: 'app/view/developer-page/developer-resume-modal/developer-resume-modal.html',
        controller: 'ResumeModalInstanceCtrl',
        size: 'lg',
        resolve: {
          developerData: function() {
            return $scope.developerData;
          }
        }
      });
    };
  });
