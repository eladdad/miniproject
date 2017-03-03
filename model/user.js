var mongoose = require('mongoose');

var schema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
});

var user = mongoose.model('user', schema);

module.exports = user;
