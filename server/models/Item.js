const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    // Define Model Here

})
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;