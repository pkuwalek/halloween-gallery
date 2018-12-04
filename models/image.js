const mongoose = require ("mongoose");

var ImageSchema = new mongoose.Schema({
    path: String,
    title: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
});

module.exports = mongoose.model("Image", ImageSchema);