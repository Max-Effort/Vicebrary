const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    vice_type: {
        type: String,
    },
    vice_id: {
        type: String,
        unique: true
    }

})
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;