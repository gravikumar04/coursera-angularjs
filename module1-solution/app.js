(function () {
  'use strict';
var mod =  angular.module('LunchCheck',[]);
mod.controller.$injector=['$scope'];
mod.controller('LunchCheckController',function ($scope) {
  $scope.name="";

  $scope.splitter = function () {
    var arrayOfStrings;

    $scope.inputList = $scope.inputList.trim();
    arrayOfStrings = $scope.inputList.split(",");
    arrayOfStrings= arrayOfStrings.filter(function (value) {
         console.log(value!="");
         return value !="";
    });
    if(arrayOfStrings.length >= 0 ){
        if(arrayOfStrings.length<=3){
            $scope.name="Enjoy!";
            console.log('Enjoy!');
          }else{
            $scope.name="Too Much";
            console.log('Too Much ');
          }
    }else{
      $scope.name="Please enter data first ";
      console.log('Please enter');
    }
  };
});

// mod.controller('LunchCheckController',function ($scope,$filter) {
//     $scope.name="ravi kumar";
//
//     $scope.upCase=function () {
//       $scope.name=$filter('uppercase')($scope.name);
//     };
//   });
})();
