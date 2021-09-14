const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Notes'
    }],
    isLiked: {
        type: Boolean,
        default: true
    }

})

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;