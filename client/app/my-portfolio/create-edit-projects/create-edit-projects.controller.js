'use strict';

angular.module('hireDotApp')
  .directive('blurValidate', function() {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        var attrName = el[0].name;
        var formName = attrs.formname || el.closest('form')[0].name ;
        // doesn't show invalid error messages until blur (annoying to see as you type initially)
        el.bind('blur', function() {
          scope.$apply(function() {
            if (scope[formName][attrName].$invalid) {
              $(el).closest('.form-group').addClass('has-error');
              el.next().removeClass('ng-hide'); // hides the error message
            }
          });
        });

        // once the error message is shown, hide/show error message based on keyup (so user gets immediate feedback)
        el.bind('keyup', function() { // on every keyup, check to see if we should add this other keyup listener
          scope.$apply(function() {
            if ($(el).closest('.form-group').hasClass('has-error')) {
              el.bind('keyup', function() {
                scope.$apply(function() {
                  if (scope[formName][attrName].$valid) {
                    $(el).closest('.form-group').removeClass('has-error');
                    el.next().addClass('ng-hide');
                  }
                  else if (scope[formName][attrName].$invalid) {
                    $(el).closest('.form-group').addClass('has-error');
                    el.next().removeClass('ng-hide'); // shows the error message
                  }
                });
              });
            }
          });
        });
      }
    };
  })
  .directive('videoEmbed', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/my-portfolio/create-edit-projects/videoEmbed.html'
    };
  })
  .directive('onIframeLoad', function() {
    return {
      restrict: 'A',
      link: function(scope, iEl, attrs) {
        iEl.on('load', function() {
          var width = iEl.width();
          iEl.height(width/1.777);
        })
      }
    };
  })
  .directive('responsiveHeight', function($window) {
    return {
      restrict: 'A',
      link: function(scope, iEl, attrs) {
        var w = angular.element($window);
        w.bind('resize', function() {
          scope.$apply(function() {
            var width = iEl.width();
            $('iframe').height(width/1.77);
          });
        });
      }
    };
  })
  .controller('CreateEditProjectsCtrl', function ($scope, Project, $sce, Auth, User) {
  	$scope.project = {};
    $scope.project.team = [];
    $scope.developerTypeahead = User.usersTypeahead;
    // $scope.projects = Auth.getCurrentUser().projects || [];
    $scope.getEmbedURL = function() {
      var id = getId($scope.project.videoURL);
      $scope.project.videoEmbedUrl = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + id);
    }
    $scope.submit = function() {
      // makes project match the Schema
      $scope.project.team = $scope.project.team.map(function(member) {
        return {
          role: member.role,
          developer: member._id
        };
      });
      $scope.project.images = $scope.project.images.map(function(image) {
        return {
          crops: image.crops || {},
          original: image.url
        };
      });

      Project.save($scope.project,
        function(project) { console.log('project saved: ', project); },
        function() { console.log('problem trying to save project'); }
      );
    };
    $scope.addCollaborator = function() {
      var notARepeat = true;
      for (var i = 0, len = $scope.project.team.length; i < len; i++) {
        if ($scope.project.team[i]._id === $scope.currDeveloper._id)
          notARepeat = false;
      }
      var anExistingCollaborator = false;
      if ($scope.currDeveloper && $scope.currDeveloper._id)
        anExistingCollaborator = true;

      if (anExistingCollaborator && notARepeat && $scope.currDeveloper.role) {
        $scope.project.team.push($scope.currDeveloper);
        $scope.currDeveloper = { name: '' };
      }
    };

    $scope.removeCollaborator = function(collaborator) {
      var index = $scope.project.team.indexOf(collaborator);
      $scope.project.team.splice(index, 1);
    };

   $scope.searchDevelopersTypeAhead = function(developerName) {
      User.searchTypeAhead(developerName, 'developer');
    };

    // filepicker
    filepicker.setKey("AtkSLyTTvS4uniWtmTRttz");
    $scope.initializeFilePicker = function() {
      filepicker.pickMultiple(
        {
          container: 'modal',
          maxFiles: 4,
          mimetype: 'image/*'
        },
        function(Blobs) {
          $scope.project.images = Blobs;
          $scope.$digest();
        }
      );
    };

    // aviary
    // email: azerner3@gmail.com
    // password: hiredotdot
    var featherEditor = new Aviary.Feather({
      apiKey: '3fab2428053eb8fa',
      apiVersion: 3,
      theme: 'dark',
      tools: 'all',
      appendTo: '',
      onSave: function(imageID, newURL) {
        var img = document.getElementById(imageID);
        img.src = newURL;

        var id = +imageID.slice(8);
        $scope.$apply(function() {
          $scope.project.images[id].url = newURL;
        });
      },
      onError: function(errorObj) {
        alert(errorObj.message);
      }
    });
    $scope.launchEditor = function(id, src) {
      featherEditor.launch({
        image: id,
        url: src
      });
      return false;
    };


    // validations
    $scope.$watch("project.githubURL", function(newURL, oldURL) {
      $scope.createEditProjectForm.githubURL.$setValidity("githubURL needs to be from github.com", isValidGithubUrl(newURL));
    });
    $scope.$watchCollection("project.team", function(newTeam, oldTeam) {
      $scope.createEditProjectForm.$setValidity("need at least one team member", newTeam.length > 0);
    });
    // $scope.$watch('project.videoURL', function(newURL, oldURL) {
    //   // ping YouTube API
    //   // $setValidity accordingly
  });

  function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
  };
  function isValidGithubUrl(url) {
    if (!url) return false; // because $digest's happen before people type in the github.url and it's saying url is undefined

    // will start with http:// or https:// because of type="url" validation
    var start, end, domain;
    if (url.substring(0,5) === 'https') start = 8;
    else if (url.substring(0,5) === 'http:') start = 7;
    for (var i = start, len = url.length; i < len; i++) { // way to do this with indexOf()?
      if (url.charAt(i) === '/') {
        end = i;
        break;
      }
    }
    domain = url.substring(start, end); // works if end is undefined; see substring docs
    if (domain === 'github.com' || domain === 'www.github.com') return true;
    else { return false; }
  }

