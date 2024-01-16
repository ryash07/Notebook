const express = require('express');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();


// Router 1 : Get all Notes using Get "/api/notes/fetchallusers" . login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Router 2 : Add a Note using post "/api/notes/addnote" . login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min:3}),
    body('description','Description lenght must be 5 characters').isLength({ min:5})
],async(req,res)=>{

    const {title,description,tag} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json({results:"results.array()"});
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

// Router 3 : Update note using put "/api/notes/updatenote:id" . login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
    // create a new Note object
    const newNote = {};
    if(title) newNote.title = title;
    if(description) newNote.description = description;
    if(tag) newNote.tag = tag;

    // Find the node to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note) return res.status(404).send("Not Found");
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).json({msg:"Not allowed"});
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
    res.json({note});

} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
}

})

// Router 4 : Delete an existing note using: Delete "/api/notes/deletenote/:id" . login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {
    // Find the node to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note) return res.status(404).send("Not Found");
    
    // Check the id of the user which is deleting the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).json({msg:"Not allowed"});
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});

} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
}

})

module.exports = router;