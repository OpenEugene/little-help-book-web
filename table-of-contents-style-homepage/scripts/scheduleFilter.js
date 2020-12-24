// Mock data array of services objects

let schedule_item1 = { id: 4, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" };
let schedule_item2 = { id: 5, byday: "MO, TU, WE, TH, FR", opens_at: "13:00", closes_at: "17:00", bymonthday: "", valid_from: "", valid_to: "" };
let schedule_item3 = { id: 16, byday: "2TU, 4TU", opens_at: "09:30", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" };
let schedule_item4 = { id: 21, byday: "MO, TU, WE, TH, FR, SA, SU", opens_at: "00:00", closes_at: "23:59", bymonthday: "", valid_from: "", valid_to: "" };
let schedule_item5 = { id: 24, byday: "", opens_at: "09:00", closes_at: "14:00", bymonthday: "11", valid_from: "", valid_to: "" };
let schedule_item6 = { id: 157, byday: "-1SA", opens_at: "10:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" };
let schedule_item7 = { id: 158, byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "16:30", bymonthday: "", valid_from: "9/1/2020", valid_to: "5/31/2020" };

// Mock data date/time
// let weekday = 2 + 1; // TH   (Date.getDay() starts at 0 so add 1)
// let month = 5 + 1; // Dec   (Date.getMonth() starts at 0 so add 1)
// let monthDay = 23; //    (Date.getDate() starts at 1)
// let hour = 11; //    (Date.getHours() starts at 0)
// let minute = 30; //    (Date.getMinutes() starts at 0)
// let minuteOfDay = (hour * 60) + minute; // 930
// let lastDayOfNextMonth = 

// current date/time by js methods
/*
let rawDate = new Date();
let year = rawDate.getFullYear(); 
let month = rawDate.getMonth() + 1; //   (Date.getMonth() starts at 0 so add 1)
let weekday = rawDate.getDay() + 1; //   (Date.getDay() starts at 0 so add 1)
let monthDay = rawDate.getDate(); //   (Date.getDate() starts at 1)
let hour = rawDate.getHours(); //   (Date.getHours() starts at 0)
let minute = rawDate.getMinutes(); //   (Date.getMinutes() starts at 0)
let minuteOfDay = (hour * 60) + minute;
let lastDayOfNextMonth = rawDate.setFullYear(year, month, 0);
*/

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

const MINS_PER_HR = 60;

function getExactMinute(itemTime) {
  let hour = Number(itemTime.substring(0, 2));
  let minutes = Number(itemTime.substring(3));
  return (hour * MINS_PER_HR) + minutes;
}

// function checkMonthlyByday(schedule_item["byday"], monthDay) {
//   let bydayArray = schedule_item["byday"].split(", ");
//   let validatedWeekAndDay = bydayArray.filter(element => {
//     if (element.substring(0, 1) !== Math.ceil(monthDay / 7)) return false;
//     if (element.substring(1) !== WEEKDAYS_OBJ[weekday]) return false
//   })
//   return (validatedWeekAndDay !== []);
// }

function isOpen(schedule_item) {
  debugger
  // if 'valid_from' and 'valid_to' fields are not empty, check if current month falls within these months
  if (schedule_item["valid_from"] !== "") {
    let validMonthFrom = schedule_item["valid_from"].split("/")[0];
    let validMonthTo = schedule_item["valid_to"].split("/")[0];
    // if 'valid_from' month number is less than 'valid_to' month number, return false if current month falls outside them
    if (validMonthFrom < validMonthTo) {
      if (month < validMonthFrom || month > validMonthTo) return false;
    } else { // if 'valid_from' month number is greater than 'valid_to' month number, return false if current month falls outside them
      if (month < validMonthFrom && month > validMonthTo) return false;
    }
  }
  // if 'opens_at' field is empty (and by extension, 'closes_at' is empty too), return false
  if (schedule_item["opens_at"] === "") return false; // this also returns false for items where byday field is empty

  // if 'byday' field contains numbers (i.e. days that aren't every week)
  if (schedule_item["byday"].search(/[0-9]/) !== -1) {
    // if 'byday field' doesn't include a hyphen (e.g. not "-1SA" like in schedule row 157), check days against current date
    if (schedule_item["byday"].search(/[-]/) === -1) {
      let bydayArray = schedule_item["byday"].split(", ");
      console.log(bydayArray);
      let validatedWeekAndDay = bydayArray.filter(element => {
        return (Number(element.substring(0, 1)) === Math.ceil(monthDay / 7) && (element.substring(1) === WEEKDAYS_OBJ[weekday])); 
      })
      if (validatedWeekAndDay.length < 1) return false;
    } else { // if 'byday' field includes a negative number (row 157 is currently only one that does)
      // figure out how to calculate what day it is that month
    }
  } else if ((schedule_item["byday"].search(/[0-9]/) === -1) && (schedule_item["byday"] !== "")) { // if 'byday' field doesn't contain numbers (i.e. days that repeat every week), and isn't empty
    if (!schedule_item["byday"].includes(WEEKDAYS_OBJ[weekday])) return false;
  } else { // 'byday' field is empty (i.e. last remaining option is that 'bymonthday' has a value), check if the value matches current monthDay
    if (schedule_item["bymonthday"] !== monthDay) return false;
  }

  // (helper function "getExactMinute" returns equivalent exact minute in 1440 minute day)
  let openingMinute = getExactMinute(schedule_item["opens_at"]);
  let closingMinute = getExactMinute(schedule_item["closes_at"]);
  // if current exact minute of day is between the opening and closing exact minutes, return true. Otherwise return false.
  return (minuteOfDay >= openingMinute && minuteOfDay <= closingMinute);
} 

console.log(isOpen(schedule_item3));




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

