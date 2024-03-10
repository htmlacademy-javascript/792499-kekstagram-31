import { getDataArrayObjects } from './data.js';
import { getRandomNumber, createRandomNumber } from './utils.js';

const createObjectsPhoto = () => {

  const { START_NUMBER, OBJECTS_PHOTO, MAX_NUMBER_COMMENTS, URL_PHOTOS, DESCRIPTION_PHOTOS, LIKES_PHOTOS, ARRAY_OF_COMMENTS, ARRAY_OF_NAME, ArrayOfNumberAvatar } = getDataArrayObjects();

  const uniqueNumberId = createRandomNumber(START_NUMBER, OBJECTS_PHOTO);
  const photoNumberUrl = createRandomNumber(START_NUMBER, URL_PHOTOS.length);
  const photoDescription = createRandomNumber(START_NUMBER, OBJECTS_PHOTO);
  const photoNumberLikes = createRandomNumber(START_NUMBER, (LIKES_PHOTOS.length - 1));

  const createCommentsName = () => {
    const uniqueCommentsName = createRandomNumber(START_NUMBER, MAX_NUMBER_COMMENTS);
    return ARRAY_OF_NAME[uniqueCommentsName()];
  };

  const createObjectComments = () => {
    const uniqueIdComments = createRandomNumber(START_NUMBER, (MAX_NUMBER_COMMENTS * OBJECTS_PHOTO));

    return {
      id: uniqueIdComments(),
      avatar: `img/avatar-${getRandomNumber(START_NUMBER, ArrayOfNumberAvatar.length)}.svg`,
      message: ARRAY_OF_COMMENTS[getRandomNumber(START_NUMBER, ARRAY_OF_COMMENTS.length - 1)],
      name: createCommentsName(),
    };
  };

  const createComments = () => {
    const uniqueNumberComments = createRandomNumber(START_NUMBER, MAX_NUMBER_COMMENTS);
    return Array.from({length: uniqueNumberComments()}, createObjectComments);
  };

  const createUniqueObject = () => ({
    id: uniqueNumberId(),
    url: `photos/${photoNumberUrl()}.jpg`,
    description: DESCRIPTION_PHOTOS[photoDescription()],
    likes: LIKES_PHOTOS[photoNumberLikes()],
    comments: createComments(),
  });

  const photoDescriptions = () => Array.from({length: OBJECTS_PHOTO}, createUniqueObject);
  return photoDescriptions();

};

export { createObjectsPhoto };
