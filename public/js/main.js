const $ = require('jquery');
const popper = require('popper.js');
const Bootstrap = require('bootstrap');
require('../css/bootstrap.min.css');
require('../css/custom.css');
require('../css/extra.css');

define(function () {
    console.log('main.js loaded');
    console.dir($);
    console.dir(popper);
    console.dir(Bootstrap);
});
