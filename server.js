const express = require('express');
const app = express();

const mongoose = require('mongoose');

const note = require('./src/models/note');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = process.env.PORT;

mongoose.connect("mongodb+srv://nikraj123:chqbook123@cluster0.qbdgrjc.mongodb.net/notesdb").then(function () {

    app.get("/", function (req, res) {
        res.send("hello from home page");
    });

    app.get("/notes/data",async function (req, res) {
 
        var notes = await note.find();
        res.json(notes);

        //res.send("hello from notes page");
    });

    // app.get("/notes/add",async function (req, res) {
 
    //     const newNote = new note({
    //         id:"101",
    //         title:"abc",
    //         description:"hello"
    //     })
    //     await newNote.save();


    //     const message ={message:"new note created"};
    //     res.json(message);

    //     //res.send("hello from notes page");
    // });

    app.post("/notes/add",async function (req, res) {

        //res.json(req.body);

        await note.deleteOne({id:req.body.id});

        const newNote = new note({
            id:req.body.id,
            title:req.body.title,
            description:req.body.description
        })
        await newNote.save();


        const message ={message:"new note created  "+`id ${req.body.id}`};
        res.json(message);

        //res.send("hello from notes page");
    });

    app.post("/notes/delete",async function(req,res){

        await note.deleteOne({id:req.body.id});

        const message ={message:"note deleted  "+`id ${req.body.id}`};
        res.json(message);
    });


});



app.listen(PORT, function () {
    console.log("server running");
})