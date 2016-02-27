angular.module('geniusLoci.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaGeolocation, NgMap) {

  //Location object
  $scope.location = {
    latitude: "Loading",
    longitude: "Loading",
    name: "Loading"
  }

  //Get Geo-Location
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.location.latitude  = position.coords.latitude;
        $scope.location.longitude = position.coords.longitude;

        //Find information about location
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': $scope.location.latitude + ',' + $scope.location.longitude}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            console.log(status);
          }
        });


      }, function(err) {
        // error
  });




})
