const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    notes: [{
        title: String,
        description: String,
    }]

});

const Note = mongoose.model('notes', NotesSchema);

module.exports = Note