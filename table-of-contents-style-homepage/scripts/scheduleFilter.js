// Mock data array of services objects
let servicesObjects = [
  // testing valid_from and valid_to cases for 29 of September 2020 (5TU) (-1TU) 10:30
  { id: 1, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "", valid_to: "" }, // both valid_to & valid_from are empty strings
  { id: 2, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // both valid_to & valid_from contain full values
  { id: 3, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "" }, // valid_from full, valid_to empty
  { id: 4, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01", valid_to: "" }, // valid_from only month/day, valid_to empty
  { id: 5, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "", valid_to: "10/01/2020" }, // valid_from empty, valid_to full
  { id: 6, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "", valid_to: "10/01" }, // valid_from empty, valid_to only month/day
  { id: 7, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01", valid_to: "10/01" }, // both valid_from & valid_to only month/day (value_from month < value_to month)
  { id: 8, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01", valid_to: "01/01" }, // both valid_from & valid_to only month/day (value_from month > value_to month)
  { id: 9, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "09/01", valid_to: "09/30" }, // both valid_from & valid_to only month/day (value_from month === value_to month)
  { id: 10, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01" }, // valid_from full, valid_to only month/day
  { id: 11, byday: "TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01", valid_to: "10/01/2020" }, // valid_from only month/day, valid_to full
  // testing "byday" value cases
  { id: 12, byday: "MO, TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // multiple straight days in byday string
  { id: 13, byday: "2TU, 5TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // multiple numbered days
  { id: 14, byday: "-1TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // minus number day
  { id: 15, byday: "MO, -1TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // straight day and minus number day
  { id: 16, byday: "MO, 5TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // straight day and number day
  { id: 17, byday: "MO, 3MO, -1TU", opens_at: "10:00", closes_at: "11:00", bymonthday: "", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 18, byday: "", opens_at: "10:00", closes_at: "11:00", bymonthday: "29", valid_from: "08/01/2020", valid_to: "10/01/2020" }, // straight day, number day, minus number day
  // testing "opens_at" and "closes_at" value cases are covered by subsequent date tests

  // testing valid_from and valid_to cases January 3 (1st Sunday of January) 2021  (-5SU)
  { id: 19, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "", valid_to: "" }, // both valid_to & valid_from are empty strings
  { id: 20, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "02/02/2021" }, // both valid_to & valid_from contain full values
  { id: 21, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "" }, // valid_from full, valid_to empty
  { id: 22, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01", valid_to: "" }, // valid_from only month/day, valid_to empty
  { id: 23, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "", valid_to: "02/02/2021" }, // valid_from empty, valid_to full
  { id: 24, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "", valid_to: "02/02" }, // valid_from empty, valid_to only month/day
  { id: 25, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "01/01", valid_to: "02/02" }, // both valid_from & valid_to only month/day (value_from month < value_to month)
  { id: 26, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01", valid_to: "02/02" }, // both valid_from & valid_to only month/day (value_from month > value_to month)
  { id: 27, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "01/01", valid_to: "01/05" }, // both valid_from & valid_to only month/day (value_from month === value_to month)
  { id: 28, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "02/02" }, // valid_from full, valid_to only month/day
  { id: 29, byday: "SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01", valid_to: "02/02/2021" }, // valid_from only month/day, valid_to full
  // testing "byday" value cases
  { id: 30, byday: "MO, SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "02/02/2021" }, // multiple straight days in byday string
  { id: 31, byday: "2SU, 1SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "02/02/2021" }, // multiple numbered days
  { id: 32, byday: "-5SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "02/02/2021" }, // minus number day
  { id: 33, byday: "MO, -5SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "10/02/2021" }, // straight day and minus number day
  { id: 34, byday: "MO, 1SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "10/02/2021" }, // straight day and number day
  { id: 35, byday: "TH, 3MO, -5SU", opens_at: "15:00", closes_at: "16:00", bymonthday: "", valid_from: "12/01/2020", valid_to: "10/02/2021" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 36, byday: "", opens_at: "15:00", closes_at: "16:00", bymonthday: "3", valid_from: "12/01/2020", valid_to: "10/01/2021" }, // straight day, number day, minus number day

  // testing valid_from and valid_to cases { dateTimeString: 'July 17, 2020 08:30:00' },  3rd Friday of July 2020  (-3FR)
  { id: 37, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "", valid_to: "" }, // both valid_to & valid_from are empty strings
  { id: 38, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // both valid_to & valid_from contain full values
  { id: 39, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "" }, // valid_from full, valid_to empty
  { id: 40, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27", valid_to: "" }, // valid_from only month/day, valid_to empty
  { id: 41, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "", valid_to: "08/01/2020" }, // valid_from empty, valid_to full
  { id: 42, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "", valid_to: "08/01" }, // valid_from empty, valid_to only month/day
  { id: 43, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27", valid_to: "08/01" }, // both valid_from & valid_to only month/day (value_from month < value_to month)
  { id: 44, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "07/15", valid_to: "12/01" }, // both valid_from & valid_to only month/day (value_from month > value_to month)
  { id: 45, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "07/01", valid_to: "07/21" }, // both valid_from & valid_to only month/day (value_from month === value_to month)
  { id: 46, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01" }, // valid_from full, valid_to only month/day
  { id: 47, byday: "FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27", valid_to: "08/01/2020" }, // valid_from only month/day, valid_to full
  // testing "byday" value cases
  { id: 48, byday: "TH, FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // multiple straight days in byday string
  { id: 49, byday: "3FR, 5FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // multiple numbered days
  { id: 50, byday: "-3FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // minus number day
  { id: 51, byday: "TU, -3FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // straight day and minus number day
  { id: 52, byday: "WE, 3FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // straight day and number day
  { id: 53, byday: "WE, 3MO, -3FR", opens_at: "08:29", closes_at: "08:31", bymonthday: "", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 54, byday: "", opens_at: "08:29", closes_at: "08:31", bymonthday: "17", valid_from: "06/27/2020", valid_to: "08/01/2020" }, // straight day, number day, minus number day

  // testing valid_from and valid_to cases { dateTimeString: 'March 21, 2020 13:30:00' }, 3rd Saturday of March 2020  (-2SA)
  { id: 55, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "", valid_to: "" }, // both valid_to & valid_from are empty strings
  { id: 56, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "04/15/2020" }, // both valid_to & valid_from contain full values
  { id: 57, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "" }, // valid_from full, valid_to empty
  { id: 58, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25", valid_to: "" }, // valid_from only month/day, valid_to empty
  { id: 59, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "", valid_to: "04/15/2020" }, // valid_from empty, valid_to full
  { id: 60, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "", valid_to: "04/15" }, // valid_from empty, valid_to only month/day
  { id: 61, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "02/01", valid_to: "04/15" }, // both valid_from & valid_to only month/day (value_from month < value_to month)
  { id: 62, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25", valid_to: "04/15" }, // both valid_from & valid_to only month/day (value_from month > value_to month)
  { id: 63, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "03/01", valid_to: "03/25" }, // both valid_from & valid_to only month/day (value_from month === value_to month)
  { id: 64, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "04/15" }, // valid_from full, valid_to only month/day
  { id: 65, byday: "SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25", valid_to: "04/15/2020" }, // valid_from only month/day, valid_to full
  // testing "byday" value cases
  { id: 66, byday: "MO, SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "04/15/2020" }, // multiple straight days in byday string
  { id: 67, byday: "1TU, 3SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "04/15/2020" }, // multiple numbered days
  { id: 68, byday: "-2SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "04/15/2020" }, // minus number day
  { id: 69, byday: "MO, -2SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "10/02/2020" }, // straight day and minus number day
  { id: 70, byday: "MO, 3SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "10/02/2020" }, // straight day and number day
  { id: 71, byday: "MO, 3MO, -2SA", opens_at: "12:59", closes_at: "13:40", bymonthday: "", valid_from: "12/25/2019", valid_to: "10/02/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 72, byday: "", opens_at: "12:59", closes_at: "13:40", bymonthday: "21", valid_from: "12/25/2019", valid_to: "10/01/2020" }, // straight day, number day, minus number day
]

// Mock data date/times
let dateTimeObjects = [
  { dateTimeString: 'September 29, 2020 10:30:00' },  // 5th Tuesday of September 2020  (-1TU)
  { dateTimeString: 'January 3, 2021 15:30:00' },  // 1st Sunday of January 2021  (-5SU)
  { dateTimeString: 'July 17, 2020 08:30:00' },  // 3rd Friday of July 2020  (-3FR)
  { dateTimeString: 'March 21, 2020 13:30:00' },  // 4th Saturday of March 2020  (-1SA)
]

const WEEKDAYS_OBJ = {
  1: "SU",
  2: "MO",
  3: "TU",
  4: "WE",
  5: "TH",
  6: "FR",
  7: "SA",
}

// helper function takes in valid_from or valid_to array value and returns number representing milliseconds since 01/01/1970
function validGetTime(validDateArray) {
  // if (!arrayOfNums[2])
  let dateInstance = new Date(validDateArray[2], (validDateArray[0] - 1), validDateArray[1]);
  return dateInstance.getTime();
}

// helper function verifies whether current dateTime is between valid_from and valid_to dates.
function isValidFromTo(schedule_item, dateTime) {
  // if there are no values in either valid_from or valid_to, return to main function.
  if (!schedule_item["valid_from"] && !schedule_item["valid_to"]) return true;
  // split valid_from and valid_to string values into arrays separated by /
  let validFromArray = schedule_item["valid_from"].split("/").map(element => Number(element));
  let validToArray = schedule_item["valid_to"].split("/").map(element => Number(element));
  // if validFromArray has value and validToArray does not
  if ((validFromArray.length > 1) && (validToArray.length === 1)) {
    // if validFromArray doesn't have year value, give current year value
    if (validFromArray[2] === undefined) {
      validFromArray.push(dateTime.getFullYear());
      // if validFromArray month is greater than current dateTime month, subtract 1 from validFromArray year to make it previous year.
      // if (validFromArray[0] > dateTime.getMonth() + 1) validFromArray[2] -= 1;
      // console.log(validFromArray)
    }
    // then return whether this is before or equal to current dateTime
    return (validGetTime(validFromArray) <= dateTime.getTime());
  } else if ((validFromArray.length === 1) && (validToArray.length > 1)) { // if validTo has value, but validFrom is empty
    // if validToArray doesn't have year value, give current year value
    if (validToArray[2] === undefined) validToArray.push(dateTime.getFullYear());

    return (validGetTime(validToArray) >= dateTime.getTime());
  } else { // if both valid_from or valid_to have dates in schedule table
    // if validFromArray has year value and validToArray does not have year value
    if ((validFromArray[2] !== undefined) && (validToArray[2] === undefined)) validToArray.push(dateTime.getFullYear());
    // of validFromArray doesn't have year value, but validToArray does
    else if ((validFromArray[2] === undefined) && (validToArray[2] !== undefined)) validFromArray.push(dateTime.getFullYear());
    // if validFromArray and validToArray don't include the year values 
    else if ((validFromArray[2] === undefined) && (validToArray[2] === undefined)) {  // this assumes that we don't situation where one includes the year and the other doesn't.
      // and if validFromArray month is less than or equal to validToArray month
      if (validFromArray[0] <= validToArray[0]) {
        // push current year into validToArray
        validToArray.push(dateTime.getFullYear());
      } else { // if validFromArray month is greater that validToArray month
        // push current year plus 1 into validToArray
        validToArray.push(dateTime.getFullYear() + 1);
      }
    }
    // push current year into validFromArray
    validFromArray.push(dateTime.getFullYear());
    let validFromGetTime = validGetTime(validFromArray);
    let validToGetTime = validGetTime(validToArray);
    return (dateTime.getTime() >= validFromGetTime && dateTime.getTime() <= validToGetTime)
  }
}

// helper function splits byday string into array, then filters and verifies day elements
function isValidDay(schedule_item, monthDay, weekday, year, month) {
  let bydayArray = schedule_item["byday"].split(', ');
  let bydayMatchCurrentDay = bydayArray.filter(itemDay => itemDay.includes(WEEKDAYS_OBJ[weekday]));
  if (bydayMatchCurrentDay.length > 0) {
    for (day of bydayMatchCurrentDay) {
      if (day.search(/[0-5]/) === -1) return true;
      if (Number.parseInt(day, 10) === Math.ceil(monthDay / 7)) return true;
      if (Math.sign(Number.parseInt(day, 10)) === -1) {
        let rawDateLastDayOfMonth = new Date(year, month, 0); // e.g. 2020-12-31T08:00:00.000Z 
        let lastDayNumOfMonth = rawDateLastDayOfMonth.getDate();
        // console.log(monthDay)
        // console.log(lastDayNumOfMonth)
        // console.log(Number.parseInt(day, 10) * 7)
        // console.log(lastDayNumOfMonth + (Number.parseInt(day, 10) * 7))
        // console.log("&&")
        // console.log(lastDayNumOfMonth)
        // console.log((Number.parseInt(day, 10) + 1) * 7)
        // console.log((lastDayNumOfMonth + (Number.parseInt(day, 10) + 1) * 7))
        if ((monthDay > lastDayNumOfMonth + (Number.parseInt(day, 10) * 7)) &&
          (lastDayNumOfMonth + (Number.parseInt(day, 10) + 1) * 7 >= monthDay)) return true;
      }
    }
  }
  // in need 3 >= -4 && 

  return false;
}

function isValidMonthDay(schedule_item, monthDay) {
  let byMonthDayArray = schedule_item["bymonthday"].split(', ').map(stringNum => Number(stringNum));
  for (byMonthDay of byMonthDayArray) {
    if (byMonthDay === monthDay) return true;
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
  if (!isValidFromTo(schedule_item, dateTime)) return false;
  // if there is a value in the byday column, very it/one of these correlates to the current day?
  if (schedule_item["byday"] !== "") {
    if (isValidDay(schedule_item, monthDay, weekday, year, month)) {
      return isValidTime(schedule_item, hour, minute);
    }
  } else if (isValidMonthDay(schedule_item, monthDay)) {
    return isValidTime(schedule_item, hour, minute);
  } else return false;
}

// function to run through each test case in servicesObjects
function test(servicesObjects, dateTimeObjects, WEEKDAYS_OBJ) {
  dateTimeObjects.forEach(dateTimeObject => {
    let currentDateTime = new Date(dateTimeObject.dateTimeString);
    console.log(`CURRENT DATETIME INPUT: ${WEEKDAYS_OBJ[(currentDateTime.getDay() + 1)]}, ${dateTimeObject.dateTimeString}`);
    servicesObjects.forEach(item => {
      if (isOpen(item, dateTimeObject.dateTimeString)) {
        console.log(`${item["id"]} is OPEN ==>>> ${Object.values(item)}`);
      } else console.log(`${item["id"]} is CLOSED ==>>> ${Object.values(item)}`);
    })
  })
}

// run test
test(servicesObjects, dateTimeObjects, WEEKDAYS_OBJ);
