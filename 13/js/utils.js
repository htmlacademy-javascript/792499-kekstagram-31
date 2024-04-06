const TIMEOUT_DELAY = 500;

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createRandomNumber = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomNumber(min, max);

    if (previousValues.length >= max) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.keyCode === 27;

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export { getRandomNumber, createRandomNumber, isEscapeKey, debounce, throttle };
