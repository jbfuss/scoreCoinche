
var myApp = angular.module('myApp',["pageslide-directive"]);//creating app

myApp.controller('myController', ['$scope', function($scope) { // creating controller
  	$scope.newRoundOpen = false;
  	$scope.tableOpen = false;
  	$scope.addcSoreOpen=false;
  	$scope.rounds=[];
  	$scope.newRound =  { owner:'nous', point:'80', suit:'pique', coinche:''};
  	$scope.template = { name: 'template2.html', url: 'template/score.html'};
	$scope.score = { owner:'nous', value: '0',belote:''};

	$scope.getTotal = function(owner){
	    var total = 0;
	    for(var i = 0; i < $scope.rounds.length; i++){
	        var round = $scope.rounds[i];
	        if(owner=="nous"){
	        	console.log(round);
	        	total+=round.pointNous;
	        }else{
				total+=round.pointEux;
	        }
	    }
	    return total;
	}

	$scope.getIfSelected = function(value,element){
		if(value==element){
			return 'selected';
		}else{
			return '';
		}
	}

	$scope.changeScoreValue = function(value) { 
		if($scope.score.value=='0'){
			$scope.score.value=""+value;
		}else{
			if(($scope.score.value+value)<=162){
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
	$scope.changeScoreByCapot =  function() {$scope.score.value='162'};

	$scope.validateScore=function(){
		var pointNous=0;
		var pointEux=0;
		var contrat = parseInt($scope.newRound.point);
		var beloteNous = 0;
		var beloteEux = 0;
		//CHECK BELOTE
		if($scope.score.belote=='nous'){
			pointNous+=20;
			beloteNous = 20;
		}
		if($scope.score.belote=='vous'){
			pointEux+=20;
			beloteEux = 20;
		}
		//Calcul point
		if($scope.score.owner=='nous'){
			//Check capot
			if($scope.score.value=="162"){
				pointNous += 250;
			}else{
				if($scope.score.value=="0"){
					pointEux +=250;
				}else{
					pointNous += parseInt($scope.score.value);
					pointEux += Math.max(0,162-$scope.score.value);
				}
				
			}
			

		}else{
			//Check capot
			if($scope.score.value=="162"){
				pointEux += 250;
			}else{
				if($scope.score.value=="0"){
					pointNous +=250;
				}else{
					pointEux += parseInt($scope.score.value);
					pointNous += Math.max(0,162-$scope.score.value);
				}
				
			}
		}
		//match with contract
		if($scope.newRound.owner=="nous"){
			if(pointNous>=contrat && pointNous>=pointEux){
				if($scope.newRound.coinche==''){
					pointNous = (Math.round(pointNous / 10) * 10)+contrat;
					pointEux = (Math.round(pointEux / 10) * 10)
				}else{

					pointEux=beloteEux;
					
					if($scope.newRound.coinche=='coinche'){
						pointNous=160+(contrat*2)+beloteNous
					}else{
						//surcoinche
						pointNous=160+(contrat*4)+beloteNous
					}
				}
			}else{
				pointNous=beloteNous;
				if($scope.newRound.coinche==''){
					pointEux=160+contrat+beloteEux;
				}else{
					if($scope.newRound.coinche=='coinche'){
						pointEux=160+(contrat*2)+beloteEux;
					}else{
						//surcoinche
						pointEux=160+(contrat*4)+beloteEux;
					}
				}
			}
		}else{
			//OWNER => EUX
			if(pointEux>=contrat && pointEux>=pointNous){
				if($scope.newRound.coinche==''){
					pointEux = (Math.round(pointEux / 10) * 10)+contrat;
					pointNous = (Math.round(pointNous / 10) * 10);
				}else{
					pointNous=beloteNous;
					
					if($scope.newRound.coinche=='coinche'){
						pointEux=160+(contrat*2)+beloteEux;
					}else{
						//surcoinche
						pointEux=160+(contrat*4)+beloteEux;
					}
				}
			}else{
				pointEux=beloteEux;
				if($scope.newRound.coinche==''){
					pointNous=160+contrat+beloteNous;
				}else{
					if($scope.newRound.coinche=='coinche'){
						pointNous=160+(contrat*2)+beloteNous;
					}else{
						//surcoinche
						pointNous=160+(contrat*4)+beloteNous;
					}
				}
			}
		}

		var r = confirm("Nous : "+pointNous+" - Eux : "+pointEux);
		if (r == true) {
		    //addNewRound
		    $scope.rounds.push({
		    	owner:$scope.newRound.owner,
		    	contrat:$scope.newRound.point,
		    	suit:$scope.newRound.suit,
		    	pointNous:pointNous,
		    	pointEux:pointEux
		    });
		    $scope.newRoundOpen = false;
  			$scope.tableOpen = false;
  			$scope.addScoreOpen=false;
  			$scope.newRound =  { owner:'nous', point:'80', suit:'pique', coinche:''};
			$scope.score = { owner:'nous', value: '0',belote:''};
			console.log($scope.rounds);
		} else {
			//doNothing
		}
	}


}]);