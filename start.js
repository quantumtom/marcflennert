const express = require('express');
const PATH = require('path');
const PORT = process.env.PORT || 80;
const app = express();

app.engine('html', require('ejs').renderFile);

app.use(express.static(PATH.join(__dirname, 'dist')));
app.use(express.static(PATH.join(__dirname + '/public/')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// "Work" page
app.get('/', function(req, res) {
    res.render('pages/work.ejs');
});

// "About" page
app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
});

app.listen(PORT, function () {
    console.log(PORT + ' is the magic port');
});
