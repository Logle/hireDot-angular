'use strict';

angular.module('hireDotApp')
  .controller('AdminInvitationCtrl', function ($scope, $timeout) {
    $scope.invited_email = '';
    $scope.alert_user = '';
    $scope.alert_user =''
    $scope.submit = function(){
    	console.log($scope.invited_email);
    	$scope.invited_email = '';
    	$scope.alert_user = 'Invitation sent !';
    	$timeout(function() {$scope.alert_user = ''}, 3000);
    }
	});
