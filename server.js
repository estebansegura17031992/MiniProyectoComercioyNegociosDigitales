//Parte I
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var session = require('cookie-session');

//Parte II
var config = require('./config');

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: config.secret,
	httpOnly:false
}));


if(process.env.NODE_ENV!=='production'){
	//MORGAN USE FOR SEE BEAUTY REQUEST FOR THE SERVER
	var morgan = require('morgan');
	app.use(morgan('dev'));

	mongoose.connect(config.database); 
} else {
	mongoose.connect(config.databaseProd); 
}

//BODY PARSER: MIDLEWARE USING FOR HANDLING BODY REQUEST
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CONFIGURE OUR APPLICATION
var port = process.env.PORT || 3000; 

app.listen(port,function(){
	console.log("Running localhost port: "+port);
})