var mongoose = require ('mongoose');
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

exports.all = function(req, res) {
  var container = [];
  var baseLat = 44;
  var baseLong = -74;

  for (var i = 0; i < 5; i++)
  {
    var myLat = baseLat + Math.random();
    var myLong = baseLong + Math.random();
    var value = Math.round(100*Math.random()*10)/100;
    container.push({latitude: myLat, longitude: myLong, value: value });
  }
  res.jsonp(container);
};