import { isEscapeKey } from './utils.js';
import { createDataPhoto } from './create-data-photo.js';

const createBigPhoto = () => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const pictureCancel = document.querySelector('#picture-cancel');

  const onOpenPicture = (evt) => {

    const targetElement = evt.target;
    const currentElement = targetElement.closest('.picture');

    if (currentElement) {
      evt.preventDefault();
    }

    if (currentElement === null) {
      return;
    }

    const currentId = currentElement.dataset.pictureId;

    if (targetElement.matches('.picture__img')) {
      bigPicture.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
    }

    createDataPhoto(currentId, bigPicture);
  };

  const onClosePicture = (evt) => {
    evt.preventDefault();

    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    pictureCancel.removeEventListener('click', onClosePicture);
  };

  pictures.addEventListener('click', onOpenPicture);

  const onEscapeKeyDown = () => {
    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();

        bigPicture.classList.add('hidden');
        bodyElement.classList.remove('modal-open');
        pictureCancel.removeEventListener('click', onClosePicture);
      }
    });
  };

  pictureCancel.addEventListener('click', onClosePicture);
  onEscapeKeyDown();

};

export { createBigPhoto };
