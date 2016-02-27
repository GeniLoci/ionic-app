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

.service('Entry', function(Restangular) {

    this.entry = {
      name: "A new entry",
      latitude: 0.0,
      longitude: 0.0,
      file: {
        base64: null,
        "content-type": null,
        name: ""
      }
    }

    this.setName = function(name) {
        this.entry.name = name;
    };

    this.setLocation = function(lat, lng) {
      this.entry.latitude = lat;
      this.entry.longitude = lng;
      this.send();
    }

    this.setFile = function(file, type) {
      console.log(file);
    }

    this.send = function() {
      Restangular.all('entries').post(this.entry)
        .then(function() {

        })
        .catch(function() {

        });
    }


});
