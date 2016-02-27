angular.module('geniusLoci.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaGeolocation, $ionicPopup, NgMap, Entry) {

  //Location object
  $scope.location = {lat: 0, lng: 0, name: 0};

  //Get Geo-Location
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.location = {
        lat:  position.coords.latitude,
        lng:  position.coords.longitude,
        name: null
      }
      Entry.setLocation($scope.location.lat, $scope.location.lng);
      $scope.lookupInfo();
    })
    .catch(function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Location Error',
        template: 'Unable to get your location. Perhaps you need to enable GPS/Location Sharing?'
      });
    });

    //Lookup info from Google Maps API
    $scope.lookupInfo = function() {
      var geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': $scope.location}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if(results.length > 0) {
            $scope.location.name = results[0].formatted_address;
            $scope.$apply();
          }
        } else {
          var alertPopup = $ionicPopup.alert({
            title: 'API Error',
            template: 'Unable to get information about your location from the Google Maps API.'
          });
        }
      });
    }

})

.controller('RecordCtrl', function($scope, $ionicPopup, $interval, Entry) {

  $scope.time = 0;
  $scope.isRecording = false;
  $scope.recording = {file: null, filePath: null};

  $interval(function() {
    if($scope.isRecording) {
      $scope.time += 1000;
    }
  }, 1000);

  $scope.toggleRecording = function() {
    $scope.isRecording = !$scope.isRecording;

    if($scope.isRecording) {
      navigator.device.capture.captureAudio
        .then(function(e) {
          console.log(e);
          $scope.recording.file = e[0].localURL;
          $scope.recording.filePath = e[0].fullPath;
        })
        .catch(function(err) {
        })
    }


  }

})

.controller('PhotographCtrl', function($scope, $state, PhoneCamera, Entry) {
  $scope.image = null;

  PhoneCamera.getPicture({destinationType: navigator.camera.DestinationType.DATA_URL})
    .then(function(imageData) {
      Entry.setFile("data:image/jpeg;base64," + imageData)
    })
    .catch(function() {
      $state.go('home');
    });
});
