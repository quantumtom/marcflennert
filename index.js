// server.js
// load the things we need
const express = require('express');
const app = express();
const PATH = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.static(PATH.join(__dirname, 'public')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(PORT);
console.log('8080 is the magic port');
