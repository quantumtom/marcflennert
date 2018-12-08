import 'bootstrap';

import '../scss/index.scss';

import profile from '../img/portrait-medium.jpg';

const el = document.getElementById('profile');

if (el) {
  const img = document.createElement('img');
  img.src = profile;
  img.classList.add('img-fluid');
  img.classList.add('img-thumbnail');
  img.classList.add('rounded');
  img.classList.add('mx-auto');
  img.classList.add('d-block');
  // img.height = 500;
  // img.width = 375;
  img.alt = 'Marc Flennert';

  el.appendChild(img);
}
