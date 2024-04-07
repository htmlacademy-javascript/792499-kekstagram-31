import { setOriginalEffectOptions, setInvertEffectOptions, setGrayscaleEffectOptions, setSepiaEffectOptions, setBlurEffectOptions, setBrightnessEffectOptions } from './effects-slider-options.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgContainer = document.querySelector('.img-upload__preview');
const imgUpload = imgContainer.querySelector('img');
const effectsList = document.querySelector('.effects__list');
const itemChecked = document.querySelector('#effect-none');

sliderContainer.classList.add('hidden');

const effectsName = {
  original: 'effect-none',
  grayscale:'effect-chrome',
  sepia:'effect-sepia',
  invert:'effect-marvin',
  blur:'effect-phobos',
  brightness:'effect-heat',
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
  valueElement.value = rest[5].options.start;
  valueElement.value = sliderElement.noUiSlider.get();
});

const getCurrentEffect = (evt) => {
  const currentItem = evt.target.closest('.effects__item');
  if(!currentItem) {
    return;
  }

  const itemRadio = currentItem.querySelector('.effects__radio');
  const currentValue = itemRadio.getAttribute('id');

  switch (currentValue) {
    case effectsName.original:
      setOriginalEffectOptions(sliderElement, sliderContainer, imgUpload);
      break;
    case effectsName.grayscale:
      setGrayscaleEffectOptions(sliderElement, valueElement, imgUpload, sliderContainer);
      break;
    case effectsName.sepia:
      setSepiaEffectOptions(sliderElement, valueElement, imgUpload, sliderContainer);
      valueElement.value = 1;
      break;
    case effectsName.invert:
      setInvertEffectOptions(sliderElement, valueElement, imgUpload, sliderContainer);
      break;
    case effectsName.blur:
      setBlurEffectOptions(sliderElement, imgUpload, imgUpload, sliderContainer);
      break;
    case effectsName.brightness:
      setBrightnessEffectOptions(sliderElement, valueElement, imgUpload, sliderContainer);
      break;
  }
};

const onClearSlider = () => {
  sliderContainer.classList.add('hidden');
  imgUpload.style = ' ';
  effectsList.removeEventListener('click', getCurrentEffect);
  itemChecked.checked = true;
};

const getInputRange = () => {
  effectsList.addEventListener('click', getCurrentEffect);
};

export { getInputRange, onClearSlider };
