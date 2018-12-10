const throng = require('throng');
const compression = require('compression');

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

  app.use(compression({ filter: shouldCompress }));

  function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
  }

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  app.listen(PORT, function() {
    console.log(PORT + ' is the magic port');
  });
}
