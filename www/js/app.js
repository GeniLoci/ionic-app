// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('geniusLoci', ['ionic', 'ngCordova', 'ngMap', 'restangular', 'geniusLoci.controllers', 'geniusLoci.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  RestangularProvider.setBaseUrl('http://46.101.9.141');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl',
    resolve: {
      markers: function(Restangular) {
        return Restangular.all('entries').getList();
      }
    }
  })

  .state('photograph', {
    url: '/photograph',
    templateUrl: 'templates/photograph.html',
    controller: 'PhotographCtrl'
  })

  .state('record', {
    url: '/record',
    templateUrl: 'templates/record.html',
    controller: 'RecordCtrl'
  })

  .state('upload', {
    url: '/upload',
    templateUrl: 'templates/upload.html',
    controller: 'UploadCtrl'
  })

  .state('view', {
    url: '/view/:id',
    templateUrl: 'templates/view.html',
    controller: 'ViewCtrl',
    resolve: {
      entry: function(Restangular, $stateParams) {
        return Restangular.one('entries', $stateParams.id).get();
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
