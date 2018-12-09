const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const express = require('express');
const PATH = require('path');
const PORT = process.env.PORT || 80;
const app = express();

throng(
  {
    workers: WORKERS,
    lifetime: Infinity
  },
  start
);

function start() {
  app.engine('html', require('ejs').renderFile);

  app.use(express.static(PATH.join(__dirname, 'dist')));

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  app.listen(PORT, function() {
    console.log(PORT + ' is the magic port');
  });
}
