var app = require('../app');
var http = require('http');
var log = require('log-util');
const mongoose = require('mongoose');

var dbRoutines = require('../controllers/databaseRoutines')();

//Connection to the database
var db = dbRoutines.db;

//Server listens on this port
const port = 8080;

//http server
var server;


//Start http server if we were able to connect to the DB
dbRoutines.connectToDb()
    .then(
            ()=> {app.locals.db = mongoose.connection; 
                  log.info("Connected to mongo db");
                  startServer();
                 }, 
            (err) => { log.error("Unable to create connection to the database - ",err); }
        );


function startServer()
{
    server = http.createServer(app);
    server.listen(port);

    server.on('listening', ()=> {
        log.info('Listening on ', server.address().port);
        log.info("__dir is ", __dirname);
        log.info("node is running from ", process.cwd());
    });


      
}



