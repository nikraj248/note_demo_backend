const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("Note",noteSchema);