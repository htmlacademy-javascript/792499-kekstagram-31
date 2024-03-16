import { imgArray } from './create-thumbnails.js';

const createDataPhoto = (currentId, bigPicture,/*bigPicture, targetElement*/) => {
  const COMMENTS_SHOWN = 5;
  const bigPictureImg = bigPicture.querySelector('img');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureCaption = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
  const bigPictureCommentsTotal = bigPicture.querySelector('.social__comment-total-count');
  const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');

  bigPictureCommentsShown.textContent = COMMENTS_SHOWN;

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  imgArray.forEach(({ id, src, description, likes, comments }) => {
    if (currentId === id) {
      bigPictureImg.src = src;
      bigPictureLikesCount.textContent = likes;
      bigPictureCaption.textContent = description;
      bigPictureLikesCount.textContent = likes;
      bigPictureCommentsTotal.textContent = comments.length;
    }
  });
};

export { createDataPhoto };
