const mongoose = require("mongoose");
const wineSchema = require('./Wine')
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };
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
    },
    imgsrc: {
        type: String
    }

}, opts)
itemSchema.virtual('image', {
    ref: 'Wine',
    localField: 'imgsrc',
    foreignField: 'imgsrc',
    justOne: true
});
console.log(this.image)
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;