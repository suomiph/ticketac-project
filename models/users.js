var mongoose = require('mongoose');

//mytrips Schemma
var mytripsSchema = mongoose.Schema( {
	departure: String,
  	arrival: String,
  	date: Date,
  	departureTime: String,
  	price: Number,
} );


// user Schema
var userSchema = mongoose.Schema( {
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	mytrips : [mytripsSchema],
} );

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel ;
