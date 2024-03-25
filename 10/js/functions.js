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

const getDataToArray = (toArray) => {
  const result = toArray.split(':');
  return result;
};

const getTimeMeetings = (startWorkTime = '8:00', endWorkTime = '17:30', startMeeting = '08:00', meetingTime = '10') => {

  const HOUR_IN_MINUTE = 60;

  const startWorkTimeNumber = getNumbers(startWorkTime);
  const endWorkTimeNumber = getNumbers(endWorkTime);
  const startMeetingNumber = getNumbers(startMeeting);
  const meetingDurationToArray = getDataToArray(startMeeting);

  const getMeetingDuration = () => {

    const meetingTimeHour = Math.floor(meetingTime / HOUR_IN_MINUTE);
    const meetingTimeMinutes = meetingTime % HOUR_IN_MINUTE;

    const interimResultHour = Number(meetingDurationToArray[0]) + meetingTimeHour;
    const interimResultMinute = Number(meetingDurationToArray[1]) + ((Math.floor(meetingTimeMinutes / HOUR_IN_MINUTE)) + (Math.floor(meetingTimeMinutes % HOUR_IN_MINUTE)));

    const minuteMeetingInHour = Math.floor(interimResultMinute / HOUR_IN_MINUTE);

    const minuteMeeting = Math.floor(interimResultMinute % HOUR_IN_MINUTE);
    const hourMeeting = interimResultHour + minuteMeetingInHour;

    const stringMeetingDuration = String(hourMeeting) + String(minuteMeeting);

    return stringMeetingDuration;
  };

  const finalMeetingDuration = Number(getMeetingDuration());
  return startMeetingNumber >= startWorkTimeNumber && startMeetingNumber < endWorkTimeNumber && finalMeetingDuration <= endWorkTimeNumber;
};

getTimeMeetings();
