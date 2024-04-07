const setOriginalEffectOptions = (sliderElement, sliderContainer, imgUpload) => {
  sliderElement.setAttribute('disabled', true);
  sliderContainer.classList.add('hidden');
  imgUpload.style.filter = '';
};

const setGrayscaleEffectOptions = (sliderElement, valueElement, imgUpload, sliderContainer) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 100,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value, 10);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderContainer.classList.remove('hidden');
    sliderElement.removeAttribute('disabled');
    valueElement.value = sliderElement.noUiSlider.get();
    imgUpload.style.filter = `grayscale(${valueElement.value})`;
  });
};

const setSepiaEffectOptions = (sliderElement, valueElement, imgUpload, sliderContainer) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 100,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value, 10);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderContainer.classList.remove('hidden');
    valueElement.value = sliderElement.noUiSlider.get();
    imgUpload.style.filter = `sepia(${valueElement.value})`;
  });
};

const setInvertEffectOptions = (sliderElement, valueElement, imgUpload, sliderContainer) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value, 10);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderContainer.classList.remove('hidden');
    valueElement.value = sliderElement.noUiSlider.get();
    imgUpload.style.filter = `invert(${valueElement.value}%)`;
  });
};

const setBlurEffectOptions = (sliderElement, valueElement, imgUpload, sliderContainer) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 100,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value, 10);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imgUpload.style.filter = `blur(${valueElement.value}px)`;
  });
};

const setBrightnessEffectOptions = (sliderElement, valueElement, imgUpload, sliderContainer) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 100,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value, 10);
      },
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderContainer.classList.remove('hidden');
    valueElement.value = sliderElement.noUiSlider.get();
    imgUpload.style.filter = `brightness(${valueElement.value})`;
  });
};

export { setOriginalEffectOptions, setInvertEffectOptions, setGrayscaleEffectOptions, setSepiaEffectOptions, setBlurEffectOptions, setBrightnessEffectOptions };
