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
  .directive('showVideo', function() {
    return {
      restrict: 'A',
      link: function(scope, iEl, attrs) {
        iEl.bind('keyup', function() {
          scope.$apply(function() {
            // check validitity of projectForm.videoURL
            // if valid, call setEmbedURL()
            if (scope.projectForm.videoURL.$dirty && scope.projectForm.videoURL.$valid) {
              scope.setEmbed();
            }
          });
        });
      }
    }
  })
  .controller('CreateEditProjectsCtrl', function ($scope, Project) {
  	$scope.project = {};
    $scope.setEmbed = function() {
      var id = getId($scope.project.videoURL);
      console.log(id);
      var embed = '<iframe class="col-sm-offset-3" width="311" height="175" src="//www.youtube.com/embed/' 
              + id + '" frameborder="0" allowfullscreen></iframe>';
      $('#embed').append(embed);
    };
    function getId(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
          return match[2];
      } else {
          return 'error';
      }
    };

    this.submit = function() {
      Project.save($scope.project,
        function() { console.log('project saved'); },
        function() { console.log('problem trying to save project'); }
      );
    };

    // validations
    $scope.$watch("project.githubURL", function(newURL, oldURL) {
      $scope.projectForm.githubURL.$setValidity("githubURL needs to be from github.com", isValidGithubUrl(newURL));
    });
  });

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