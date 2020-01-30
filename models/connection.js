var mongoose = require('mongoose');

var URI_bdd = 'mongodb+srv://adminTicketac:waeTh1To@cluster0-vhfpk.mongodb.net/mybdd?retryWrites=true&w=majority';


var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true
	};


mongoose.connect( URI_bdd, 
	options, 
	function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);

