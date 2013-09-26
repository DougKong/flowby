angular.module('mean').service('driversService', ['$rootScope', function($rootScope) {
  var selectedDrivers = [];
  return {
    selectDrivers: function(drivers) {
      selectedDrivers = drivers;
      $rootScope.$broadcast('selectedDriversChanged', selectedDrivers);
    }
  };
}]);