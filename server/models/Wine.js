const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema({
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        // required: true
    },
    year: {
        type: Number,
        // required: true
    },
    country: {
        type: String,
    },
    type: {
        type: String,
    },
    imgsrc: {
        type: String
    },
    description: String
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;