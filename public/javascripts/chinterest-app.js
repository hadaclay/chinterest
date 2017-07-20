import '../sass/style.scss';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const navbar_toggle = document.querySelector('.navbar-burger');
const navbar_menu = document.getElementById('navMenu');

navbar_toggle.onclick = function() {
  if (!navbar_toggle.classList.contains('is-active')) {
    this.classList.add('is-active');
    navbar_menu.classList.add('is-active');
  } else {
    this.classList.remove('is-active');
    navbar_menu.classList.remove('is-active');
  }
};

if (document.querySelector('#addPostToggle')) {
  document
    .querySelector('#addPostToggle')
    .addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-close')) {
        return;
      }
      document.querySelector('.modal').classList.add('is-active');
    });

  document.querySelector('.modal-close').addEventListener('click', function(e) {
    document.querySelector('.modal').className = 'modal';
  });
}

const msnry = new Masonry('.grid', { percentPosition: true });
imagesLoaded('.grid', () => {
  msnry.layout();
});

//msnry.layout();
