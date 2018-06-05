var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/users', function(err, res){
mongoose.connect('mongodb://dasari:dasari143@ds023052.mlab.com:23052/myfirstmongodb', function(err, res){	
    if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});