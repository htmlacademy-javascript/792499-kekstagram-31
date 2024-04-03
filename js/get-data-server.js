import { createThumbnails } from './create-thumbnails.js';
import { createBigPhoto } from './create-big-photo.js';

const REMOTE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const ALERT_SHOW_TIME = 5000;
const tagBody = document.querySelector('body');
const templateError = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = templateError.cloneNode(true);

const showAlert = () => {
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, ALERT_SHOW_TIME);
};

const getDataServer = () => {
  fetch(REMOTE_URL)
    .then((response) => response.json())
    .then((data) => {
      createThumbnails(data);
      createBigPhoto(data);
    })
    .catch(() => {
      tagBody.append(errorMessage);
      showAlert(errorMessage);
    });
};

export { getDataServer };
