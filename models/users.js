var mongoose = require('mongoose');

// user Schema
var userSchema = mongoose.Schema( {
	firstname: String,
	lastname: String,
	email: String,
	password: String,
} );

var UserModel = mongoose.model('users', userSchema);


module.exports = UserModel ;
