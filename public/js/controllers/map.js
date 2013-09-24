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
              latitude: 37.7835939,
              longitude: -122.40890360000003
            }
          },
          /** the initial center of the map */
          centerProperty: {
            latitude: 37.7835939,
            longitude: -122.40890360000003
          },
          /** the initial zoom level of the map */
          zoomProperty: 13
        });
      };
      $scope.getMarkers = function() {
        angular.extend($scope, {    
          /** list of markers to put in the map */
          markersProperty: $scope.markers,
        });
      };
      $scope.getRoutes = function() {
        var m = $scope.markers;
        var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(m[0].latitude, m[0].longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var myMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var directionsPanel = document.getElementById("directions-panel");
        var tsp = new BpTspSolver(myMap, directionsPanel);
        tsp.setAvoidHighways(true);
        tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);

        for (var i =0; i < 3; i++) {
          var lat = m[i].latitude;
          var lng = m[i].longitude;
          var latlng = new google.maps.LatLng(lat, lng);

          tsp.addWaypoint(latlng);
        }
        tsp.solveRoundTrip(function(){
          var dir = tsp.getGDirections();
          var legs = dir.routes[0].legs;
          var firstLegCoordinates = [];

          for (var k=0; k < legs.length; k++) {
            for (var j=0; j < legs[k].steps.length;j++) {
              firstLegCoordinates.push(legs[k].steps[j].start_location);
            }
          }
          var driveLeg = new google.maps.Polyline({path: firstLegCoordinates, map: myMap, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
          $scope.firstLegCoordinates = firstLegCoordinates;
          driveLeg.setMap(myMap);
        });
      };
      $scope.getShipments();
      $scope.getMap();
      deferred.promise.then(
        function() {
          $scope.getMarkers();
      }).then(
        function() {
          $scope.getRoutes();
        }
      );
    }]
  );