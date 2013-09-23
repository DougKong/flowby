angular.module('mean.map')
  .controller('MapController', ['$scope', '$timeout', '$log', 'Shipments', '$q',
    function($scope, $timeout, $log, Shipments, $q){

      // Enable the new Google Maps visuals until it gets enabled by default.
      // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
      $scope.myOptions = {data: 'shipments'};
      $scope.shipments = [];
      $scope.markers = [];
      var deferred = $q.defer();

      $scope.getShipments = function() {
        console.log($scope.deferred);
        Shipments.query("", function(shipments) {
          $scope.shipments = shipments;
          for (var i =0; i < shipments.length; i++) {
            $scope.markers[i] = {
              latitude: $scope.shipments[i].latitude,
              longitude: $scope.shipments[i].longitude,
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + $scope.shipments[i].iconColor,
              infoWindow: $scope.shipments[i].value.toString()
            };
          }
          deferred.resolve(shipments);
        });
      };

      $scope.getMap = function() {
        google.maps.visualRefresh = true;
        angular.extend($scope, {
          position: {
            coords: {
              latitude: 45,
              longitude: -73
            }
          },
          /** the initial center of the map */
          centerProperty: {
            latitude: 45,
            longitude: -73
          },
          /** the initial zoom level of the map */
          zoomProperty: 8
        });
      };
      $scope.getMarkers = function() {
        angular.extend($scope, {    
          /** list of markers to put in the map */
          markersProperty: $scope.markers,
        });
      };
      $scope.getShipments();
      $scope.getMap();
      deferred.promise.then(
        function() {
          $scope.getMarkers();
      });

    }]
  );