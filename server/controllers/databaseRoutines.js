var mongoose = require('mongoose');
var Team = require("../models/teamInfo");

//Use to hide db creds
require('dotenv').config();


module.exports = function(app)
{
    //Returns connection to DB
    function connectToDb ()
    {
        
         return mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-u4qws.mongodb.net:27017,cluster0-shard-00-01-u4qws.mongodb.net:27017,cluster0-shard-00-02-u4qws.mongodb.net:27017/cscie31db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`)
    
    }
        
    //Returns all info for a given team
    function getTeamByName(teamName)
    {
        console.log('Getting info for team ',teamName);
        return Team.findOne({ 'teamName': teamName });
    }

    //Returns info for all teams in the DB
    function getAllTeams()
    {
        
        return Team.find({});
    }

    //Saves a team to DB
    function saveTeam(teamObject)
    {
        var team = new Team(teamObject);
        return team.save();

    }

    //Delete a team from the DB based on team name
    function deleteTeam(teamId)
    {
        console.log('Deleting team with Id',teamId);
        return Team.findByIdAndRemove(teamId);


    }

    //Update a team; docId is the _id of team in DB to be updated and team is JSON object used to update
    function updateTeam(team,docId)
    {
        
        return Team.findByIdAndUpdate(docId,team);

    }

 
    return {
        connectToDb:connectToDb,
        getTeamByName:getTeamByName,
        getAllTeams:getAllTeams,
        saveTeam:saveTeam,
        deleteTeam:deleteTeam,
        updateTeam:updateTeam
        
    };

}
    
class dbRESTRoutines {

    static getAllTeams()
    {
        return Team.find({});
            
    }

    static getTeamByName(teamName)
    {
        
        return Team.findOne({ 'teamName': teamName });
    }
    
    static saveTeam(teamObject)
    {
        
        var team = new Team(teamObject);
        return team.save();

    }

    static deleteTeam(teamId)
    {
      
       return Team.findByIdAndRemove(teamId);

    }

    static updateTeam(team,docId)
    {
        console.log('info to update',team)
        return Team.findByIdAndUpdate(docId,team);

    }

    static getTeamById(docId)
    {
        return Team.findById(docId);

    }



}


module.exports.dbRESTRoutines = dbRESTRoutines;


