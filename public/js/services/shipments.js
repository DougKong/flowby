angular.module('mean.map').factory("Shipments", ['$resource', function($resource) {
  return $resource('shipments/:shipmentId', {
    shipmentId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });	
}]);