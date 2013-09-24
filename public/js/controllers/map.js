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
        var m = $scope.markers;
        var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(m[0].latitude, m[0].longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        google.maps.visualRefresh = true;
        $scope.myMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        $scope.directionsPanel = document.getElementById("directions-panel");
      };
      $scope.getMarkers = function() {
        var m = $scope.markers;
        console.log('getMarkers');
        for (var i =0; i < m.length; i++) {
          var lat = m[i].latitude;
          var lng = m[i].longitude;
          var latlng = new google.maps.LatLng(lat, lng);
          var marker = new google.maps.Marker({position: latlng, icon: m[i].icon, infoWindow: m[i].infoWindow, map: $scope.myMap});
        }
      };
      $scope.getRoutes = function() {
        var m = $scope.markers;
        var tsp = new BpTspSolver($scope.myMap, $scope.directionsPanel);
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
          var driveLeg = new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
        });
      };
      $scope.getShipments();
      deferred.promise.then(
        function() {
          $scope.getMap();
      }).then(
        function() {
          $scope.getMarkers();
      }).then(
        function() {
          $scope.getRoutes();
        }
      );
    }]
  );