var mongoose = require('mongoose');

var schema = mongoose.Schema({
  id:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true
  },
  URL:String,
  screenshot:String
});

schema.index({id: 1, title: 1},{unique: true});

var project = mongoose.model('project', schema);

module.exports = project;
