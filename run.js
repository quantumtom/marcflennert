var http = require('http');
var express = require('express');
var app = express();
var compress = require('compression');
var bodyParser = require('body-parser');

app.use(compress());

console.log('__dirname = ' + __dirname);

app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('listening');}
);

