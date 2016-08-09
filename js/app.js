
var myApp = angular.module('myApp',["pageslide-directive"]);//creating app

myApp.controller('myController', ['$scope', function($scope) { // creating controller
  $scope.newRoundOpen = false;
  $scope.tableOpen = false;
}]);