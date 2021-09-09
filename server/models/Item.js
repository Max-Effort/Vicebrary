const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    imgsrc: {
        type: String,
    }

})
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;