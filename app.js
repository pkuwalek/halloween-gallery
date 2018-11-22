var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/home", function(req,res){
    res.render("home");
});

app.listen(3000, function(){
    console.log("The Server Has Started!");
 });
 
 app.use(express.static(__dirname + '/public'));