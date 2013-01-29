var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var catSchema = mongoose.Schema({
  age: Number,
  name: String,
  colors: Array
});

var Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
