import { isEscapeKey } from './utils.js';
import { createDataPhoto } from './create-data-photo.js';

const createBigPhoto = () => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const pictureCancel = document.querySelector('#picture-cancel');

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onClosePicture();
    }
  };

  function onClosePicture () {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    pictureCancel.removeEventListener('click', onClosePicture);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function onOpenPicture (evt) {
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
    pictureCancel.addEventListener('click', onClosePicture);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  pictures.addEventListener('click', onOpenPicture);

};

export { createBigPhoto };
