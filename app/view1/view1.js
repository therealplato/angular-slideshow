'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.primaryImageUrl = 'components/av-flag.png';
  $scope.prevImg = function(){ console.log('swiped left')}
  $scope.nextImg = function(){ console.log('swiped right')}
}]);