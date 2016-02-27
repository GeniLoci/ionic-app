angular.module('geniusLoci.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaGeolocation, $ionicPopup, NgMap) {

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

.controller('RecordCtrl', function($scope) {
    console.log('test record');
})

.controller('PhotographCtrl', function($scope, $state, Camera) {

  $scope.image = null;

  Camera.getPicture()
    .then(function(imageURI) {
      $scope.image = imageURI;
    })
    .catch(function() {
      $state.go('home');
    });

});
