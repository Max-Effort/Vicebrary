const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    isLiked: {
        type: Boolean,
        default: true
    }

})

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;