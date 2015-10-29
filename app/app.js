'use strict';

// Declare app level module which depends on views, and components
angular.module('slideshowApp', [
  'ngRoute',
  'ngMaterial',
  'slideshowApp.view1',
  'slideshowApp.view2',
  'slideshowApp.version',
  'monospaced.mousewheel',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('menuController', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.shuffle = false;
  $scope.broadcastShuffle = function(){
    $rootScope.$broadcast('shuffle', $scope.shuffle)
  }
}])