
var myApp = angular.module('myApp',[]);//creating app

myApp.controller('myController', ['$scope', function($scope) { // creating controller
  $scope.newRoundOpen = false;
}]);