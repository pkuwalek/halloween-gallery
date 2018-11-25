var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/home", function(req,res){
    var photos = [
        {image: "imgs/candles.jpg"},
        {image: "imgs/spiders.jpg"},
    ]
    res.render("home", {photos:photos});
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});

app.listen(3000, function(){
    console.log("The Server Has Started!");
 });
 
 app.use(express.static(__dirname + '/public'));