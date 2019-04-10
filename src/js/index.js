import 'bootstrap';

import '../scss/index.scss';

import profile from '../img/portrait-small.jpg';

const img = document.getElementById('profile');

if (img) {
  img.src = profile;
}
