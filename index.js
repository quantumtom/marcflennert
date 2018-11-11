const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 'home' page
app.get('/', (req, res) => res.render('pages/index'));
// about page
app.get('/about', (req, res) => res.render('pages/about'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
