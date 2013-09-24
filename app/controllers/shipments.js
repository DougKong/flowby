var mongoose = require ('mongoose');
var clusterfck = require('clusterfck');
var Shipment = mongoose.model('Shipment');

exports.shipment = function(req, res, next,id) {
  Shipment.load(id, function(err, shipment) {
    if (err) {
      return next(err);
    }
    req.shipment = shipment;
    next();
  });
};

/**
 * Create a shipment
 */
exports.create = function(req, res) {
  var shipment = new Shipment(req.body);
  shipment.user = req.user;

  shipment.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        shipment: shipment
      });
    }
    else {
      res.jsonp(shipment);
    }
  });
};

/**
 * Show a shipment
 */
exports.show = function(req, res) {
  res.jsonp(req.shipment);
};

var findClusterGroup = function(clusters, marker) {
  for (var j=0; j < clusters.length; j++) {
    for (var k=0; k < clusters[j].length; k++ ) {
      if (marker.latitude === clusters[j][k][0] && marker.longitude === clusters[j][k][1]) {
        return j;
      }
    }
  }
  return -1000;
};

exports.all = function(req, res) {
  var container = [];
  var preClustering = [];
  var clusters = [];
  var shipments = 3;
  var drivers = 3;
  var baseLat = 44;
  var baseLong = -74;
  var iconColors = ['00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'];

/*
  for (var i = 0; i < shipments; i++)
  {
    var myLat = baseLat + Math.random();
    var myLong = baseLong + Math.random();
    var value = Math.round(100*Math.random()*10)/100;
    container.push({latitude: myLat, longitude: myLong, value: value });
    preClustering.push([myLat, myLong]);
  }
*/
// hard code the same 3 shipments as the google-map-tsp-solver working example
  container.push({latitude: 37.7835939, longitude: -122.40890360000003, value: 11 });
  container.push({latitude: 37.7649789, longitude: -122.46778, value: 12 });
  container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 13 });
  container.push({latitude: 37.79567779417, longitude: -122.4214975332, value: 14 });
  container.push({latitude: 37.7762932842937, longitude: -122.444474181539, value: 15 });
  container.push({latitude: 37.7926631131336, longitude: -122.414680997015, value: 16 });
  container.push({latitude: 37.7857338084653, longitude: -122.425605443703, value: 17 });
  container.push({latitude: 37.7921505613557, longitude: -122.393999973668, value: 18 });
  container.push({latitude: 37.7910208429028, longitude: -122.414779178931, value: 19 });
  container.push({latitude: 37.7705521452532, longitude: -122.443957955232, value: 20 });
  container.push({latitude: 37.7736443572994, longitude: -122.44737431471, value: 21 });
  container.push({latitude: 37.7641691659555, longitude: -122.402020961928, value: 22 });
  container.push({latitude: 37.7896046819909, longitude: -122.399518858878, value: 23 });
  container.push({latitude: 37.7967202703615, longitude: -122.402290350205, value: 24 });
  container.push({latitude: 37.7945354105227, longitude: -122.416146766003, value: 25 });
  container.push({latitude: 37.7357241811434, longitude: -122.446668843873, value: 26 });
  container.push({latitude: 37.7899962614841, longitude: -122.411932009537, value: 27 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 28 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 29 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 30 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 31 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 32 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 33 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 34 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 35 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 36 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 37 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 38 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 39 });
  // container.push({latitude: 37.8079231, longitude: -122.41833200000002, value: 40 });


  preClustering.push([37.7835939, -122.40890360000003]);
  preClustering.push([37.7649789, -122.46778]);
  preClustering.push([37.8079231, -122.41833200000002]);
  preClustering.push([37.79567779417, -122.4214975332]);
  preClustering.push([37.7762932842937, -122.444474181539]);
  preClustering.push([37.7926631131336, -122.414680997015]);
  preClustering.push([37.7857338084653, -122.425605443703]);
  preClustering.push([37.7921505613557, -122.393999973668]);
  preClustering.push([37.7910208429028, -122.414779178931]);
  preClustering.push([37.7705521452532, -122.443957955232]);
  preClustering.push([37.7736443572994, -122.44737431471]);
  preClustering.push([37.7641691659555, -122.402020961928]);
  preClustering.push([37.7896046819909, -122.399518858878]);
  preClustering.push([37.7967202703615, -122.402290350205]);
  preClustering.push([37.7945354105227, -122.416146766003]);
  preClustering.push([37.7357241811434, -122.446668843873]);
  preClustering.push([37.7899962614841, -122.411932009537]);
  clusters = clusterfck.kmeans(preClustering, drivers);


  for (var j=0; j < container.length; j++) {
    var clusterFound = findClusterGroup(clusters, container[j]);
    container[j].cluster = clusterFound;
    container[j].iconColor = iconColors[clusterFound];
  }
  res.jsonp(container);
};