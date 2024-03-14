const createComments = (bigPicture) => {
  const socialComments = bigPicture.querySelector('.social__comments');
  const newItem = document.createElement('li');
  const newTextBlock = document.createElement('p');

  newItem.classList.add('social__comment');
  newTextBlock.classList.add('social__text');

  socialComments.append(newItem);
  newItem.append(newTextBlock);

  newTextBlock.textContent = 'add new element';
};

export { createComments };
