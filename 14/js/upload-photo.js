import { isEscapeKey } from './utils.js';
import { getScalePhoto, removeBtnListener, inputScale, MAX_PERCENT } from './scale-photo.js';
import { getInputRange, onClearSlider } from './slider.js';
import { showsStatusSending } from './form-messages.js';
import { imageSubstitution } from './image-substitution.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const uploadForm = document.querySelector('#upload-select-image');
const bodyElement = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditForm = uploadForm.querySelector('.img-upload__overlay');
const btnSubmit = uploadForm.querySelector('#upload-submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const currentHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const commentsInput = uploadForm.querySelector('.text__description');

const imgUploadPrewiew = uploadForm.querySelector('img');

let errorMessage = '';

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
  uploadForm.removeEventListener('reset', onPhotoEditResetBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  removeBtnListener();
  onClearSlider();
  uploadFileControl.value = '';
  imgUploadPrewiew.style.transform = '';
}

const getUploadModal = () => {
  uploadFileControl.addEventListener('change', (evt) => {
    const currentImage = evt.target.files;
    photoEditForm.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    uploadForm.addEventListener('reset', onPhotoEditResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    imageSubstitution(photoEditForm, uploadFileControl, currentImage, imgUploadPrewiew);
    getScalePhoto();
    getInputRange();
  });
};

const pristineUpload = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onSuccess = () => {
  showsStatusSending('body', '#success', '.success');
};

const onError = () => {
  showsStatusSending('body', '#error', '.error');
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristineUpload) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    const formData = new FormData(evt.target);
    fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          btnSubmit.setAttribute('disabled', true);
          inputScale.value = `${MAX_PERCENT}%`;
          hashtagInput.value = '';
          commentsInput.value = '';
          onClearSlider();
          onSuccess();
          onPhotoEditResetBtnClick();
        } else {
          onError();
        }
      })
      .catch(() => {
        onError();
      })
      .finally(() => {
        btnSubmit.removeAttribute('disabled');
      });
  }
};

const error = () => errorMessage;

const getHashtagsValue = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    btnSubmit.removeAttribute('disabled');
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
      btnSubmit.setAttribute('disabled', true);
    } else {
      btnSubmit.removeAttribute('disabled');
    }

    return !isInvalid;
  });
};

const checkCommentsLength = (value) => {
  const commentsLength = value.length <= 140;
  btnSubmit.removeAttribute('disabled');
  return commentsLength;
};

const errorComments = () => {
  const errorCommentsInput = 'Комментарий должен содержать не более 140 символов';
  btnSubmit.setAttribute('disabled', true);
  return errorCommentsInput;
};

pristineUpload.addValidator(hashtagInput, getHashtagsValue, error);

pristineUpload.addValidator(commentsInput, checkCommentsLength, errorComments);

uploadForm.addEventListener('submit', onFormSubmit);

export { getUploadModal };
