const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { find } = require('../models/Note');

const Note = require('../models/Note')

// fetching all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// adding note 
router.post('/addnote', fetchuser, async (req, res) => {
    try {
        const { title,description } = req.body;
        
        const note = await Note.updateOne(
           { user: req.user.id},
           // pushing new note object inside notes
            {$push:{
                notes:{
                    title:title,
                    description:description
                }
            }},{new:true}
        )
        
        // returning the all the notes in notes variable
        const notes = await Note.find({ user: req.user.id });
        res.json({notes})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// updating note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    try {
        let note = await Note.updateOne(
                {user:req.user.id,"notes._id":req.params.id},
                {$set:{
                    "notes.$.title":title,
                    "notes.$.description":description
                        
                      }
                }
            )
            
        note = await Note.find({ user: req.user.id });
        res.send( note );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // find the note to be deleted
        let note = await Note.findOneAndUpdate({
            user:req.user.id,"notes._id":req.params.id
            }, {
            $pull: {
                notes: { _id: req.params.id }
            }
        })
        note = await Note.find({ user: req.user.id });
        res.send( note );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router