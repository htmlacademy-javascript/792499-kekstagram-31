const START_NUMBER = 0;
const OBJECTS_PHOTO = 25;
const MAX_NUMBER_COMMENTS = 30;
const URL_PHOTOS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25'
];
const DESCRIPTION_PHOTOS = [
  'Хороший вид на горы с раннего утра.',
  'Падающий снег покрывал землю белым покровом.',
  'Счастливые люди наслаждаются жизнью, наполненной радостью и благодарностью.',
  'Забавные животные могут принести радость и улыбку.',
  'Когда кот и пес стали друзьями, их жизнь стала намного веселее.',
  'В зоопарке можно увидеть множество разнообразных животных.',
  'Обычный день начинается с утреннего пробуждения.',
  'Веселые приключения часто начинаются с неожиданных встреч.',
  'Путешествия — это настоящее искусство.',
  'Домашние животные – незаменимая часть нашей жизни.',
  'Лето - это прекрасное время года',
  'Велосипедная прогулка',
  'Барбекю с друзьями и семьей.',
  'Летний день на пляже.',
  'Активный день на открытом воздухе.',
  'Жизнь – это постоянное движение.',
  'Пейзажи природы удивительны и неповторимы.',
  'Леса - основное богатство планеты.',
  'Активный отдых на природе',
  'Горнолыжный спорт',
  'Тур по европейским странам',
  'Спортивное мероприятие',
  'Просмотр фильма',
  'Новогодняя ёлка',
  'Осенний листопад',
  'Весенний день',
];
const LIKES_PHOTOS = [
  '15',
  '200',
  '155',
  '44',
  '46',
  '89',
  '99',
  '147',
  '169',
  '21',
  '39',
  '98',
  '19',
  '55',
  '51',
  '61',
  '78',
  '23',
  '16',
  '101',
  '161',
  '111',
  '145',
  '38',
  '175',
  '171',
];
const ARRAY_OF_COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];
const ARRAY_OF_NAME = [
  'пупсиквека',
  'тема-бульдозер',
  'ДалДалУшел',
  'Виктор Евгеньевич',
  'Бодя',
  'Чернушка',
  'Keks',
  'Zinedine Zidane',
  'Виктория',
  'БАЗЯЗЯ',
  'ЗлойШкольник',
  'Natalie',
  'IamMVP',
  'Леонид',
  'МалинкиМыш',
  'Андрей',
  'Анжела',
  'Леха',
  'Александр',
  'Ксения',
  'Игорь',
  'Светлана',
  'Инна',
  'Владимир',
  'Анна',
  'Алена',
  'Сергей',
  'Аркадий',
  'Сталкер',
  'Ника',
  'Boris',
];
const ArrayOfNumberAvatar = [1, 2, 3, 4, 5, 6];

const getRandom = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createRandomNumber = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandom(min, max);

    if (previousValues.length >= max) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

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
    avatar: `img/avatar-${getRandom(START_NUMBER, ArrayOfNumberAvatar.length)}.svg`,
    message: ARRAY_OF_COMMENTS[getRandom(START_NUMBER, ARRAY_OF_COMMENTS.length - 1)],
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
photoDescriptions();
