import { imgArray } from './create-thumbnails.js';

const socialComments = (currentThumbnail, bigPicture) => {
  const socialCommentsList = document.querySelector('.social__comments');
  const commentsQuantity = Number(currentThumbnail.querySelector('.picture__comments').textContent);
  const commentsBlock = bigPicture.querySelector('.social__comments');
  socialCommentsList.innerHTML = '';

  imgArray.forEach((array) => {
    if (commentsQuantity === array.comments.length) {
      array.comments.forEach((element) => {
        const commentsItem = document.createElement('li');
        const socialText = document.createElement('p');
        const socialAvatar = document.createElement('img');
        socialAvatar.classList.add('social__picture');
        socialAvatar.setAttribute('src', element.avatar);
        commentsItem.classList.add('social__comment');
        socialText.classList.add('social__text');
        commentsBlock.append(commentsItem);
        commentsItem.append(socialAvatar);
        commentsItem.append(socialText);
        socialText.append(element.message);
      });
    }
  });
};

export { socialComments };
