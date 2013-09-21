angular.module('mean.map').factory("Shipments", ['$resource', function($resource) {
  console.log('Shipments service');
  return $resource('shipments/:shipmentId', {
    shipmentId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });	
}]);