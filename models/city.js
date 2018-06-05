var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var City = new Schema({
  cityName:  { 
    type: String,
    index: true
  }
});

module.exports = mongoose.model('City', City);