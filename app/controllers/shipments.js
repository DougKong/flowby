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
  var shipments = 30;
  var drivers = 3;
  var baseLat = 44;
  var baseLong = -74;
  var iconColors = ['FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'];

  for (var i = 0; i < shipments; i++)
  {
    var myLat = baseLat + Math.random();
    var myLong = baseLong + Math.random();
    var value = Math.round(100*Math.random()*10)/100;
    container.push({latitude: myLat, longitude: myLong, value: value });
    preClustering.push([myLat, myLong]);
  }
  clusters = clusterfck.kmeans(preClustering, drivers);

  for (var j=0; j < container.length; j++) {
    container[j].iconColor = iconColors[findClusterGroup(clusters, container[j])];
  }
  res.jsonp(container);
};