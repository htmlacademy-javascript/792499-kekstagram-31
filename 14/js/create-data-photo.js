const createDataPhoto = (data, currentId, bigPicture) => {
  const COMMENTS_SHOWN = 5;
  const bigPictureImg = bigPicture.querySelector('img');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const bigPictureCaption = bigPicture.querySelector('.social__caption');
  const bigPictureCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
  const bigPictureCommentsTotal = bigPicture.querySelector('.social__comment-total-count');

  bigPictureCommentsShown.textContent = COMMENTS_SHOWN;

  data.forEach(({ id, url, description, likes, comments }) => {
    if (currentId === id) {
      bigPictureImg.src = url;
      bigPictureLikesCount.textContent = likes;
      bigPictureCaption.textContent = description;
      bigPictureLikesCount.textContent = likes;
      bigPictureCommentsTotal.textContent = comments.length;
    }
  });
};

const getCommentsById = (data, currentId, currentCommentary) => {
  const arrayOfComments = data[currentId].comments;
  arrayOfComments.forEach((element) => {
    currentCommentary.push(element);
  });
};

export { createDataPhoto, getCommentsById };
