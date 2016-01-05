var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//controllers
var goalController = require('./controllers/goalController.js');
var userController = require('./controllers/userController.js');

var app = express();

//connect to mongo database named "habituate"
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/habituate');

//set up ability to read data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8000);

app.post('/goals', goalController.add);
app.get('/goals', goalController.getAll);
app.get('/goal/*', goalController.getOne);
app.delete('/goal/*', goalController.delete);

app.post('/users', userController.add);
app.get('/user/*', userController.getOne);

app.use(express.static(__dirname + '/../client'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})