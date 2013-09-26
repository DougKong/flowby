var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverSchema = new Schema({
  firstName: {
    type: String,
    default: "John"
  },
  lastName: {
    type: String,
    default: "Doe"
  }
});


mongoose.model('Driver', DriverSchema);