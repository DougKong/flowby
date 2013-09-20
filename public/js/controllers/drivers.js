angular.module('mean.drivers')
.controller('DriversController', ['$scope', function($scope){
  //console.log('drivercontroller');
  $scope.myData = [
    {name: 'Moroni', age: 50},
    {name: 'Dave', age:48},
    {name: 'Bob', age:70 }];
  $scope.myOptions = { data:  'myData'};
}]);