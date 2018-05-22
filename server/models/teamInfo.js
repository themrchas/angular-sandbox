var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    teamName:       {type:String, required:true},
    datefounded:    {type:String, required:false},
    city:           {type:String, required:true},
    championships:  {type:Number, required:false},
    stadium:        { 
                        name: String, required:true,
                        capacity: Number, required:false
                    },

    updated:        {type:Date, default:Date.now}

});

module.exports = mongoose.model('Team',schema);

