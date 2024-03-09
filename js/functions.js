const comparesLengthString = (string = 'hello', maxLength = 4) => {
  const result = string.length <= maxLength;
  return result;
};

comparesLengthString('str', 5);


const checksPalindrome = (string = 'JavaScript') => {
  const convertedString = (string.replaceAll(' ','')).toLowerCase();
  let finalString = '';

  for (let i = convertedString.length - 1; i >= 0; i--) {
    finalString += convertedString[i];
  }

  const result = finalString === convertedString;
  return result;
};

checksPalindrome('topo t ');


const getNumbers = (string = '1') => {

  const editString = String(string).replaceAll(' ', '');
  let result = '';

  for (let i = 0; i <= editString.length - 1; i++) {

    if (!Number.isNaN(parseInt(editString[i], 10))) {
      result += editString[i];
    }
  }

  if (result === '') {
    result = NaN;
  } else {
    result = Number(result);
  }

  return result;
};

getNumbers('1 кефир, 0.5 батона');

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах

имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

const getTimeMeetings = (startWorkTime = '09:00', endWorkTime = '18:00', startMeeting = '08:10', meetingsTime = '110') => {

  const HOUR_IN_MINUTE = 60;

  const startWorkTimeNumber = getNumbers(startWorkTime);
  const endWorkTimeNumber = getNumbers(endWorkTime);
  const startMeetingNumber = getNumbers(startMeeting);
  const meetingDurationToArray = getDataToArray(startMeeting);

  const getMeetingDuration = () => {
    const meetingsTimeHours = Math.floor(meetingsTime / HOUR_IN_MINUTE);
    const meetingsTimeMinutes = meetingsTime % HOUR_IN_MINUTE;

    const a = Number(meetingDurationToArray[0]) + meetingsTimeHours;
    const b = Number(meetingDurationToArray[1]) + meetingsTimeMinutes;
    console.log(b);
  };

  getMeetingDuration();
};

const getDataToArray = (toArray) => {
  return toArray.split(':');
};

//getTimeMeetings();

const result = getTimeMeetings();
console.log(result);
