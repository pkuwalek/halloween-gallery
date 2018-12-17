# Halloween Gallery

Simple gallery website created with Node.js and MongoDB.

### Introduction

The main goal was to create a fairly simple web page in order to practice using Node.js and Bootstrap 4. It had to have a login and register form connected with MongoDB and a users profile page.

### Technologies used

- JavaScript
- Node.js
- MongoDB
- Mongoose
- Express
- Passport
- Bootstrap 4
- EJS

### Description

Halloween Gallery starts with a landing page containing a timer that counts day to next Halloween and background slider of 5 images. After clicking "Get Inspired" button user is transfered to home page with a navbar, jumbotron and image gallery. All images are connected to database and can be downloaded by clicking "Download" button. After clicking on an image lightbox is opened. To like images user has to register by submitting a form containing user's first name, email and password. All user data are stored in MongoDB. To like images user has to click heart button under a given image. Clicked button changes color. User that's logged in can view all liked images by clicking a link to users profile page "Signed in as...".