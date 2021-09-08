const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({

    // Define Model Here

})
const Library = mongoose.model("Library", LibrarySchema);

module.exports = Library;