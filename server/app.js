//Grab express module
var express = require('express')
var app = express();

//Make routing visible to app
var routes = require("./routes/routemap");

var apiRoutes = require("./routes/apiroutemap");

//Nice to have around if needed
var session = require('express-session');

const mongoose = require('mongoose');

//Grab the methods that will be used to access the MongoDB and pass the express object to be able to share info via app.locals
var dbRoutines = require('./controllers/databaseRoutines')(app);

var apiRoutines = dbRoutines.dbRESTRoutines;

var log = require('log-util');

var bodyParser = require('body-parser');

//Grab the embedded query string for any POST requests      
app.use(bodyParser.urlencoded({extended:false}));

//Grab JSON objects embedded in PUT requests
app.use(bodyParser.json());


//Create a cookie for users' session
app.use(session({
    secret: 'mySecretKey',
    resave: 'true',
    saveUninitialized: true,
    cookie: { maxAge: 60000}
    })
);


//Track how often a user accesses the site. 
app.get('/',(req,res,next)=> {

    if (req.session.views)
    {
        req.session.views++;
    }
    else
    {
        req.session.views = 1;
    }

    log.info('Number of views is '+req.session.views);

    next();

});

//Template engine details
app.set('views','./views');
app.set('view engine', 'pug');

//All of get/post URLs use the form '/op/operation' which allows us to manage the routes in routemap.js with minimal effort.  
//This functionality is associated with performing CRUD operations via a web interface as in Assignment 4
app.use(['/op'],routes);

//Routes associtaed with REST API based on Assignment 5 criteria.  These routes are of the form '/api/operation'
app.use('/api',apiRoutes);

//Used for Angular application
app.use('/',express.static('../client/dist'));


//If we reach this block of code, there have been no path matches so return to the app splash page
app.use((req,res)=> {
 console.log('no match');
      res.redirect('/');

}); 

module.exports = app;