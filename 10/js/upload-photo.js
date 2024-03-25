import { isEscapeKey } from './utils.js';

const uploadForm = document.querySelector('#upload-select-image');
const bodyElement = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditResetBtn = photoEditForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const currentHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const commentsInput = uploadForm.querySelector('.text__description');

const imgUploadPrewiew = uploadForm.querySelector('img');
const effectsList = uploadForm.querySelector('.effects__list');
const effectsListChildren = effectsList.children;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentsInput) {
      evt.stopPropagation();
    } else {
      onPhotoEditResetBtnClick();
    }
  }
};

function onPhotoEditResetBtnClick () {
  bodyElement.classList.remove('modal-open');
  photoEditForm.classList.add('hidden');
  photoEditResetBtn.removeEventListener('click', onPhotoEditResetBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFileControl.value = '';
}

const imageSubstitution = (currentImage) => {
  const srcImage = URL.createObjectURL(currentImage[0]);
  imgUploadPrewiew.setAttribute('src', srcImage);

  for (let i = 0; i < effectsListChildren.length; i++) {
    const currentThumbnail = effectsListChildren[i].querySelector('.effects__preview');
    currentThumbnail.style.backgroundImage = `url('${srcImage}')`;
  }
};

const getUploadModal = () => {
  uploadFileControl.addEventListener('change', (evt) => {
    const currentImage = evt.target.files;
    photoEditForm.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    photoEditResetBtn.addEventListener('click', onPhotoEditResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    imageSubstitution(currentImage);
  });
};

const pristineUpload = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristineUpload) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    uploadForm.submit();
  }
};

pristineUpload.addValidator(commentsInput, (value) => {
  const commentsLength = value.length <= 140;
  return commentsLength;
}, 'Комментарий должен содержать не более 140 символов');

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';

function error () {
  return errorMessage;
}

const getHashtagsValue = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги должны разделяться пробелами',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не должен содержать только решетку',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться только с \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Хештег может содержать максимум ${MAX_SYMBOLS} символов`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputArray.some((item) => !currentHashtag.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });
};

pristineUpload.addValidator(hashtagInput, getHashtagsValue, error);

uploadForm.addEventListener('submit', onFormSubmit);

export { getUploadModal };

