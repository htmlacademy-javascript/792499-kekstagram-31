import { imgArray } from './create-thumbnails.js';
import { createCommentsTemplate } from './comments-template.js';

const createSocialComments = (currentThumbnail, bigPicture) => {
  const socialCommentsList = document.querySelector('.social__comments');
  const commentsQuantity = Number(currentThumbnail.querySelector('.picture__comments').textContent);
  const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');
  const currentCommentsCount = bigPicture.querySelector('.social__comment-shown-count');

  socialCommentsList.innerHTML = '';
  commentsLoaderBtn.classList.remove('hidden');

  const currentCommentary = [];
  let currentQuantityMessage = 0;
  const COMMENTS_COUNT = 5;

  imgArray.forEach((array) => {
    if (commentsQuantity === array.comments.length) {
      const arrayOfComments = array.comments;
      arrayOfComments.forEach((element) => {
        currentCommentary.push(element);
      });
    }
  });

  const loadedCommentary = () => {
    const loadedArrayCommentary = currentCommentary.slice(currentQuantityMessage, currentQuantityMessage + COMMENTS_COUNT);

    loadedArrayCommentary.forEach((currentComments) => {
      createCommentsTemplate(bigPicture, currentComments);
      currentCommentsCount.textContent = socialCommentsList.children.length;

      if (currentCommentary.length === socialCommentsList.children.length) {
        commentsLoaderBtn.classList.add('hidden');
      }
    });
  };

  const addingByQuantity = (evt) => {
    evt.preventDefault();
    currentQuantityMessage += COMMENTS_COUNT;
    loadedCommentary();
  };

  const checkMinLength = () => {
    if (currentCommentary.length === 0) {
      currentCommentsCount.textContent = currentQuantityMessage;
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener('click', addingByQuantity);
    }
  };

  const addedCommentary = () => {
    loadedCommentary();
    commentsLoaderBtn.addEventListener('click', addingByQuantity);
    checkMinLength();
  };

  return addedCommentary();
};

export { createSocialComments };
