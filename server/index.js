var express = require('express');
var mongoose = require('mongoose');

//controllers
var goalController = require('./controllers/goalController.js');

var app = express();

//connect to mongo database named "habituate"
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/habituate');

app.set('port', process.env.PORT || 8000);

app.get('/goals', goalController.getAll);

app.post('/goals', function(req, res) {
  console.log('got post request!');
});

app.use(express.static(__dirname + '/../client'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})