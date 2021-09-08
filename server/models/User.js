const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    // Define Model Here

})
const User = mongoose.model("User", UserSchema);

module.exports = User;