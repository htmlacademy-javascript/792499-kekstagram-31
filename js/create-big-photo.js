import { isEscapeKey } from './utils.js';
import { createDataPhoto } from './create-data-photo.js';
import { createSocialComments } from './create-social-comments.js';

const createBigPhoto = () => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const pictureCancel = document.querySelector('#picture-cancel');
  const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');

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
    commentsLoaderBtn.removeEventListener('click', onClosePicture);
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
    createSocialComments(currentElement, bigPicture);
  }

  pictures.addEventListener('click', onOpenPicture);

};

export { createBigPhoto };
