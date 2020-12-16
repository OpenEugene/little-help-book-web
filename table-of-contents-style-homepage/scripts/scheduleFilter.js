// Mock data array of services objects
let schedule_items = [
  { id: 4, freq: "WEEKLY", byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  { id: 5, freq: "WEEKLY", byday: "MO, TU, WE, TH, FR", opens_at: "13:00", closes_at: "17:00", bymonthday: "", valid_from: "", valid_to: "" },
  { id: 16, freq: "MONTHLY", byday: "2TU, 4TU", opens_at: "09:30", closes_at: "12:00", bymonthday: "", valid_from: "", valid_to: "" },
  { id: 21, freq: "DAILY", byday: "MO, TU, WE, TH, FR, SA, SU", opens_at: "00:00", closes_at: "23:59", bymonthday: "", valid_from: "", valid_to: "" },
  { id: 24, freq: "MONTHLY", byday: "", opens_at: "09:00", closes_at: "14:00", bymonthday: "11", valid_from: "", valid_to: "" },
  { id: 158, freq: "WEEKLY", byday: "MO, TU, WE, TH, FR", opens_at: "08:00", closes_at: "14:30", bymonthday: "", valid_from: "9/1/2020", valid_to: "5/31/2020" },
];

// Mock data date/time
let weekday = 4 + 1; // TH   (Date.getDay() starts at 0 so add 1)
let month = 11 + 1; // Dec   (Date.getMonth() starts at 0 so add 1)
let monthDay = 8; //    (Date.getDate() starts at 1)
let hour = 8; //    (Date.getHours() starts at 0)
let minute = 30; //    (Date.getMinutes() starts at 0)
let minuteOfDay = (hour * 60) + minute; // 930

// current date/time by js methods

// let rawDate = new Date();
// let weekday = rawDate.getDay() + 1; //   (Date.getDay() starts at 0 so add 1)
// let month = rawDate.getMonth() + 1; //   (Date.getMonth() starts at 0 so add 1)
// let monthDay = rawDate.getDate(); //   (Date.getDate() starts at 1)
// let hour = rawDate.getHours(); //   (Date.getHours() starts at 0)
// let minute = rawDate.getMinutes(); //   (Date.getMinutes() starts at 0)
// let minuteOfDay = (hour * 60) + minute; // 

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

function getTotalMins(time) {
  let hour = Number(time.substring(0, 2));
  let minutes = Number(time.substring(3));
  return (hour * MINS_PER_HR) + minutes;
}

function validateMonth(monthFrom, monthTo, currentMonth) {
  if (monthFrom < monthTo) {
   return (currentMonth >= monthFrom && currentMonth <= monthTo);
  } else return (currentMonth >= monthFrom || currentMonth <= monthTo)
}

function checkMonthlyByday(bydayString, monthDay) {
  let bydayArray = bydayString.split(", ");
  let validatedWeekAndDay = bydayArray.filter(element => {
    if (element.substring(0, 1) !== Math.ceil(monthDay / 7)) return false;
    if (element.substring(1) !== WEEKDAYS_OBJ[weekday]) return false
  })
  return (validatedWeekAndDay !== []);
}

function duringOpenHrs(minuteOfDay, openingMinute, closingMinute) {
  return (minuteOfDay >= openingMinute && minuteOfDay <= closingMinute);
}

function getOpenServices(schedule_items, month, monthDay, weekday, minuteOfDay) {
  return schedule_items.filter(item => {
    let openingMinute = getTotalMins(item["opens_at"]);
    let closingMinute = getTotalMins(item["closes_at"]);
    if (item["valid_from"] !== "") {
      let validMonthFrom = item["valid_from"].split("/")[0];
      let validMonthTo = item["valid_to"].split("/")[0];
      if (validateMonth(validMonthFrom, validMonthTo, month) === false) return false;
    }
    if (item["freq"] === "MONTHLY") {
      if (item["bymonthday"] !== "") {
        if (checkMonthlyByday(item["byday"], monthDay) === false) return false;
        return duringOpenHrs(minuteOfDay, openingMinute, closingMinute);
      }
    } else if (item["freq"] === "WEEKLY") {
      if (!item["byday"].includes(WEEKDAYS_OBJ[weekday])) return false;
      return duringOpenHrs(minuteOfDay, openingMinute, closingMinute);
    } else {
      return duringOpenHrs(minuteOfDay, openingMinute, closingMinute);
    }
  })
}

console.log(getOpenServices(schedule_items, month, monthDay, weekday, minuteOfDay));



//input: array of schedule_items objects, freq, day of the week, month number, day of the month, hour, minute.
//output: array of ids, each corresponding to individual schedule_items where the current date and time fits into the schedule items open time
//rules:
//

/*
helper function  = compare weekday using = getDay() method returns the day of the week for the specified date according to local time, where 0 represents Sunday. convert byday to numbers using a separate object.
- convert day (num) of the week to a 2 letter word (e.g. let weekday = "MO"), then check if schedule_items["byday"].includes(WEEKDAYS_OBJ[weekday]). If so, return true.

helper function = compare month using = getMonth() method returns the month in the specified date according to local time, as a zero-based value (where zero indicates the first month of the year).

convert time to minutes (use getHours, multiply by 60mins, and add leftover mins), and convert opens_at and closes_at to numbers (relating to minutes). check if time in minutes is between opens_at and closes_at minute amounts.

convert valid_from and valid_to to year => split strings by "/" into arrays of numbers.
*/

/*
Algorithm =====

- function takes in schedule_items array, as well as relevant date arguments.
- iterate over full array of schedule_items using loop, forEach, or filter.
  - if valid_from and valid_to are not ""
    - if day falls between valid_from and valid_to, continue. Otherwise, return false.
      - convert valid_from to array of numbers
      - convert valid_to to array of numbers
      - if month is >= valid_from[0] and <= valid_to[0], continue. Otherwise return false.
      - if monthDay is >= valid_from[1] and <= valid_to[1], continue. Otherwise, return false.
      - not sure if need to check year at this point.
  - if freq is "MONTHLY"
    - if there is bymonthday, check if it is equal to monthDay
    - get monthday/s item is open (helper function)
      - split byday string by ", " into array of days (e.g. "4TH")
      - check if any in array of days is equal to current monthDay (helper function takes in array of days)
    - if current time (in minutes) falls between opens_at and closes_at (both converted to minutes-time), return true.
  - if freq is "WEEKLY"
    - if byday includes weekday, continue, otherwise, return false.
    - if current time (in minutes) falls between opens_at and closes_at (both converted to minutes-time), return true. Otherwise, return false.
  - if freq is "DAILY"
    - if current time (in minutes) falls between opens_at and closes_at (both converted to minutes-time), return true. Otherwise, return false.
  Otherwise, return false.
*/

/*
- function checkMonthlyByday takes in array of days (e.g. ["2SA", "4TH"])
- for each element in array
  - if weekday is equal to current day (i.e. element.substring(1)), continue, otherwise return false.
  - if weekNumber (i.e. Math.ceil(monthDay / 7) is equal to current week (i.e. element.substring(0, 1)), return true, otherwise, return false.
Date.toDateString()

*/

