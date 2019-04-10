import 'bootstrap';

import '../../src/scss/index.scss';
// import '../../src/css/fonts.css';

import profile from '../../src/img/portrait-medium.jpg';

const img = document.getElementById('profile');

if (img) {
  img.src = profile;
}
