var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RouteSchema = new Schema({
  step: {
    type: Number
  },
  duration: {
    type: Number
  },
  loc: {
    lon: Number,
    lat: Number
  },
  driver: {
    type: Schema.ObjectId,
    ref: 'Driver'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Route', RouteSchema);