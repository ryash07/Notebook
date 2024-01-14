const express = require('express');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();


// Router 1 : Get all Notes using Get "/api/auth/fetchallusers" . login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Router 2 : Add a Note using post "/api/auth/addnote" . login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min:3}),
    body('description','Description lenght must be 5 characters').isLength({ min:5})
],async(req,res)=>{

    const {title,description,tag} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json({results:results.array()});
    }

    try {
        
        const note = new Notes({
           title,description,tag,user:req.user.id
        }) 

        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router;