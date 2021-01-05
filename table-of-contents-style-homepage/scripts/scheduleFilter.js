// Mock data array of services objects
let servicesObjects = {
  schedule_item1: { id: 4, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item2: { id: 5, byday: "MO, TU, WE, TH, FR", opens_at: "13:00", closes_at: "17:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item3: { id: 16, byday: "2TU, 4TU", opens_at: "09:30", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item4: { id: 21, byday: "MO, TU, WE, TH, FR, SA, SU", opens_at: "00:00", closes_at: "23:59", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item5: { id: 24, byday: "", opens_at: "09:00", closes_at: "14:00", bymonthday: "11", valid_from: "", valid_to: "" },
  schedule_item6: { id: 157, byday: "-1SA", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item6: { id: 1003, byday: "-1TU", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item6: { id: 1004, byday: "-1WE", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item7: { id: 158, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "16:30", bymonthday: "", valid_from: "10/1/2020", valid_to: "5/31/2021" },
  schedule_item8: { id: 1000, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "17:00", bymonthday: "", valid_from: "9/15/2020", valid_to: "5/31/2021" },
  schedule_item9: { id: 1001, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "17:00", bymonthday: "", valid_from: "9/1/2020", valid_to: "5/15/2021" },
  schedule_item10: { id: 1002, byday: "", opens_at: "", closes_at: "", bymonthday: "", valid_from: "", valid_to: "" },
}

// Mock data date/times
let dateTimeString = 'September 29, 2020 10:30:00';  // format example = 'December 17, 1995 03:24:00'

const WEEKDAYS_OBJ = {
  1: "SU",
  2: "MO",
  3: "TU",
  4: "WE",
  5: "TH",
  6: "FR",
  7: "SA",
}

// helper function takes in valid_from or valid_to string value and returns 
function validGetTime(schedule_itemString) {
  let arrayOfNums = schedule_itemString.split("/").map(element => Number(element));
  let dateInstance = new Date(arrayOfNums[2], (arrayOfNums[0] - 1), arrayOfNums[1]);
  console.log(dateInstance);
  return dateInstance.getTime();
}

// helper function verifies whether current dateTime is between valid_from and valid_to dates.
function isValidFromTo(schedule_item, dateTime) {
  let validFromGetTime = validGetTime(schedule_item["valid_from"]);
  let validToGetTime = validGetTime(schedule_item["valid_to"]);
  console.log(dateTime)
  console.log(dateTime.getTime())
  console.log(validFromGetTime)
  console.log(validToGetTime)
  return (dateTime.getTime() >= validFromGetTime && dateTime.getTime() <= validToGetTime)
}

// helper function splits byday string into array, then filters and verifies day elements
function isValidDay(schedule_item, monthDay, weekday, year, month) {
  let bydayArray = schedule_item["byday"].split(', ');
  let bydayMatchCurrentDay = bydayArray.filter(itemDay => itemDay.includes(WEEKDAYS_OBJ[weekday]));
  if (bydayMatchCurrentDay.length > 0) {
    for (day of bydayMatchCurrentDay) {
      if (day.search(/[0-5]/) === -1) return true;
      if (Number.parseInt(day, 10) === Math.ceil(monthDay / 7)) return true;
      if (Math.sign(Number.parseInt(day, 10) === -1)) {
        let rawDateLastDayOfMonth = new Date(year, month, 0); // e.g. 2020-12-31T08:00:00.000Z 
        let lastDayNumOfMonth = rawDateLastDayOfMonth.getDate();
        if ((monthDay >= lastDayNumOfMonth + (Number.parseInt(day, 10) * 7)) &&
          (lastDayNumOfMonth + (Number.parseInt(day, 10) + 1) * 7) > monthDay) return true;
      }
    }
  }

  return false;
}

const MINS_PER_HR = 60;

// helper function returns equivalent exact minute in 1440 minute day
function getExactMinute(itemTime) {
  let hour = Number(itemTime.substring(0, 2));
  let minutes = Number(itemTime.substring(3));
  return (hour * MINS_PER_HR) + minutes;
}
// helper function 
function isValidTime(schedule_item, hour, minute) {
  let openingMinute = getExactMinute(schedule_item["opens_at"]);
  let closingMinute = getExactMinute(schedule_item["closes_at"]);
  let minuteOfDay = (hour * MINS_PER_HR) + minute;
  return (minuteOfDay >= openingMinute && minuteOfDay <= closingMinute);
}

// main function - checks whether item in schedule table is open (returns true), or closed (returns false)
function isOpen(schedule_item, dateTimeString) {
  let dateTime = new Date(dateTimeString)
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1; //   (Date.getMonth() starts at 0 so add 1)
  let weekday = dateTime.getDay() + 1; //   (Date.getDay() starts at 0 so add 1)
  let monthDay = dateTime.getDate(); //   (Date.getDate() starts at 1)
  let hour = dateTime.getHours(); //   (Date.getHours() starts at 0)
  let minute = dateTime.getMinutes(); //   (Date.getMinutes() starts at 0)

  // if there is valid_from and valid_to fields, verify date falls between these?
  if (schedule_item["valid_from"] !== "" || schedule_item["valid_to" !== ""]) {
    if (isValidFromTo(schedule_item, dateTime) === false) return false;
  }
  // if there is a value in the byday column, very it/one of these correlates to the current day?
  if (schedule_item["byday"] !== "") {
    if (isValidDay(schedule_item, monthDay, weekday, year, month) === true) {
      return isValidTime(schedule_item, hour, minute);
    }
  } else if (Number(schedule_item["bymonthday"]) === monthDay) {
      return isValidTime(schedule_item, hour, minute);
  } else return false;
}

// function to run through each test case in servicesObjects
function test(servicesObjects, dateTimeString, WEEKDAYS_OBJ) {
  let currentDate = new Date(dateTimeString);
  console.log(`CURRENT DATETIME INPUTTED: ${WEEKDAYS_OBJ[(currentDate.getDay() + 1)]}, ${dateTimeString}`);
  Object.entries(servicesObjects).forEach(entry => {
    if (isOpen(entry[1], dateTimeString) === true) {
      console.log(`${entry[0]} is OPEN ==>>> ${Object.values(entry[1])}`);
    } else console.log(`${entry[0]} is CLOSED ==>>> ${Object.values(entry[1])}`);
  });
}

// run test
test(servicesObjects, dateTimeString, WEEKDAYS_OBJ);

