import { createObjectsPhoto } from './create-objects-photo.js';

const createDataPhoto = (bigPicture, targetElement) => {

  const bigPictureImg = bigPicture.querySelector('img');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureCaption = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  const bigPictureCommentsShown = bigPictureCommentsCount.querySelector('.social__comment-shown-count');
  const bigPictureCommentsTotal = bigPictureCommentsCount.querySelector('.social__comment-total-count');
  const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  const commentsDivider = 2;

  const targetElementUrl = targetElement.getAttribute('src');
  const targetElementDescription = targetElement.getAttribute('alt');

  const targetElementLikes = targetElement.nextElementSibling.querySelector('.picture__likes');
  const targetElementComments = targetElement.nextElementSibling.querySelector('.picture__comments');

  if (targetElementComments === null || targetElementLikes === null) {
    return;
  }

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');

  bigPictureCommentsTotal.textContent = targetElementComments.textContent;
  bigPictureCommentsShown.textContent = Number(targetElementComments.textContent) - Math.floor(Number(targetElementComments.textContent) / commentsDivider);

  createObjectsPhoto().forEach(({ url, description, likes }) => {
    const bigPictureUrl = targetElementUrl === url ? bigPictureImg.src = url : targetElementUrl === url;
    const bigPictureLikes = targetElementLikes.textContent === likes ? bigPictureLikesCount.textContent = likes : targetElementLikes.textContent === likes;
    const bigPictureDescription = targetElementDescription === description ? bigPictureCaption.textContent = description : targetElementDescription === description;

    return bigPictureUrl, bigPictureLikes, bigPictureDescription;
  });
};

export { createDataPhoto };
