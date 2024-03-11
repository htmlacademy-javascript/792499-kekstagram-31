import { createObjectsPhoto } from './create-objects-photo.js';

const createThumbnails = () => {
  const fragment = document.createDocumentFragment();
  const photoContainer = document.querySelector('.pictures');
  const templateContent = document.querySelector('#picture').content.querySelector('.picture');

  createObjectsPhoto().forEach(({ url, description, likes, comments }) => {
    const element = templateContent.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(element);
  });

  return photoContainer.append(fragment);
};

export { createThumbnails };
