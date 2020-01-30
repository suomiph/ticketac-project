var express = require('express');
var router = express.Router();

var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

var userModel = require('../models/users');





/* Routes user's homepage */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Ticketac' });
});


// 
//	function (res, req, next) {
//		if ( typeof(req.session.userid) == "undefined" ) {
//			res.redirect('/');
//		}	else next();
//	},

router.post('/sign-up', async function(req, res, next) {
	
	var userInfo = await userModel.findOne( { email: req.body.email } );

	if (userInfo) {
		res.render('login', { error: "Email already registered \n Please, sign-in" });
		return ;
	}
	
	var userObj = new userModel( {
		firstname: req.body.username,
		lastname: req.body.username,
		email: req.body.email,
		password: req.body.password,
	} );
		
	var userSaved = await userObj.save();
	
	req.session.userid = userSaved.id;
	req.session.username = userSaved.username;
	res.redirect('/index');
}); 



router.post('/sign-in', async function(req, res, next) {
	
	var userInfo = await userModel.findOne( { email: req.body.email, password:req.body.password } );
	
	if (userInfo) {
		req.session.userid = userInfo.id;
		req.session.username = userInfo.username;
		res.redirect('/index');
	} else {
		res.render('login', { error: "Invalid email or password" });
	}

});

router.get('/logout', async function(req, res, next) {
	
	req.session.destroy( function () {
		res.render('home', { title: 'Ticketac', error: "See you soon !" })
	});
	
});



module.exports = router;
