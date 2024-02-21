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
