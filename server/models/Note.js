const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({

    // Define Model Here

})
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;