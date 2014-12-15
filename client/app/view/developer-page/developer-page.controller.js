'use strict';

angular.module('hireDotApp')
  .controller('DeveloperPageCtrl', function ($scope, $stateParams, User, Auth, $modal) {
    $scope.userData = User.get({ id: $stateParams.developer_id });

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
      switch(urlType) {
        case 'email':
          if ($scope.userData.email && $scope.userData.email !== "") { return true; }
          break;
        case 'linkedin':
          if ($scope.userData.linkedinUrl && $scope.userData.linkedinUrl !== "") { return true; }
          break;
        case 'github':
          if ($scope.userData.githubUrl && $scope.userData.githubUrl !== "") { return true; }
          break;
        case 'facebook':
          if ($scope.userData.facebookUrl && $scope.userData.facebookUrl !== "") { return true; }
          break;
        case 'twitter':
          if ($scope.userData.twitterUrl && $scope.userData.twitterUrl !== "") { return true; }
          break;
      }

      return false;
    };

    var devPosition;

    $scope.checkFollow = function() {
      var currentUser = Auth.getCurrentUser();

      currentUser.followDevelopers.some(function(developer, index) {
        if (developer._id === $stateParams.developer_id) {
          devPosition = index;
          return true;
        }
      });

      $scope.isFollowed = (devPosition >= 0) ? 1 : 0;
    };

    $scope.isFollowedString = ['Follow', 'UnFollow'];

    $scope.followDeveloper = function(init) {
      Auth.followDeveloper($stateParams.developer_id);

      var currentUser = Auth.getCurrentUser();

      if ($scope.isFollowed === 1) {
        currentUser.followDevelopers.splice(devPosition, 1);
      } else {
        currentUser.followDevelopers.push($scope.userData);
      }
    };

    $scope.openResume = function() {
      var modalService = $modal.open({
        templateUrl: 'app/view/developer-page/developer-resume-modal/developer-resume-modal.html',
        controller: 'ResumeModalInstanceCtrl',
        size: 'lg',
        resolve: {
          userData: function() {
            return $scope.userData;
          }
        }
      });
    };
  });
