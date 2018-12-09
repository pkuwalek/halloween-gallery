const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
var User = require("./models/user");
var Image = require("./models/image");

mongoose.connect("mongodb://localhost:27017/tester", (err, db) => {
  if(!err) {
    console.log("We are connected");
  } else {
    console.log(err);
  }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "I really want to have a dog!",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//landing page route
app.get("/", (req, res) => {
    res.render("landing", {daysUntilHalloween:daysUntilHalloween()});
});

//home route
app.get("/home", (req, res) => {
    //get images from DB
    Image.find({}, (err, allImages) => {
        if(err){
            console.log(err);
        } else {
            res.render("home", {images:allImages});
        }
    });
});

//auth routes

//show sign up form
app.get("/register", (req, res) => {
    res.render("register");
});
//handle sign up logic
app.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username, firstName: req.body.firstName});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Successfully signed up as " + user.firstName);
            res.redirect("/home");
        });
    });
});

//show login form
app.get("/login", (req, res) => {
    res.render("login");
});
//handle login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), (req, res) => {
});

//logout route
app.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You logged out successfully.");
    res.redirect("/home");
});

//users profile page route
app.get("/users/:id", isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err){
            console.log(err);
            res.redirect("/home");
        }
        res.render("users/show", {user: foundUser});
    });
});

app.get("/fav/:image_id", (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You need to be logged in to like images.");
        res.redirect("/home");
    } else {
        let imageId = req.params.image_id;
        console.log(imageId)
        let user =  req.user;
        console.log(user)
        var imageIndex = user.findFavImage(imageId)
        console.log(imageIndex)
        if(imageIndex == -1){
            user.setFavImage(imageId);
            res.redirect("/home");
//            heartBtnWhiteToRed();
        } else {
            user.setFavImage(imageId);
            res.redirect("/home");
//            heartBtnRedToWhite();
        }   
    }
});

// app.get("/fav/:image_id", isLoggedIn, (req, res) => {
//     Image.findById(req.params.image_id, (err, foundImage) => {
//         if(err){
//             console.log(err);
//             res.redirect("/home");
//         }
//         console.log(foundImage.title , req.user.firstName);
//     });
// });

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in!");
    res.redirect("/login");
};

function daysUntilHalloween() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let halloween = new Date(today.getFullYear(), 9, 31);
    const oneDay = 1000*60*60*24;
    if (today.getMonth() == 9 && today.getDate() == 31){
        return 0;
    }
    if (today.getMonth() > 9){
        halloween.setFullYear(halloween.getFullYear()+1);
    }
    return (Math.ceil((halloween-today)/oneDay));
};

app.listen(3000, () => {
    console.log("The Server Has Started!");
 });