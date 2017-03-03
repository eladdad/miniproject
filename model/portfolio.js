var mongoose = require('mongoose');

var schema = mongoose.Schema({
	id:String,
	name:{
		type:String,
		required:true
	},
	
	profile_picture:String
});

var portfolio = mongoose.model('portfolio',schema);

module.exports = portfolio;
