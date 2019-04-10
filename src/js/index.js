import 'bootstrap';

import '../../src/scss/index.scss';

import profile from '../../src/img/portrait-medium.jpg';

const img = document.getElementById('profile');

if (img) {
  img.src = profile;
}
