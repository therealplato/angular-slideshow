'use strict';
angular.module('slideshowApp.view1', ['ngRoute', 'ngMaterial'])
// Slash terminated base URL for images and folder.json file:
.constant('baseUrl', '/images/')
// Alternate absolute URI for different host or port (requires CORS headers on that server)
//.constant('baseUrl', 'https://192.168.1.101:3333/images/')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope', '$rootScope', '$http', 'baseUrl', function($scope, $rootScope, $http, baseUrl) {
  window.scrollTo(0,1);
  // imgs is an array of filenames, from baseUrl/folder.json, relative to baseUrl:
  $scope.imgs = [];
  // Index keeps track of the current position in the imgs array:
  $scope.index = 0;
  // shuffledIndexes is the same length as imgs and is used to map a normal index to a shuffled index:
  $scope.shuffledIndexes = [];
  // When shuffle is true,  the displayed image is $scope.imgs[$scope.shuffledIndexes[$scope.index]]
  // When shuffle is false, the displayed image is $scope.imgs[$scope.index]
  $scope.shuffle = false;
  // primaryImageUrl is a string url, templated into CSS background-image: url()
  $scope.primaryImageUrl = "";
  $scope.onScroll=function($event, $delta, $deltaX, $deltaY){
    if($delta > 0){ //scroll up
      $scope.prevImg();
    } else if($delta < 0){
      $scope.nextImg();
    }
  }

  // Get a list of images with an AJAX call:
  $scope.loadImages = function(){
    // Append a nonce, to make the URI unique and avoid hitting any cache:
    var nonce=new Date().valueOf();
    $http.get(baseUrl+"folder.json?nonce="+nonce).success(function (data) {
      console.log(data);
      $rootScope.$broadcast('indexImages', data);
    });
  }

  // Display the image at the URL from either shuffled or normal imgs for this index:
  $scope.drawImage = function(){
    if($scope.shuffle){
      var imgName = $scope.imgs[$scope.shuffledIndexes[$scope.index]];
    } else {
      var imgName = $scope.imgs[$scope.index];
    }
    $scope.primaryImageUrl = baseUrl + imgName;
  }

  // Handle a UI interaction requesting the previous image:
  $scope.prevImg = function(){
    // Avoid negative index problem; -1 % 100 = -1:
    $scope.index = ($scope.index - 1 + $scope.n) % $scope.n
    $scope.drawImage();
  }

  // Handle a UI interaction requesting the next image:
  $scope.nextImg = function(){
    $scope.index = ($scope.index + 1) % $scope.n;
    $scope.drawImage();
  }

  // Given an array of names, shuffle indexes and save to scope:
  function shuffleIndexes(names){
    // Clear any existing index:
    $scope.shuffledIndexes = [];

    var tmp = [];
    // Attach a random value to each index in imgs:
    names.forEach(function(name, index){
      tmp.push({
        i: index,
        rand: Math.random(),
      })
    })

    // Sort the array in place by ascending .rand:
    tmp.sort(function(a, b){
      return (a.rand < b.rand) ? -1 : 1;
    })

    // Add each index in randomized order to $scope.shuffledIndexes:
    for(var i=0; i<tmp.length; i++){
      $scope.shuffledIndexes.push(tmp[i].i);
    }
  }


  // Listener to set up when we get a data set:
  $scope.$on('indexImages', function(event, data){
    $scope.imgs = data;
    $scope.index = 0;
    $scope.n = data.length;

    shuffleIndexes(data);
    $scope.drawImage();
  })

  // Listener to set scope shuffle variable on broadcast from menuController:
  $scope.$on('shuffle', function(e, data){
    $scope.shuffle = data;
    if(!$scope.shuffle){
      // Shuffle was disabled. For better UX we want to 'resume' in order with next/prev working.
      // Silently set the normal index to the index of the previously displayed shuffled image:
      $scope.index = $scope.shuffledIndexes[$scope.index];
    }
    $scope.drawImage();
  })

  // Make the AJAX call to folder.json and start displaying:
  $scope.loadImages();
}]);
