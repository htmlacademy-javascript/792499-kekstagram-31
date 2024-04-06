import { debounce } from './utils.js';
import { createThumbnails } from './create-thumbnails.js';

const FILTER_BTN = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const ACTIVE_BTN_CLASS = 'img-filters__button--active';
const MAX_RANDOM_IMAGES = 10;
const filterElement = document.querySelector('.img-filters');
let currentFilter = FILTER_BTN.default;
let pictures = [];

const onFilterChange = (evt) => {
  const targetBtn = evt.target;
  const activeBtn = document.querySelector(`.${ACTIVE_BTN_CLASS}`);

  if (!targetBtn.matches('button')) {
    return;
  }

  if (activeBtn === targetBtn) {
    return;
  }

  activeBtn.classList.toggle(ACTIVE_BTN_CLASS);
  targetBtn.classList.toggle(ACTIVE_BTN_CLASS);

  currentFilter = targetBtn.getAttribute('id');
  applyingFilter();
};

function applyingFilter () {
  let filteredPictures = [];

  const photoContainer = document.querySelector('.pictures');
  const pictureElements = photoContainer.querySelectorAll('.picture');

  pictureElements.forEach((element) => {
    photoContainer.removeChild(element);
  });

  switch (currentFilter) {
    case FILTER_BTN.default:
      filteredPictures = pictures;
      createThumbnails(filteredPictures);
      break;
    case FILTER_BTN.random:
      filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_IMAGES);
      createThumbnails(filteredPictures);
      break;
    case FILTER_BTN.discussed:
      filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
      createThumbnails(filteredPictures);
      break;
  }

  debounce(filteredPictures);
}

const configFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = data;
};

export { configFilter };
