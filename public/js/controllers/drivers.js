angular.module('mean.drivers')
.controller('DriversController', ['$scope', 'driversService', function($scope, driversService){
  $scope.myData = [
    { name: 'Brian', telephone: "(517)-123-3389" },
    { name: 'Matt', telephone: "(813)-378-7929" },
    { name: 'Rupa', telephone: "(141)-378-3989" },
    { name: 'Brett', telephone: "(637)-378-3989" },
    { name: 'Blake', telephone: "(617)-378-3989" },
    { name: 'Martin', telephone: "(697)-378-3989" },
    { name: 'Mike', telephone: "(667)-378-3989" },
    { name: 'Will', telephone: "(640)-668-3989" },
    { name: 'Dave', telephone: "(348)-238-8982" },
    { name: 'Peter', telephone: "(370)-382-1010" },
    { name: 'Tae', telephone: "(370)-382-1010" },
    { name: 'Lindsay', telephone: "(370)-382-1010" },
    { name: 'Doug', telephone: "(370)-382-1010" },
    { name: 'Ruben', telephone: "(280)-532-1310" },
    { name: 'Ed', telephone: "(289)-289-2389" }];

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