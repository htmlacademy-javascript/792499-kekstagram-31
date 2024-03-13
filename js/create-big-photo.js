import { isEscapeKey } from './utils.js';
import { createDataPhoto } from './gallery.js';

const createBigPhoto = () => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const pictureCancel = document.querySelector('#picture-cancel');

  const onOpenPicture = (evt) => {
    evt.preventDefault();

    const targetElement = evt.target;

    if (targetElement.matches('.picture__img')) {
      bigPicture.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
    }

    createDataPhoto(bigPicture, targetElement);
  };

  const onClosePicture = (evt) => {
    evt.preventDefault();

    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  };

  pictures.addEventListener('click', onOpenPicture);
  pictureCancel.addEventListener('click', onClosePicture);

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      bigPicture.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
    }
  });
};

export { createBigPhoto };
