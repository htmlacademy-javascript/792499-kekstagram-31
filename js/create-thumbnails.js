import { getDataArrayObjects } from './data.js';
import { createRandomNumber } from './utils.js';

const createThumbnails = () => {
  const { START_NUMBER, MAX_NUMBER_COMMENTS, URL_PHOTOS, DESCRIPTION_PHOTOS, LIKES_PHOTOS } = getDataArrayObjects();
  const fragment = document.createDocumentFragment();
  const photoContainer = document.querySelector('.pictures');
  const templateContent = document.querySelector('#picture').content.querySelector('.picture');

  URL_PHOTOS.forEach((number) => {
    const element = templateContent.cloneNode(true);

    element.querySelector('.picture__img').src = `photos/${number}.jpg`;
    element.querySelector('.picture__img').alt = DESCRIPTION_PHOTOS[number];
    element.querySelector('.picture__likes').textContent = LIKES_PHOTOS[number];
    element.querySelector('.picture__comments').textContent = createRandomNumber(START_NUMBER, MAX_NUMBER_COMMENTS)();

    fragment.append(element);
  });

  return photoContainer.append(fragment);
};

export { createThumbnails };
