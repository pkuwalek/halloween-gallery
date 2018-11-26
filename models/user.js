const mongoose = require ("mongoose");

var UserSchema = new mongooseSchema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);