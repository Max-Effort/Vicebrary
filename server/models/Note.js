const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    visibleTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: {
        type: String,
    }


})
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;