function reverseStr(str) {
  var string = str.split('').reverse().join('');
  // if (str.length < 8) {
  //   console.log("String before whatever:", str);
  //   console.log("String after whatever:", string);
  // }
  return string;
}

function isPalinfrome(str) {
  return reverseStr(str) === str;
}

function dateToString(date) {
  var dateInStr = { day: '', month: '', year: '' };
  if (date.day < 10) {
    dateInStr.day = '0' + date.day;
  }
  else {
    dateInStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateInStr.month = '0' + date.month;
  }
  else {
    dateInStr.month = date.month.toString();
  }
  dateInStr.year = date.year.toString();
  return (dateInStr);
}

function dateFormats(date) {
  var dateStr = dateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindrome(date) {
  var listOfDates = dateFormats(date);
  var flag = false;
  for (let i = 0; i < listOfDates.length; i++) {
    if (isPalinfrome(listOfDates[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0)
    return true;
  if (year % 100 === 0)
    return false;
  if (year % 4 === 0)
    return true;
  return false;

}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }

  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var count = 0;
  var nextDate = getNextDate(date);
  while (1) {
    count++;
    var isAPalindrome = checkPalindrome(nextDate);
    if (isAPalindrome)
      break;
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}
var date = {
  day: 31,
  month: 12,
  year: 2021
};


var dateInput = document.querySelector("#bday-input");
var bdayOutput = document.querySelector("#output-btn");
var result = document.querySelector("#output-res");

function clickHandler(e) {
  var bdayStr = dateInput.value;
  if (bdayStr !== '') {
    var listOfDates = bdayStr.split('-');
    var date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0])
    };
    var isPalindromeDate = checkPalindrome(date);
    if (isPalindromeDate) {
      result.innerText = "Yeppie your birthday is a PALINDROME!";
    }
    else {
      var [count, nextDate] = getNextPalindromeDate(date);

      console.log("Next Date is :", nextDate, "Count:", count);
      result.innerText = `The next PALINDROME date is   ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${count} days.`;
    }
  }
}

bdayOutput.addEventListener('click', clickHandler);
