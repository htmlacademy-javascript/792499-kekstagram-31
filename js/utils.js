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

export { getRandomNumber, createRandomNumber };
