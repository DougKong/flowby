angular.module('mean.drivers')
.controller('DriversController', ['$scope', 'driversService', function($scope, driversService){
  $scope.myData = [
    { name: 'Jim', telephone: "(617)-378-3989" },
    { name: 'Dave', telephone: "(348)-238-8982" },
    { name: 'Alice', telephone: "(370)-382-1010" },
    { name: 'Tim', telephone: "(289)-289-2389" }];

  $scope.driversTotal = $scope.myData.length;

  $scope.$on('ngGridEventData', function(){
    $scope.myOptions.selectRow(1, true);
    driversService.selectDrivers($scope.mySelections);
  });
  $scope.mySelections = [];
  $scope.driversUsed = 0;
  $scope.myOptions = {
    data:  'myData',
    selectedItems: $scope.mySelections,
    afterSelectionChange: function(data){
      $scope.driversUsed = $scope.mySelections.length;
      driversService.selectDrivers($scope.mySelections);
    }
  };
}]);