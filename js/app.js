
var myApp = angular.module('myApp',["pageslide-directive"]);//creating app

myApp.controller('myController', ['$scope', function($scope) { // creating controller
  	$scope.newRoundOpen = false;
  	$scope.tableOpen = false;
  	$scope.scoreOpen=false;
  	$scope.template = { name: 'template2.html', url: 'template/score.html'};
	$scope.score = { value: '0'};

	$scope.changeScoreValue = function(value) { 
		if($scope.score.value=='0'){
			$scope.score.value=""+value;
		}else{
			if(($scope.score.value+value)<=250){
				$scope.score.value = $scope.score.value+""+value;
			}
		}
	};

	$scope.deleteScore = function() { 
		if($scope.score.value!='0'){
			$scope.score.value= $scope.score.value.substring(0, $scope.score.value.length - 1);
			if($scope.score.value==''){
				$scope.score.value='0';
			}
		}

	};
	$scope.changeScoreByCapot =  function() {$scope.score.value='250'};

	$scope.validateScore=function(){
		console.log('nous '+$scope.score.value);
		console.log('eux '+Math.max(0,162-$scope.score.value));
	}
}]);