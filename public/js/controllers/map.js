angular.module('mean.map')
  .controller('MapController', ['$scope', '$timeout', '$log', 'Shipments', '$q', 'driversService',
    function($scope, $timeout, $log, Shipments, $q, driversService){

      // Enable the new Google Maps visuals until it gets enabled by default.
      // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
      $scope.myOptions = {data: 'shipments'};
      $scope.shipments = [];
      $scope.markers = [];
      $scope.home = new google.maps.LatLng(37.7835939, -122.40890360000003);
      var iconColors = ['00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'];
      var routeColors = ['33FF33', '3333FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'];
      var routes = [];
      var timeDriverCountChanged = new Date();
      var getMapFirstTime = true;
      var tsp = new BpTspSolver($scope.myMap, $scope.directionsPanel);
      tsp.setAvoidHighways(true);
      tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);


      $scope.getShipments = function(drivers, callback) {
        Shipments.query({"drivers": drivers}, function(shipments) {
          $scope.shipments = shipments;
          for (var i =0; i < shipments.length; i++) {
            $scope.markers[i] = {
              latitude: $scope.shipments[i].latitude,
              longitude: $scope.shipments[i].longitude,
              cluster: $scope.shipments[i].cluster,
              icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + iconColors[$scope.shipments[i].cluster],
              infoWindow: $scope.shipments[i].value.toString()
            };
          }
        (function() { callback(); })();
        });
      };

      $scope.getMap = function(callback) {
        var m = $scope.markers;
        var mapOptions = {
          zoom: 13,
          center: $scope.home,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        google.maps.visualRefresh = true;
        $scope.myMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        $scope.directionsPanel = document.getElementById("directions-panel");
        (function() { callback(); })();
      };

      $scope.getHomeMarker = function(callback) {
        var marker = new google.maps.Marker({
          position: $scope.home,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FF0000',
          map: $scope.myMap
        });
        (function() { callback(); })();
      };

      $scope.getMarkers = function(callback) {
        var m = $scope.markers;
        for (var i =0; i < m.length; i++) {
          var lat = m[i].latitude;
          var lng = m[i].longitude;
          var latlng = new google.maps.LatLng(lat, lng);
          var marker = new google.maps.Marker({position: latlng, icon: m[i].icon, infoWindow: m[i].infoWindow, map: $scope.myMap});
        }
        (function() { callback(); })();
      };
      $scope.getRoutes = function() {
        var m = $scope.markers;

        for (var i = 0; i < m.length; i++) {
          if (m[i].cluster === 0) {
            var lat = m[i].latitude;
            var lng = m[i].longitude;
            var latlng = new google.maps.LatLng(lat, lng);
            tsp.addWaypoint(latlng);
          }
        }
        tsp.addWaypoint($scope.home);
        tsp.setAsStart($scope.home);
        tsp.solveRoundTrip(function() {
          var dir = tsp.getGDirections();
          var legs = dir.routes[0].legs;
          var firstLegCoordinates = [];

          tsp.startOver();
          for (var k=0; k < legs.length; k++) {
            for (var j=0; j < legs[k].steps.length;j++) {
              firstLegCoordinates.push(legs[k].steps[j].start_location);
            }
          }
          routes.push(new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor: "#" + routeColors[0], strokeOpacity: 1.0, strokeWeight: 2}));

          for (var i = 0; i < m.length; i++) {
            if (m[i].cluster === 1) {
              var lat = m[i].latitude;
              var lng = m[i].longitude;
              var latlng = new google.maps.LatLng(lat, lng);
              tsp.addWaypoint(latlng);
            }
          }

          tsp.addWaypoint($scope.home);
          tsp.setAsStart($scope.home);
          tsp.solveRoundTrip(function() {
            var dir = tsp.getGDirections();
            var legs = dir.routes[0].legs;
            var firstLegCoordinates = [];

            tsp.startOver();
            for (var k=0; k < legs.length; k++) {
              for (var j=0; j < legs[k].steps.length;j++) {
                firstLegCoordinates.push(legs[k].steps[j].start_location);
              }
            }
            routes.push(new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor:  "#" + routeColors[1], strokeOpacity: 1.0, strokeWeight: 2}));

            for (var i = 0; i < m.length; i++) {
              if (m[i].cluster === 2) {
                var lat = m[i].latitude;
                var lng = m[i].longitude;
                var latlng = new google.maps.LatLng(lat, lng);
                tsp.addWaypoint(latlng);
              }
            }

            tsp.addWaypoint($scope.home);
            tsp.setAsStart($scope.home);
            tsp.solveRoundTrip(function() {
              var dir = tsp.getGDirections();
              var legs = dir.routes[0].legs;
              var firstLegCoordinates = [];

              tsp.startOver();
              for (var k=0; k < legs.length; k++) {
                for (var j=0; j < legs[k].steps.length;j++) {
                  firstLegCoordinates.push(legs[k].steps[j].start_location);
                }
              }
              routes.push(new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor:  "#" + routeColors[2], strokeOpacity: 1.0, strokeWeight: 2}));

              for (var i = 0; i < m.length; i++) {
                if (m[i].cluster === 3) {
                  var lat = m[i].latitude;
                  var lng = m[i].longitude;
                  var latlng = new google.maps.LatLng(lat, lng);
                  tsp.addWaypoint(latlng);
                }
              }

              tsp.addWaypoint($scope.home);
              tsp.setAsStart($scope.home);
              tsp.solveRoundTrip(function() {
                var dir = tsp.getGDirections();
                var legs = dir.routes[0].legs;
                var firstLegCoordinates = [];

                tsp.startOver();
                for (var k=0; k < legs.length; k++) {
                  for (var j=0; j < legs[k].steps.length;j++) {
                    firstLegCoordinates.push(legs[k].steps[j].start_location);
                  }
                }
                routes.push(new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor:  "#" + routeColors[3], strokeOpacity: 1.0, strokeWeight: 2}));

                for (var i = 0; i < m.length; i++) {
                  if (m[i].cluster === 4) {
                    var lat = m[i].latitude;
                    var lng = m[i].longitude;
                    var latlng = new google.maps.LatLng(lat, lng);
                    tsp.addWaypoint(latlng);
                  }
                }

                tsp.addWaypoint($scope.home);
                tsp.setAsStart($scope.home);
                tsp.solveRoundTrip(function() {
                  var dir = tsp.getGDirections();
                  var legs = dir.routes[0].legs;
                  var firstLegCoordinates = [];

                  tsp.startOver();
                  for (var k=0; k < legs.length; k++) {
                    for (var j=0; j < legs[k].steps.length;j++) {
                      firstLegCoordinates.push(legs[k].steps[j].start_location);
                    }
                  }
                  routes.push(new google.maps.Polyline({path: firstLegCoordinates, map: $scope.myMap, strokeColor:  "#" + routeColors[4], strokeOpacity: 1.0, strokeWeight: 2}));                
                });
              });
            });
          });
        });
      };

      $scope.changeLegend = function(drivers) {
        var legend = document.getElementById('legend');

        legend.innerHTML = '';

        var name = 'Home';
        var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + 'FF0000';
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);

        for (var i=0; i < drivers.length;i++) {
          name = drivers[i].name;
          icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + iconColors[i];
          div = document.createElement('div');
          div.innerHTML = '<img src="' + icon + '"> ' + name;
          legend.appendChild(div);
        }
        $scope.myMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));
      };

      $scope.$on('selectedDriversChanged', function(event, drivers) {
        var timeThreshold = new Date(timeDriverCountChanged.getTime() + 1000);
        var now  = new Date();

        if (getMapFirstTime) {
          getMapFirstTime = false;
          $scope.getShipments(5, function() {
            $scope.getMap(function() {
              $scope.getHomeMarker(function() {
                $scope.getMarkers(function() {
                  $scope.getRoutes();
                  $scope.changeLegend(drivers);
                });
              });
            });
          });
        }
        else if (now > timeThreshold) {
          for (var i=0; i<routes.length; i++) {
            routes[i].setMap(null);
          }
          routes = [];
          $scope.getShipments(drivers.length, function() {
            $scope.getMarkers(function() {
              $scope.getRoutes();
              $scope.changeLegend(drivers);
            });
          });
          timeDriverCountChanged = now;
        }
      });
    }]
  );