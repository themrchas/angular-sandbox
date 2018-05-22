var express = require("express");

var router = express.Router();

var log = require('log-util');


//Grab database routines
var dbRoutines = require('../controllers/databaseRoutines')();



//Display an exisiting team's information
router.get('/displayTeam' , (req,res,next)=> {      

    //log.info('req.query is',req.query);
    console.log('in displayTeam');

    //If user has not selected a team from the splash page, send back to splash page
    if (!req.query.team)
    {
        console.error('No team selected');
        res.redirect("/");
    }
    else
    {
        dbRoutines.getTeamByName(req.query.team)
            .then(
                (teamData) => { log.info('Successfully retrieved team data for ',req.query.team);  res.render('team', {"teamName":req.query.team, "teamInfo":teamData}) },
                (err) => log.error('Error retrieving details for ',req.query.team,': ',err)
        );
    }
});


//Render template addTeam
router.get('/addTeam' , (req,res,next)=> {

    res.render('addTeam');

});


//Perform the actual team creation in database; called from addTem template
router.post('/addTeam' , (req,res,next)=> { 

     //Prepare JSON object for saving matching Teams schema
    var teamInfoToSave = {
                        teamName: req.body.teamName,
                        datefounded: req.body.dateFounded,  
                        city: req.body.city,    
                        championships: req.body.championships,
                        stadium: { name: req.body.stadiumName, capacity: req.body.stadiumCapacity}
                    };

    dbRoutines.saveTeam(teamInfoToSave)
        .then(
            ()=> { log.info('Add complete for ',teamInfoToSave.teamName ); },
            (err)=> { log.error('Add failed for  ',teamInfoToSave.teamName,': ',err); }
        );

    //Send user back to splash page
    res.redirect("/");

});




//Delete team from database
router.get('/deleteTeam/:teamName' , (req,res,next)=> {    

    log.info('Team to delete is',req.params.teamName,'in router.get dlete team');
    
    dbRoutines.getTeamByName(req.params.teamName)
        .then(
                (teamData)=> { 
                    log.info('Team',req.params.teamName,' has db id ',teamData._id);
                    return dbRoutines.deleteTeam(teamData._id);
                }
            )
            .then(
                (deletedTeamData)=> { 
                       log.info('Deletion of ',req.params.teamName,'complete');
                }
            )

           .catch(
                (err)=> {
                    log.error('Encountered error deleting ', req.params.teamName,' : ',err);
               }
            )

            //No matter what happens, in the end send the user back to the splash page
            .then(
                ()=> { res.redirect("/"); }
            );

     
});


       


//Receive the team name, get the DB id of the document corresponding to the team, and then render the edit template
router.get('/editTeam/:teamName' , (req,res,next)=> {      

    dbRoutines.getTeamByName(req.params.teamName)
        .then(
                (teamData) => {  log.info('DB id is ',teamData._id); res.render('editTeam', {"teamName":req.params.teamName, "teamInfo":teamData}) },
                (err) => log.error('Unable to establish the DB id of ',req.params.teamName)
        );

    
});

//Perform the actual record edit; this is called from the editTeam template
router.post('/editTeam' , (req,res,next)=> { 

    //Prepare JSON object for saving team information changes
   var teamInfoToSave = {
                       teamName: req.body.teamName,
                       datefounded: req.body.dateFounded,  
                       city: req.body.city,    
                       championships: req.body.championships,
                       stadium: { name: req.body.stadiumName, capacity: req.body.stadiumCapacity}
                   };
    
    //Grab the id of the team document 
    var docId = req.body.docId;

    dbRoutines.updateTeam(teamInfoToSave,docId)
        .then(
            ()=> { log.info('Update of ',teamInfoToSave.teamName,' complete'); },
            (err)=> { log.err('Update of ',teamInfoToSave.teamName,' failed: ',err); }
       );

   res.redirect("/");

});

router.all('/', (req,res)=> {
       
    dbRoutines.getAllTeams()
        .then(
            (info) => { res.render('splash', {"teamData": info }); },
            (err) => {log.error('Error attempting to call getAllTeams ',err)}
        );
    });


module.exports = router;

