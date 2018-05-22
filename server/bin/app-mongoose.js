const mongoose = require("mongoose");
var Team = require("../models/teamInfo");
var log = require("log-util");
var dbRoutines = require("../models/databaseRoutines")();


//Connection to the database
var db;

dbRoutines.connectToDb()
    .then(
            ()=> {db = mongoose.connection; 
                  log.info("connected to mongo db");
                  db.on('open',startServer);

            },
            (err) => { log.error("Unable to create connection to the database",err);}

        );

function startServer()
{

    
}



 
/*
db.on('open', function() {
    console.log("connected to mongo!");

    var test = {
        teamName: "VfB Stuttgart",
        city: "Stuttgart",
        stadium: {name:"Mercedes Benz Arena", capacity:60000 }

    };

    var team = new Team(test); */
/*
    team.save()
                .then(()=>{ console.log('save worked'); })
                .catch((err)=> { console.log('save failed'+err); });

    console.log('done with save');
*/


/*
    Team.count( {}, function(err,results) {
        if (err) { console.log("error is "+err); }
        else
        {
            console.log('query returned '+results);
        }
    });





}).catch( (err)=> { console.log('error'+err); }); */