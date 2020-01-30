var express = require('express');
var router = express.Router();

var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

var journeyModel = require('../models/journey');
var userModel = require('../models/users');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});



/* GET search page. */
router.get('/index', function(req, res, next) {
	var cityList;
	var hrList;
  res.render('index', {cityList, hrList });
});



/* GET search result page. */
router.post('/search', function(req, res, next) {
	
	
	console.log(req.body)
	
	
	
	var cityList;
	var hrList;
  res.render('search', {cityList, hrList });
});

/* GET booking page. */
router.get('/booking', function(req, res, next) {
	
  res.render('booking');
});

/* GET last trips page. */
router.get('/mytrips', function(req, res, next) {
	
  res.render('mytrips');
});

module.exports = router;

//// Remplissage de la base de donnée, une fois suffit
//router.get('/save', async function(req, res, next) {

//  // How many journeys we want
//  var count = 300

//  // Save  ---------------------------------------------------
//    for(var i = 0; i< count; i++){

//    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//    if(departureCity != arrivalCity){

//      var newUser = new journeyModel ({
//        departure: departureCity , 
//        arrival: arrivalCity, 
//        date: date[Math.floor(Math.random() * Math.floor(date.length))],
//        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//        price: Math.floor(Math.random() * Math.floor(125)) + 25,
//      });
//       
//       await newUser.save();

//    }

//  }
//  res.render('index', { title: 'Express' });
//});
