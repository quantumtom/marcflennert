require('../css/bootstrap.min.css');
require('../css/custom.css');
require('../css/extra.css');
require('../img/marcflennert01md.jpg');

const $ = require('jquery');
const popper = require('popper.js');
const Bootstrap = require('bootstrap');

define(function () {
    console.log('main.js loaded');
    console.dir($);
    console.dir(popper);
    console.dir(Bootstrap);
});
