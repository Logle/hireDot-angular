'use strict';

angular.module('hireDotApp')
  .directive('editProfileFileUpload', function($http) {
    return {
      restrict: 'A',
      scope: {
        currentUser: '=',
        pictureType: '@',
        fileType: '@'
      },
      link: function(scope, element, attrs) {

        // Filepicker settings
        filepicker.setKey('Acw0VeSQcTCSvPgAV5GEqz');

        // Aviary settings
        var featherEditor = new Aviary.Feather({
          apiKey: '00a8f855dcd6e4ff',
          apiVersion: 3,
          theme: 'dark',
          tools: 'all',
          appendTo: ''
        });

        var uploadProfilePicture = function() {

          // Upload original to Filepicker
          var uploadOriginal = function(doneUploadOriginal) {
            var pickerOptions = {
              mimetype: 'image/*',
              container: 'modal',
              services: ['FACEBOOK', 'GOOGLE_DRIVE', 'COMPUTER', 'URL']
            };

            filepicker.pick(pickerOptions, function onSuccess(originalBlob) {
              doneUploadOriginal(null, originalBlob.url);
            }, function onError(FPError) {
              doneUploadOriginal(FPError);
            });
          };

          // Edit image on Aviary
          var editImage = function(originalImageUrl, doneEditImage) {
            featherEditor.launch({
              cropPresets: [["Square", "1:1"]],
              cropPresetsDefault: "Square",
              cropPresetsStrict: true,
              forceCropPreset: ['Square', '200x200'],
              forceCropMessage: 'Crop your picture:',
              image: element,
              url: originalImageUrl,
              onSave: function(imageId, editedImageAviaryUrl) {
                featherEditor.close();
                doneEditImage(null, originalImageUrl, editedImageAviaryUrl);
              },
              onError: function(errObj) {
                featherEditor.close();
                doneEditImage(errObj.message);
              }
            })
          };

          // Move edited image URL to Filepicker
          var uploadEdited = function(originalImageUrl, editedImageAviaryUrl, doneUploadEdited) {
            filepicker.store({url: editedImageAviaryUrl}, function onSuccess(editedBlob) {
              doneUploadEdited(null, originalImageUrl, editedImageAviaryUrl, editedBlob.url)
            }, function onError(FPError) {
              doneUploadEdited(FPError);
            });
          };

          var doneEverything = function(err, originalImageUrl, editedImageAviaryUrl, editedImageUrl) {

            // Update the currentUser data on the scope
            if (attrs.pictureType === "standard") {
              scope.currentUser.profilePicture = {
                original: originalImageUrl,
                crops: {
                  _200x00: editedImageUrl
                }
              };
            } else if (attrs.pictureType === "funny") {
              scope.currentUser.profilePicture = {
                original: originalImageUrl,
                crops: {
                  _200x00: editedImageUrl
                }
              };
            }

            // Update the src attribute of this element for image preview
            element.attr('src', editedImageUrl);
          };

          async.waterfall([uploadOriginal, editImage, uploadEdited], doneEverything);
        };

        // Adding a click event for this function, because ng-click doesn't work here
        element.click(function() {
          if (attrs.fileType === "image") {
            uploadProfilePicture();
          } else if (attrs.fileType === "resume") {
            uploadResume();
          }
        });
      }
    };
  });

