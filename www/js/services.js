angular.module('geniusLoci.services', ['restangular'])

.factory('PhoneCamera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.service('Entry', function() {

    this.entry = {
      name: "",
      latitude: 0.0,
      longitude: 0.0,
      file: {
        base64: null,
        filetype: "image/jpeg",
        filename: "image.jpg"
      }
    }

    this.setName = function(name) {
        this.entry.name = name;
    };

    this.setLocation = function(lat, lng) {
      this.entry.latitude = lat;
      this.entry.longitude = lng;
    }

    this.setFile = function(file) {
      this.entry.file.base64 = file;
    }

    this.getObject = function() {
      return this.entry;
    }


});
