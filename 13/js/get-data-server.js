import { createThumbnails } from './create-thumbnails.js';
import { createBigPhoto } from './create-big-photo.js';
import { showsStatusSending } from './form-messages.js';
import { configFilter } from './filter.js';

const REMOTE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const ALERT_SHOW_TIME = 5000;

const getDataServer = () => {
  fetch(REMOTE_URL)
    .then((response) => response.json())
    .then((data) => {
      createThumbnails(data);
      createBigPhoto(data);
      configFilter(data);
    })
    .catch(() => {
      showsStatusSending('body', '#data-error', '.data-error');
      setTimeout(() => {
        const errorMessage = document.querySelector('.data-error');
        errorMessage.classList.add('hidden');
      }, ALERT_SHOW_TIME);
    });
};

export { getDataServer };
