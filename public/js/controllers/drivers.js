angular.module('mean.drivers')
.controller('DriversController', ['$scope', function($scope){
  $scope.myData = [
    { name: 'Jim', telephone: "(617)-378-3989" },
    { name: 'Dave', telephone: "(348)-238-8982" },
    { name: 'Alice', telephone: "(370)-382-1010" },
    { name: 'Tim', telephone: "(289)-289-2389" }];
  $scope.myOptions = { data:  'myData'};
}]);