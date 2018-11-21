const express = require('express');
const PATH = require('path');
const PORT = process.env.PORT || 80;
const app = express();

app.engine('html', require('ejs').renderFile);

app.use(express.static(PATH.join(__dirname, 'dist')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Reel page
app.get('/', function(req, res) {
    res.render('pages/reel.ejs');
});

// About page
app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
});

app.listen(PORT, function () {
    console.log(PORT + ' is the magic port');
});
