import { createThumbnails } from './create-thumbnails.js';
import { createBigPhoto } from './create-big-photo.js';
const getDataServer = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      createThumbnails(data);
      createBigPhoto(data);
    });
};

export { getDataServer };
