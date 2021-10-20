var express = require('express');
var router = express.Router();

var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

var userModel = require('../models/users');



/* Routes user's homepage This is a test */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Ticketac' });
});

router.post('/sign-up', async function(req, res, next) {
	
	var userInfo = await userModel.findOne( { email: req.body.email } );
	
	if (userInfo) {
		res.render('login', { error: "Email already registered \n Please, sign-in" });
		return 0;
	}
	
	var userObj = new userModel( {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		mytrips: [],
	} );	

	var userSaved = await userObj.save();
	
	
	req.session.userid = userSaved.id;
	req.session.firstname = userSaved.firstname;
	req.session.lastname = userSaved.lastname;
	req.session.email = userSaved.email;
	req.session.mytrips = userSaved.mytrips;
	
	res.redirect('/index');
}); 

router.post('/sign-in', async function(req, res, next) {
	
	var userInfo = await userModel.findOne( { email: req.body.email, password:req.body.password } );
	
	if (userInfo) {
		req.session.userid = userInfo.id;
		req.session.firstname = userInfo.firstname;
		req.session.lastname = userInfo.lastname;
		req.session.email = userInfo.email;
		req.session.mytrips = userInfo.mytrips;
		
		//res.render('index', { username: req.session.firstname });
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


