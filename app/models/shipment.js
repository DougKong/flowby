var mongoose = require('mongoose');
var config = require('../../config/config');
var Schema = mongoose.Schema;

var ShipmentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  user: {
   type: Schema.ObjectId,
   ref: 'User'
  }
});

mongoose.model('Shipment', ShipmentSchema);