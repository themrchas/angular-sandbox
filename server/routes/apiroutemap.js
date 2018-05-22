var express = require("express");

var router = express.Router();

var log = require('log-util');


//Grab database routines to support REST API
var dbRoutines = require('../controllers/databaseRoutines');
var restAPI = dbRoutines.dbRESTRoutines;


router.use((req, res, next) => {
    res.set({ 'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
            });

    //Return from a pre-flight request
        if (req.method == 'OPTIONS')
    {
        return res.status(200).end();
    }
    else
    {
        next();
    }

});

//Grab all teams currently in the db
router.get('/getTeams', (req, res, next) => {

    restAPI.getAllTeams()
        .then((teams) => {
            res.status(200);
            res.json(teams);
        },
        (err) => {
            res.status(422).send(err);
                
                
        });
});


//Display an exisiting team's information
router.get('/displayTeam', (req, res, next) => {

    //If user has not selected a team send 400 error
    if (!req.query.team) {
        log.error('No team provided');
        res.status(400).send('Error - no team name provided');
        
    }
    else {
        //Grab team and ether return JSON obeject with team info or error
        restAPI.getTeamByName(req.query.team)
            .then(
                (team) => {

                    //If we receive a null document, send that back to requester as an error
                    if (team == null)
                    {
                        
                        log.error('Error retrieving details for', req.query.team, ': Null document returned');
                        res.status(422).send('Null document returned');

                    }
                    else
                    {
                        log.info('Successfully retrieved team data for', req.query.team);
                        res.status(200);
                        //res.set({ 'Content-type': 'application/json' });
                        res.json(team);
                    }
       
                },
                (err) => {
                    log.error('Error retrieving details for', req.query.team, ': ', err);
                    res.status(422).send(err);
                    
                }

            );
    }
});


//Delete team from database
router.delete('/deleteTeam/:team', (req, res, next) => {
  
    //Ensure the delete request has a team in the POST body
    if (!req.params.team) 
    {
        log.error('No team name provided.');
        res.status(404).end('No team name provided.');
        
        
    }
    else 
    {
        //Get db id of team, cause that is what we will usee as db key for deletion
        restAPI.getTeamByName(req.params.team)
            .then(
                (teamData)=> {
                    log.info('Team',req.params.team,'has db id',teamData._id);

                    //Perform actual team deletion
                    return restAPI.deleteTeam(teamData._id);
                }
            )
            .then(
                (teamData)=> {
                    log.info('Team',req.params.team,'has been deleted from the database');
                    res.status(200);

                    //Return the deleted recod to user
                    res.json(teamData);
                }
            )
            .catch(
                (err)=> {
                    log.error('Encountered error deleting', req.params.team,' : ',err);
                    res.statusMessage = err;
                    res.status(422).send(err);
                   
               }
            )
    
        } //else
   
});


//Perform the actual team creation in database
router.post('/addTeam', (req, res, next) => {

    //Prepare JSON object for saving matching Team schema.  These are taken from the POST request body.
    var teamInfoToSave = {
        teamName: req.body.teamName,
        datefounded: req.body.dateFounded,
        city: req.body.city,
        championships: req.body.championships,
        stadium: { name: req.body.stadiumName, capacity: req.body.stadiumCapacity }
    };

    
    restAPI.saveTeam(teamInfoToSave)
        .then(
            (teamData) => {

                log.info('Successfully created document for team', req.body.teamName);
                res.status(201);
                res.json(teamData);

            },
            (err) => {
                log.error('Create failed for', req.body.teamName, ': ', err);
                res.status(422).send(err);
                

            }
        );

    

});



//Editing capability - expects a JSON object in the request that will replace the current information for a team.
//Basically edits by performing a wholesale object replace.
router.put('/editTeam', (req, res, next) => {

    console.log('in editTeam the data is ', req.body);

    //Ensure the team name is valid and if so, grab the Mongo document ID
    if (!req.body.teamName) {
        log.error("URL parameter 'team' not found in edit request.")
        res.status(400).send('No URL paramter teamName identified');
        

    }
    else {

        //Prepare JSON object created from URL parameters passed in POST request
        var editedTeamData = {
            teamName: req.body.teamName,
            datefounded: req.body.dateFounded,
            city: req.body.city,
            championships: req.body.championships,
            stadium: { name: req.body.stadiumName, capacity: req.body.stadiumCapacity }
        };

       

        //Grab _id field associated with the team and then update the team information
        restAPI.getTeamByName(req.body.teamName)
            .then(
                //Grab current db id
                (currentTeamData) => {
                    log.info('db id associated with ', req.body.teamName, ": ", currentTeamData._id);
                    return restAPI.updateTeam(editedTeamData, currentTeamData._id);
                })
            .then(
                //Perform update on the document
                (currentTeamData) => {
                    log.info("Success updating team ", req.body.teamName, ": ", currentTeamData);
                    return restAPI.getTeamById(currentTeamData._id)
                    
                })
            .then(
                //Prepare response to include the updated document
                (newTeamData) => {
                    log.info("Success updating team ", req.body.teamName, ": ", newTeamData);
                    res.status(200);
                    res.json(newTeamData);
                })


            .catch(
                (err) => {
                    log.error("Error updating team", req.body.teamName, ": ", err);
                    res.status(422).send(err);
                    
                });


    } //else

});



module.exports = router;

