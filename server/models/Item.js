const mongoose = require("mongoose");
const wineSchema = require('./Wine')
const User = mongoose.model('User')
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
        ref: 'Vice'
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
itemSchema.pre('deleteOne', function() {
    User.findOneAndUpdate({ _id: this.owner_id }, { $pull: { items: this._id } });
    console.log('PreRemove Hook Called \n \n Removing ' + this._id + ' from User List')
})
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;