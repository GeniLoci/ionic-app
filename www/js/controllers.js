angular.module('geniusLoci.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaGeolocation, $state, $ionicPopup, NgMap, Entry, markers) {

  $scope.markers = markers;
  console.log(markers);

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
            Entry.setName($scope.location.name);
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

    $scope.showEntry = function(e, entry) {
      console.log('click');
      $state.go('view', {id: entry.id});
    }

})

.controller('RecordCtrl', function($scope, $ionicPopup, $interval, Entry) {
  //Actual recording needs programming in.
  $scope.time = 0;
  $scope.isRecording = false;

  $interval(function() {
    if($scope.isRecording) {
      $scope.time += 1000;
    }
  }, 1000);

  $scope.toggleRecording = function() {
    $scope.isRecording = !$scope.isRecording;
  }
})

.controller('PhotographCtrl', function($scope, $state, PhoneCamera, Entry) {
  //Take photograph, store base64.
  $scope.image = null;
  PhoneCamera.getPicture({destinationType: navigator.camera.DestinationType.DATA_URL})
    .then(function(imageData) {
      Entry.setFile(imageData);
      $state.go('upload');
    })
    .catch(function() {
      $state.go('home');
    });
})

.controller('UploadCtrl', function($scope, $state, Restangular, Entry) {
  Restangular.all('entries').post(Entry.getObject())
    .then(function(resp) {
      $state.go('view', {id: resp.entry.id});
    });
})

.controller('ViewCtrl', function($scope, NgMap, entry) {
  $scope.entry = entry.entry;
});
