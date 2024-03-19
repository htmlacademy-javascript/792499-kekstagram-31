const createCommentsTemplate = (bigPicture, currentMessage) => {
  const commentsBlock = bigPicture.querySelector('.social__comments');
  const commentsItem = document.createElement('li');
  const socialText = document.createElement('p');
  const socialAvatar = document.createElement('img');
  socialAvatar.classList.add('social__picture');
  socialAvatar.setAttribute('src', currentMessage.avatar);
  commentsItem.classList.add('social__comment');
  socialText.classList.add('social__text');
  commentsBlock.append(commentsItem);
  commentsItem.append(socialAvatar);
  commentsItem.append(socialText);
  socialText.append(currentMessage.message);
};

export { createCommentsTemplate };
