const mongoose = require ("mongoose");

var ImageSchema = new mongoose.Schema({
    path: String,
    title: String,
});

module.exports = mongoose.model("Image", ImageSchema);