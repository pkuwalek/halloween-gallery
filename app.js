const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

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

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.listen(3000, () => {
    console.log("The Server Has Started!");
 });
 
 app.use(express.static(__dirname + '/public'));