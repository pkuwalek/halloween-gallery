const mongoose = require ("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    firstName: String,
    username: String,
    password: String,
    imgsLiked: [ObjectId]
});

//check if image was liked
UserSchema.methods.findFavImage = function findFavImage (id) {
    return this.imgsLiked.indexOf(id);
};

//if image was liked, delete & if not add to favourites
UserSchema.methods.setFavImage = function setFavImage (id) {
    var imageIndex = this.findFavImage(id)
    if (imageIndex == -1){
        this.imgsLiked.push(id);
        this.save((err) => {
            console.log(err);
        });
    }
    else {
        this.imgsLiked.remove(id);
        this.save((err) => {
            console.log(err);
        });
    }
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);