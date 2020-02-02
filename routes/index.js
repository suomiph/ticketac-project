var express = require('express');
var router = express.Router();

var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

var journeyModel = require('../models/journey');
var userModel = require('../models/users');

//var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
//var date = ["2020-02-03","2020-02-04","2020-02-05","2020-02-06","2020-02-07"]



// functions
function verifyConnect (response, reqSession) {
	if ( typeof(reqSession.userid) == "undefined" ) {
		response.redirect('/');
		return 0;
	}	
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});


/* GET search page. */
router.get('/index', function(req, res, next) {
	verifyConnect(res,req.session);
	console.log(req.session.firstname)
   res.render('index', { username: req.session.firstname });
});


/* GET search result page. */
router.post('/search', async function(req, res, next) {
	verifyConnect(res,req.session);
	
	var data = await journeyModel.find({ "departure": req.body.fromcity, "arrival": req.body.tocity, "date": req.body.date});
	
	var date = req.body.date;
	
	if (data.length != 0) {
	
		var result = [];
				
		for (var i=0; i<data.length; i++) {
			result.push({
				fromcity: req.body.fromcity,
				tocity: req.body.tocity,
				date: req.body.date,
				hour: data[i].departureTime,
				price: Number( data[i].price ),
			});
		}
		
		req.session.searchResult = result;
		
		res.render('search', { result, date, username: req.session.firstname });		
	} else {	
		res.render('search', { date, username: req.session.firstname, error: `Sorry, no trains registered for ` });
	}
});


/* GET booking page. */
router.get('/booking', function(req, res, next) {
	verifyConnect(res,req.session);

	if (typeof(req.session.panier) == "undefined")  {
		req.session.panier = [];
	}
	
	if (typeof(req.query.position) != "undefined")  {
		var i = req.query.position;
		req.session.panier.push( req.session.searchResult[i] );
	}


	res.render('booking', { result: req.session.panier , username: req.session.firstname });
});


/* GET last trips page. */
router.get('/mytrips', async function(req, res, next) {
	verifyConnect(res,req.session);

	var user = await userModel.findOne( {_id : req.session.userid} );

	var mytrips = user.mytrips;

	res.render('mytrips', { mytrips,  username: req.session.firstname });
});



/* GET last trips page. */
router.get('/addbdd', async function (req, res, next) {
	verifyConnect(res,req.session);

	var user = await userModel.findOne( {_id : req.session.userid});

	
	for (var i=0; i<req.session.panier.length; i++) {
		user.mytrips.push({
			departure: req.session.panier[i].fromcity,
		  	arrival: req.session.panier[i].tocity,
		  	date: req.session.panier[i].date,
		  	departureTime: req.session.panier[i].hour,
		  	price: req.session.panier[i].price,
		});
	}
	
	await user.save(function (err) {
  		if (err) return handleError(err);
  		console.log('Success!');
	});
	
	res.render('index', { username: req.session.firstname });
});



router.get('/logout', async function (req, res, next) {

	req.session.destroy( function(err) {
  		res.redirect('/');
	});
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


//// Cette route est juste une verification du Save.
//// Vous pouvez choisir de la garder ou la supprimer.
//router.get('/result', function(req, res, next) {

//  // Permet de savoir combien de trajets il y a par ville en base
//  for(i=0; i<city.length; i++){

//    journeyModel.find( 
//      { departure: city[i] } , //filtre
//  
//      function (err, journey) {

//          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
//      }
//    )

//  }


//  res.render('index', { title: 'Express' });
//});
