import { getDataArrayObjects } from './data.js';
import { createRandomNumber } from './utils.js';

const createThumbnails = () => {
  const { START_NUMBER, MAX_NUMBER_COMMENTS, URL_PHOTOS, DESCRIPTION_PHOTOS, LIKES_PHOTOS } = getDataArrayObjects();
  const fragment = document.createDocumentFragment();
  const photoContainer = document.querySelector('.pictures');
  const templateContent = document.querySelector('#picture').content.querySelector('.picture');

  URL_PHOTOS.forEach((number) => {
    const element = templateContent.cloneNode(true);
    const elementLikes = element.querySelector('.picture__likes');
    const elementComments = element.querySelector('.picture__comments');
    const elementImg = element.querySelector('.picture__img');

    elementImg.src = `photos/${number}.jpg`;
    elementImg.alt = `${DESCRIPTION_PHOTOS[number]}`;
    elementLikes.textContent = `${LIKES_PHOTOS[number]}`;
    elementComments.textContent = createRandomNumber(START_NUMBER, MAX_NUMBER_COMMENTS)();
    fragment.append(element);
  });

  photoContainer.append(fragment);
};

export { createThumbnails };
