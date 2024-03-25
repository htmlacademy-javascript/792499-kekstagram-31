const createCommentsTemplate = (bigPicture, currentComments) => {
  const commentsBlock = bigPicture.querySelector('.social__comments');
  const commentsItem = document.createElement('li');
  const socialText = document.createElement('p');
  const socialAvatar = document.createElement('img');

  socialAvatar.classList.add('social__picture');
  socialAvatar.setAttribute('src', currentComments.avatar);
  socialAvatar.setAttribute('alt', currentComments.name);
  commentsItem.classList.add('social__comment');
  socialText.classList.add('social__text');

  commentsBlock.append(commentsItem);
  commentsItem.append(socialAvatar);
  commentsItem.append(socialText);
  socialText.append(currentComments.message);
};

export { createCommentsTemplate };
