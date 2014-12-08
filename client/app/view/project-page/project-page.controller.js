'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, $stateParams, Project) {
    $scope.projectData = Project.get({ id: $stateParams.project_id});
    console.log($scope.projectData);
    $scope.developerHasUrl = function(urlType, developerData) {
      switch(urlType) {
            case 'email':
              if (developerData.email && developerData.email !== "") { return true; }
              break;
            case 'linkedin':
              if (developerData.linkedinUrl && developerData.linkedinUrl !== "") { return true; }
              break;
            case 'github':
              if (developerData.githubUrl && developerData.githubUrl !== "") { return true; }
              break;
            case 'facebook':
              if (developerData.facebookUrl && developerData.facebookUrl !== "") { return true; }
              break;
            case 'twitter':
              if (developerData.twitterUrl && developerData.twitterUrl !== "") { return true; }
              break;
          }
      return false;
    };
    $scope.randomImages = [
      'http://static.ddmcdn.com/gif/5-small-dog-exercises0.jpg',
      'http://www.notinthedoghouse.com/wp-content/uploads/2013/10/small-dog-breeds-that-stay-small-300x240.jpg',
      'http://static.ddmcdn.com/gif/10-small-dog-breeds-for-therapy-work10.jpg',
      'http://www.windsorhillsprivaterentals.com/images/windsorhills/small-dog.jpg',
      'http://www.goodhousekeeping.com/cm/goodhousekeeping/images/3Q/ghk-dogs-Boston-Terrier-mdn.jpg',
      'http://www.pawfun.com/wp/wp-content/uploads/2009/09/angry_dog.png',
      'http://www.dogguide.net/images/breeds/chihuahua.jpg',
      'http://3.bp.blogspot.com/-P2Wg4s_vErg/UJq784zj0yI/AAAAAAAAEsI/mnm_D911aD8/s640/1262.jpg'
    ]
  });
