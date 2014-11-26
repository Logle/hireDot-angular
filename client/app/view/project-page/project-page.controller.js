'use strict';

angular.module('hireDotApp')
  .controller('ProjectPageCtrl', function ($scope, $stateParams, Project) {
    $scope.projectData = Project.get({ id: $stateParams.project_id});
    console.log($scope.projectData);
  })
  .directive('developerProfileCard', function(){
  	return {
  		restrict: 'E',
  		scope: {
  			developer: "=info"
  		},
  		templateUrl: 'app/view/project-page/developer-profile-card.html'
  	};
  });
