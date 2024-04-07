const SCALE_STEP = 25;
const MAX_PERCENT = 100;
const MAX_SCALE = 1;
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const imgContainer = document.querySelector('.img-upload__preview');
const scalableImg = imgContainer.querySelector('img');
const inputScale = document.querySelector('.scale__control--value');
let currentValue = parseInt(inputScale.value, 10);

const getDisabledIncreaseBtn = () => {
  if (currentValue === MAX_PERCENT) {
    scalableImg.style.transform = `scale(${MAX_SCALE})`;
    biggerBtn.setAttribute('disabled', 'disabled');
  }
};

const getDecreaseScale = () => {
  biggerBtn.removeAttribute('disabled', 'disabled');
  if (currentValue === SCALE_STEP) {
    smallerBtn.setAttribute('disabled', 'disabled');
  } else {
    currentValue -= SCALE_STEP;
    inputScale.value = `${currentValue}%`;
    scalableImg.style.transform = `scale(0.${currentValue})`;
  }
};

const getIncreaseScale = () => {
  smallerBtn.removeAttribute('disabled', 'disabled');
  if (currentValue === MAX_PERCENT) {
    scalableImg.style.transform = `scale(${MAX_SCALE})`;
    biggerBtn.setAttribute('disabled', 'disabled');
  } else {
    currentValue += SCALE_STEP;
    inputScale.value = `${currentValue}%`;
    scalableImg.style.transform = `scale(0.${currentValue})`;
    getDisabledIncreaseBtn();
  }
};

const getScalePhoto = () => {
  currentValue = MAX_PERCENT;
  inputScale.value = `${MAX_PERCENT}%`;
  scalableImg.style.transform = `scale(${MAX_SCALE})`;
  getDisabledIncreaseBtn();
  smallerBtn.addEventListener('click', getDecreaseScale);
  biggerBtn.addEventListener('click', getIncreaseScale);
};

const removeScaleValues = () => {
  smallerBtn.removeAttribute('disabled', 'disabled');
  inputScale.value = `${MAX_PERCENT}%`;
  smallerBtn.removeEventListener('click', getDecreaseScale);
  biggerBtn.removeEventListener('click', getIncreaseScale);
};

export { getScalePhoto, removeScaleValues, inputScale, MAX_PERCENT };
