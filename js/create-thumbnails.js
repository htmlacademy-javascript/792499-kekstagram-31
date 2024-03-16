import { createObjectsPhoto } from './create-objects-photo.js';
const imgArray = [];
const createThumbnails = () => {
  const fragment = document.createDocumentFragment();
  const photoContainer = document.querySelector('.pictures');
  const templateContent = document.querySelector('#picture').content.querySelector('.picture');

  createObjectsPhoto().forEach(({ id, url, description, likes, comments }) => {
    const element = templateContent.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.dataset.pictureId = id;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;

    imgArray.push(
      {
        id: element.dataset.pictureId,
        src: element.querySelector('.picture__img').src,
        description: element.querySelector('.picture__img').alt,
        likes: likes,
        comments: comments,
      });

    fragment.append(element);
  });

  photoContainer.append(fragment);
};

export { createThumbnails, imgArray };
