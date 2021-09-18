const mongoose = require("mongoose");
const wineSchema = require('./Wine')
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };
const itemSchema = new Schema({
    owner_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    vice_type: {
        type: String,
        required: true
    },
    vice_id: {
        type: mongoose.Types.ObjectId,
    },
    note: {
        type: String,
        default: "Nothing notable. 🤣"
    }

}, opts)
itemSchema.virtual('vice', {
    ref: 'Vice',
    localField: 'vice_id',
    foreignField: '_id',
});
itemSchema.pre('remove', function() {
    console.log('PreRemove Hook Called')
    Vice.deleteOne({ _id: this.vice_id });
})
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;