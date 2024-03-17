import { imgArray } from './create-thumbnails.js';

const createDataPhoto = (currentId, bigPicture) => {
  const COMMENTS_SHOWN = 5;
  const bigPictureImg = bigPicture.querySelector('img');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureCaption = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
  const bigPictureCommentsTotal = bigPicture.querySelector('.social__comment-total-count');

  bigPictureCommentsShown.textContent = COMMENTS_SHOWN;

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
