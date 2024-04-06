import { showsStatusSending } from './form-messages.js';

const START_NUMBER = 0;
const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
const ALLOWED_FILES = 'Загрузите .jpg, .jpeg, .png, .gif, .webp';
const effectsList = document.querySelector('.effects__list');
const effectsListChildren = effectsList.children;

const showsAllowedFiles = () => {
  const errorMessage = document.querySelector('.error');
  const errorTitle = errorMessage.querySelector('.error__title');
  errorTitle.textContent = ALLOWED_FILES;
};

const imageSubstitution = (photoEditForm, uploadFileControl, currentImage, imgUploadPrewiew) => {

  const currentFile = uploadFileControl.files[0];
  const currentFileType = currentFile.type;
  const allowedFileTypes = FILE_TYPES.includes(currentFileType);

  if (allowedFileTypes) {
    const srcImage = URL.createObjectURL(currentImage[0]);
    imgUploadPrewiew.setAttribute('src', srcImage);

    for (let i = START_NUMBER; i < effectsListChildren.length; i++) {
      const currentThumbnail = effectsListChildren[i].querySelector('.effects__preview');
      currentThumbnail.style.backgroundImage = `url('${srcImage}')`;
    }
  } else {
    photoEditForm.classList.add('hidden');
    showsStatusSending('body', '#error', '.error');
    showsAllowedFiles();
  }
};

export { imageSubstitution };
