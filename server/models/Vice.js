const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viceSchema = new Schema({
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    vice_id: {
        type: Schema.Types.ObjectId,
        ref: 'Vice'
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
        type: String,
    },
    description: {
        type: String,
    },
    note: {
        type: String,

    }
});

// viceSchema.virtual('note', {
//     ref: 'Item',
//     localField: 'note',
//     foreignField: 'note',
// });


const Vice = mongoose.model("Vice", viceSchema);

module.exports = Vice;