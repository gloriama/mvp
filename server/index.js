var express = require('express');
var mongoose = require('mongoose');

var app = express();

//connect to mongo database named "habituate"
mongoose.connect('mongodb://localhost/habituate');

app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/../client'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})