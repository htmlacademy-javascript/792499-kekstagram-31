const createThumbnails = (data) => {
  const fragment = document.createDocumentFragment();
  const photoContainer = document.querySelector('.pictures');
  const templateContent = document.querySelector('#picture').content.querySelector('.picture');

  data.forEach(({ id, url, description, likes, comments }) => {
    const element = templateContent.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.dataset.pictureId = id;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(element);
  });

  photoContainer.append(fragment);
};

export { createThumbnails };
