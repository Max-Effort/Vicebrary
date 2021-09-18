const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    isLiked: {
        type: Boolean,
        default: true
    }

}, opts)

// userSchema.virtual('vices', {
//     ref: 'Vice',
//     localField: 'items.vice'
// });

// hash user password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;