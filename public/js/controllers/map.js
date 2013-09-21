angular.module('mean.map')
  .controller('MapController', ['$scope', '$timeout', '$log', 'Shipments', '$q',
    function($scope, $timeout, $log, Shipments, $q){

      // Enable the new Google Maps visuals until it gets enabled by default.
      // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
      $scope.myOptions = {data: 'shipments'};
      $scope.shipments = [];
      var deferred = $q.defer();

      $scope.getShipments = function() {
        console.log($scope.deferred);
        Shipments.query("", function(shipments) {
          $scope.shipments = shipments;
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
          zoomProperty: 8,
          /** list of markers to put in the map */
          markersProperty: $scope.shipments,

          //These 2 properties will be set when clicking on the map
          clickedLatitudeProperty: null,
          clickedLongitudeProperty: null,
          eventsProperty: {
            click: function (mapModel, eventName, originalEventArgs) {
              // 'this' is the directive's scope
              $log.log("user defined event on map directive with scope", this);
              $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
            }
          }
        });
      };
      $scope.getShipments();
      deferred.promise.then(
        function() {
          $scope.getMap();
      });
      $scope.getMap();
    }]
  );