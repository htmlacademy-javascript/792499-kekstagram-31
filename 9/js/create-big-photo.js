import { isEscapeKey } from './utils.js';
import { createDataPhoto } from './create-data-photo.js';
import { imgArray } from './create-thumbnails.js';
import { createCommentsTemplate } from './comments-template.js';

const createBigPhoto = () => {
  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bodyElement = document.querySelector('body');
  const pictureCancel = document.querySelector('#picture-cancel');
  const socialCommentsList = document.querySelector('.social__comments');
  const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');
  const totalComments = bigPicture.querySelector('.social__comment-total-count');
  const currentCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
  const currentCommentary = [];
  const COMMENTS_COUNT = 5;
  let currentQuantityMessage = 0;

  socialCommentsList.innerHTML = '';

  const currentCommentaries = (currentElement) => {
    const commentsQuantity = Number(currentElement.querySelector('.picture__comments').textContent);
    imgArray.forEach((array) => {
      if (commentsQuantity === array.comments.length) {
        const arrayOfComments = array.comments;
        arrayOfComments.forEach((element) => {
          currentCommentary.push(element);
        });
      }
    });
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onClosePicture();
    }
  };

  const loadedCommentary = () => {
    const loadedArrayCommentary = currentCommentary.slice(currentQuantityMessage, currentQuantityMessage + COMMENTS_COUNT);
    loadedArrayCommentary.forEach((currentComments) => {
      createCommentsTemplate(bigPicture, currentComments);
      currentCommentsCount.textContent = socialCommentsList.children.length;
    });
  };

  const addedNextCommentaries = () => {
    currentQuantityMessage += COMMENTS_COUNT;
    loadedCommentary();

    if (socialCommentsList.children.length >= Number(totalComments.textContent)) {
      commentsLoaderBtn.removeEventListener('click', addedNextCommentaries);
      commentsLoaderBtn.classList.add('hidden');
    }
  };

  function onOpenPicture (evt) {
    const targetElement = evt.target;
    const currentElement = targetElement.closest('.picture');
    commentsLoaderBtn.classList.remove('hidden');

    if (currentElement) {
      evt.preventDefault();
    }

    if (currentElement === null) {
      return;
    }

    const currentId = currentElement.dataset.pictureId;

    if (targetElement.matches('.picture__img') || targetElement.closest('.picture__info')) {
      bigPicture.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
    }

    createDataPhoto(currentId, bigPicture);
    pictureCancel.addEventListener('click', onClosePicture);
    document.addEventListener('keydown', onDocumentKeydown);

    currentCommentaries(currentElement);
    loadedCommentary();
    if (Number(totalComments.textContent) <= COMMENTS_COUNT) {
      currentCommentsCount.textContent = Number(totalComments.textContent);
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener('click', addedNextCommentaries);
    }
    commentsLoaderBtn.addEventListener('click', addedNextCommentaries);
  }

  function onClosePicture () {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    pictureCancel.removeEventListener('click', onClosePicture);
    document.removeEventListener('keydown', onDocumentKeydown);
    commentsLoaderBtn.removeEventListener('click', addedNextCommentaries);
    currentCommentary.length = 0;
    socialCommentsList.innerHTML = '';
    currentQuantityMessage = 0;
  }

  pictures.addEventListener('click', onOpenPicture);

};

export { createBigPhoto };
