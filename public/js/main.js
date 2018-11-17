const profile = require('../img/marcflennert01md.jpg');

const $ = require('jquery');
const popper = require('popper.js');
const Bootstrap = require('bootstrap');

define(function () {
    console.log('main.js loaded');

    const el = document.getElementById('profile');

    if (el) {

        const img = document.createElement('img');
        img.src = profile;
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');
        img.alt = 'Marc Flennert';

        el.appendChild(img);

    }
});
