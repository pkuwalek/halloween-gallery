const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
var User = require("./models/user");

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
    next();
});

//landing page route
app.get("/", (req, res) => {
    res.render("landing");
});

//home route
app.get("/home", (req, res) => {
    var photos = [
        {image: "imgs/candles.jpg"},
        {image: "imgs/spiders.jpg"},
        {image: "imgs/black-cat.jpg"},
        {image: "imgs/ingredients.jpg"},
        {image: "imgs/book.jpg"},
        {image: "imgs/cookies.jpg"},
        {image: "imgs/jack-o-lantern.jpg"},
    ]
    res.render("home", {photos:photos});
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
            console.log(err)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
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

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(3000, () => {
    console.log("The Server Has Started!");
 });