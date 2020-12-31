// Mock data array of services objects
let servicesObjects = {
  schedule_item1: { id: 4, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item2: { id: 5, byday: "MO, TU, WE, TH, FR", opens_at: "13:00", closes_at: "17:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item3: { id: 16, byday: "2TU, 4TU", opens_at: "09:30", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item4: { id: 21, byday: "MO, TU, WE, TH, FR, SA, SU", opens_at: "00:00", closes_at: "23:59", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item5: { id: 24, byday: "", opens_at: "09:00", closes_at: "14:00", bymonthday: "11", valid_from: "", valid_to: "" },
  schedule_item6: { id: 157, byday: "-1SA", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item6: { id: 1003, byday: "-1TU", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  schedule_item7: { id: 158, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "16:30", bymonthday: "", valid_from: "10/1/2020", valid_to: "5/31/2021" },
  schedule_item8: { id: 1000, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "17:00", bymonthday: "", valid_from: "9/15/2020", valid_to: "5/31/2021" },
  schedule_item9: { id: 1001, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "17:00", bymonthday: "", valid_from: "9/1/2020", valid_to: "5/15/2021" },
  schedule_item10: { id: 1002, byday: "", opens_at: "", closes_at: "", bymonthday: "", valid_from: "", valid_to: "" },
}

// Mock data date/time
let dateTimeString = 'September 29, 2020 10:30:00';  // format example = 'December 17, 1995 03:24:00'

// Alternate, but the break when finding a match is tricky. (https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break)
const WEEKDAYS_OBJ = {
  1: "SU",
  2: "MO",
  3: "TU",
  4: "WE",
  5: "TH",
  6: "FR",
  7: "SA",
}

function isValidFromTo(schedule_item, year, month, monthDay) {
  if (schedule_item["valid_from"] !== "" || schedule_item["valid_to" !== ""]) {
    let validFrom = schedule_item["valid_from"].split("/");
    let validTo = schedule_item["valid_to"].split("/");
    let validMonthFrom = Number(validFrom[0]);
    let validDayFrom = Number(validFrom[1]);
    let validYearFrom = Number(validFrom[2]);
    let validMonthTo = Number(validTo[0]);
    let validDayTo = Number(validTo[1]);
    let validYearTo = Number(validTo[2]);
    if (year < validYearFrom || year > validYearTo) return false;
    if (validMonthFrom < validMonthTo) {  // if 5 < 10
      if (month < validMonthFrom || month > validMonthTo) return false; // if 8 < 5 || 8 > 10, return false
    } else if (validMonthFrom > validMonthTo) { // 10 > 5
      if (month < validMonthFrom && month > validMonthTo) return false; // if 8 < 10 && 8 > 5, return false
    }
    if ((month === validMonthFrom) && (monthDay < validDayFrom)) return false;
    if ((month === validMonthTo) && (monthDay > validDayTo)) return false;
    else return true;
  } else return true;
}

function isValidDay(schedule_item, monthDay, weekday, year, month) {
  if ((schedule_item["byday"] !== "") && (schedule_item["byday"].search(/[0-9]/) === -1)) { // if 'byday' field contains simply weekdays
    if (!schedule_item["byday"].includes(WEEKDAYS_OBJ[weekday])) return false;
  } else if (schedule_item["byday"].search(/[0-9]/) !== -1) { // if 'byday' field days aren't every week (e.g. field contains numbers )
    // if 'byday field' doesn't contain a negative number
    if (!schedule_item["byday"].includes("-")) {
      let bydayArray = schedule_item["byday"].split(", ");
      let validatedWeekAndDay = bydayArray.filter(element => {
        return (Number(element.substring(0, 1)) === Math.ceil(monthDay / 7) && (element.substring(1) === WEEKDAYS_OBJ[weekday]));
      })
      if (validatedWeekAndDay.length < 1) return false;
    } else { // if 'byday' field includes a negative number
      let bydayNegativeNum = Number.parseInt(schedule_item["byday"], 10); // e.g. -1
      let negativeWeekday = schedule_item["byday"].replace(/[0-9-]/g, ''); // e.g. "SA"
      let negativeWeekdayNum = Object.keys(WEEKDAYS_OBJ).find(key => WEEKDAYS_OBJ[key] === negativeWeekday)
      let rawDateLastDayOfMonth = new Date(year, month, 0); // e.g. 2020-12-31T08:00:00.000Z ---- i.e. Dec 31
      let lastDayWeekday = rawDateLastDayOfMonth.getDay() + 1; // number (1 - 7) that can be cross-referenced with WEEKDAYS_OBJ
      let lastDayMonthDay = rawDateLastDayOfMonth.getDate(); // number representing day date of that month  (.e.g 29)
      console.log(rawDateLastDayOfMonth);
      console.log(lastDayWeekday);
      console.log(lastDayMonthDay);

      if (lastDayWeekday > weekday) {  // e.g. 4 > 3
        let weekdayDifference = lastDayWeekday - negativeWeekdayNum; // 4 - 3 = 1
        let result = lastDayMonthDay - weekdayDifference; // 30 - 1
        console.log(`Is ${result} === ${monthDay}??`) // 29 
        return (result === monthDay);
      } else if (lastDayWeekday < weekday) { //  (e.g. 4 < 7)  ( wednesday < Saturday )
        let weekdayDifference = (lastDayWeekday + 7) - negativeWeekdayNum;
        // let result = lastDayMonthDay - weekdayDifference; // 30 - 1
        // console.log(`Is ${result} === ${monthDay}??`) // 29 
        // return (result === monthDay);
      }
    }
  } else if (Number(schedule_item["bymonthday"]) !== monthDay) return false; // if 'bymonthday' value doesn't match current monthDay
  return true;
}

const MINS_PER_HR = 60;

function getExactMinute(itemTime) {
  let hour = Number(itemTime.substring(0, 2));
  let minutes = Number(itemTime.substring(3));
  return (hour * MINS_PER_HR) + minutes;
}

function isOpen(schedule_item, dateTimeString) {
  let dateTime = new Date(dateTimeString)
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1; //   (Date.getMonth() starts at 0 so add 1)
  let weekday = dateTime.getDay() + 1; //   (Date.getDay() starts at 0 so add 1)
  let monthDay = dateTime.getDate(); //   (Date.getDate() starts at 1)
  let hour = dateTime.getHours(); //   (Date.getHours() starts at 0)
  let minute = dateTime.getMinutes(); //   (Date.getMinutes() starts at 0)
  // let lastDayOfMonth = new Date(year, month, 0);

  // if there is valid_from and valid_to fields, does the date fall between them?
  if (isValidFromTo(schedule_item, year, month, monthDay) === false) return false;
  // does the date fall on 
  if (isValidDay(schedule_item, monthDay, weekday, year, month) === false) return false;

  // if 'opens_at' field is empty (and by extension, 'closes_at' is empty too), return false
  if (schedule_item["opens_at"] === "") return false; // this also returns false for items where byday field is empty
  // (helper function "getExactMinute" returns equivalent exact minute in 1440 minute day)
  let openingMinute = getExactMinute(schedule_item["opens_at"]);
  let closingMinute = getExactMinute(schedule_item["closes_at"]);
  let minuteOfDay = (hour * MINS_PER_HR) + minute;
  // if current exact minute of day is between the opening and closing exact minutes, return true. Otherwise return false.
  return (minuteOfDay >= openingMinute && minuteOfDay <= closingMinute);
}

// function to run through each test case in servicesObjects
function test(servicesObjects, dateTimeString, WEEKDAYS_OBJ) {
  let currentDate = new Date(dateTimeString);
  Object.entries(servicesObjects).forEach(entry => {
    if (isOpen(entry[1], dateTimeString) === true) {
      console.log(`${entry[0]} returns true ==>>> ${Object.values(entry[1])}`);
    } else console.log(`${entry[0]} returns false ==>>> ${Object.values(entry[1])}`);
  });
  console.log(`current dateTime you inputted: ${WEEKDAYS_OBJ[(currentDate.getDay() + 1)]}, ${dateTimeString}`);
}

// run test
test(servicesObjects, dateTimeString, WEEKDAYS_OBJ);





//input: schedule_item object
//output: boolean corresponding to whether schedule_item falls within the open-close time on current date.

/*
Algorithm =====

Function takes in schedule_item     (date details are available from global scope).
  if the current month falls between "valid_from" and "valid_to", continue. Otherwise return false.
  If "opens_at" is empty, return false, otherwise continue.

  If "byday" contains numbers (i.e days aren't every week)
    If "byday" includes only positive numbers (i.e is counting the week from the start of the month)
        ascertain "byday"s days in current month, and validate whether current day falls on any of those days. If false, return false.
    If "byday" includes a negative number (i.e is counting the week from the end of the month backwards)
        ascertain "byday"s day in current month, and validate whether current day falls on that day. If false, return false.
  Else if "byday" contains only day/s, without numbers (i.e. days are every week)
    If "byday" is not current day, return false
  Else if "bymonthday" is not the current monthDay, return false.

  Get exact "opens_at" minute.
  Get exact "closes_at" minute.
  If current minute of day falls between openingMinute and closingMinute, return true. Otherwise, return false.
*/

