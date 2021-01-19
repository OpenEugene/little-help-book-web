// Mock data array of services objects
let servicesObjects = [
  // testing validFrom and validTo cases for 29 of September 2020 (5TU) (-1TU) 10:30
  { id: 1, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "", validTo: "" }, // both validTo & validFrom are empty strings
  { id: 2, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // both validTo & validFrom contain full values
  { id: 3, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "" }, // validFrom full, validTo empty
  { id: 4, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01", validTo: "" }, // validFrom only month/day, validTo empty
  { id: 5, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "", validTo: "10/01/2020" }, // validFrom empty, validTo full
  { id: 6, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "", validTo: "10/01" }, // validFrom empty, validTo only month/day
  { id: 7, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01", validTo: "10/01" }, // both validFrom & validTo only month/day (value_from month < value_to month)
  { id: 8, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01", validTo: "01/01" }, // both validFrom & validTo only month/day (value_from month > value_to month)
  { id: 9, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "09/01", validTo: "09/30" }, // both validFrom & validTo only month/day (value_from month === value_to month)
  // { id: 10, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01" }, // validFrom full, validTo only month/day
  // { id: 11, byday: "TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01", validTo: "10/01/2020" }, // validFrom only month/day, validTo full
  // testing "byday" value cases
  { id: 12, byday: "MO, TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // multiple straight days in byday string
  { id: 13, byday: "2TU, 5TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // multiple numbered days
  { id: 14, byday: "-1TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // minus number day
  { id: 15, byday: "MO, -1TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // straight day and minus number day
  { id: 16, byday: "MO, 5TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // straight day and number day
  { id: 17, byday: "MO, 3MO, -1TU", opensAt: "10:00", closesAt: "11:00", bymonthday: "", validFrom: "08/01/2020", validTo: "10/01/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 18, byday: "", opensAt: "10:00", closesAt: "11:00", bymonthday: "29", validFrom: "08/01/2020", validTo: "10/01/2020" }, // straight day, number day, minus number day
  // testing "opensAt" and "closesAt" value cases are covered by subsequent date tests

  // testing validFrom and validTo cases January 3 (1st Sunday of January) 2021  (-5SU)
  { id: 19, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "", validTo: "" }, // both validTo & validFrom are empty strings
  { id: 20, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "02/02/2021" }, // both validTo & validFrom contain full values
  { id: 21, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "" }, // validFrom full, validTo empty
  { id: 22, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01", validTo: "" }, // validFrom only month/day, validTo empty
  { id: 23, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "", validTo: "02/02/2021" }, // validFrom empty, validTo full
  { id: 24, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "", validTo: "02/02" }, // validFrom empty, validTo only month/day
  { id: 25, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "01/01", validTo: "02/02" }, // both validFrom & validTo only month/day (value_from month < value_to month)
  { id: 26, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01", validTo: "02/02" }, // both validFrom & validTo only month/day (value_from month > value_to month)
  { id: 27, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "01/01", validTo: "01/05" }, // both validFrom & validTo only month/day (value_from month === value_to month)
  // { id: 28, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "02/02" }, // validFrom full, validTo only month/day
  // { id: 29, byday: "SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01", validTo: "02/02/2021" }, // validFrom only month/day, validTo full
  // testing "byday" value cases
  { id: 30, byday: "MO, SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "02/02/2021" }, // multiple straight days in byday string
  { id: 31, byday: "2SU, 1SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "02/02/2021" }, // multiple numbered days
  { id: 32, byday: "-5SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "02/02/2021" }, // minus number day
  { id: 33, byday: "MO, -5SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "10/02/2021" }, // straight day and minus number day
  { id: 34, byday: "MO, 1SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "10/02/2021" }, // straight day and number day
  { id: 35, byday: "TH, 3MO, -5SU", opensAt: "15:00", closesAt: "16:00", bymonthday: "", validFrom: "12/01/2020", validTo: "10/02/2021" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 36, byday: "", opensAt: "15:00", closesAt: "16:00", bymonthday: "3", validFrom: "12/01/2020", validTo: "10/01/2021" }, // straight day, number day, minus number day

  // testing validFrom and validTo cases { dateTimeString: 'July 17, 2020 08:30:00' },  3rd Friday of July 2020  (-3FR)
  { id: 37, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "", validTo: "" }, // both validTo & validFrom are empty strings
  { id: 38, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // both validTo & validFrom contain full values
  { id: 39, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "" }, // validFrom full, validTo empty
  { id: 40, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27", validTo: "" }, // validFrom only month/day, validTo empty
  { id: 41, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "", validTo: "08/01/2020" }, // validFrom empty, validTo full
  { id: 42, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "", validTo: "08/01" }, // validFrom empty, validTo only month/day
  { id: 43, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27", validTo: "08/01" }, // both validFrom & validTo only month/day (value_from month < value_to month)
  { id: 44, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "07/15", validTo: "12/01" }, // both validFrom & validTo only month/day (value_from month > value_to month)
  { id: 45, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "07/01", validTo: "07/21" }, // both validFrom & validTo only month/day (value_from month === value_to month)
  // { id: 46, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01" }, // validFrom full, validTo only month/day
  // { id: 47, byday: "FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27", validTo: "08/01/2020" }, // validFrom only month/day, validTo full
  // testing "byday" value cases
  { id: 48, byday: "TH, FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // multiple straight days in byday string
  { id: 49, byday: "3FR, 5FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // multiple numbered days
  { id: 50, byday: "-3FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // minus number day
  { id: 51, byday: "TU, -3FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // straight day and minus number day
  { id: 52, byday: "WE, 3FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // straight day and number day
  { id: 53, byday: "WE, 3MO, -3FR", opensAt: "08:29", closesAt: "08:31", bymonthday: "", validFrom: "06/27/2020", validTo: "08/01/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 54, byday: "", opensAt: "08:29", closesAt: "08:31", bymonthday: "17", validFrom: "06/27/2020", validTo: "08/01/2020" }, // straight day, number day, minus number day

  // testing validFrom and validTo cases { dateTimeString: 'March 21, 2020 13:30:00' }, 3rd Saturday of March 2020  (-2SA)
  { id: 55, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "", validTo: "" }, // both validTo & validFrom are empty strings
  { id: 56, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "04/15/2020" }, // both validTo & validFrom contain full values
  { id: 57, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "" }, // validFrom full, validTo empty
  { id: 58, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25", validTo: "" }, // validFrom only month/day, validTo empty
  { id: 59, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "", validTo: "04/15/2020" }, // validFrom empty, validTo full
  { id: 60, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "", validTo: "04/15" }, // validFrom empty, validTo only month/day
  { id: 61, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "02/01", validTo: "04/15" }, // both validFrom & validTo only month/day (value_from month < value_to month)
  { id: 62, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25", validTo: "04/15" }, // both validFrom & validTo only month/day (value_from month > value_to month)
  { id: 63, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "03/01", validTo: "03/25" }, // both validFrom & validTo only month/day (value_from month === value_to month)
  // { id: 64, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "04/15" }, // validFrom full, validTo only month/day
  // { id: 65, byday: "SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25", validTo: "04/15/2020" }, // validFrom only month/day, validTo full
  // testing "byday" value cases
  { id: 66, byday: "MO, SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "04/15/2020" }, // multiple straight days in byday string
  { id: 67, byday: "1TU, 3SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "04/15/2020" }, // multiple numbered days
  { id: 68, byday: "-2SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "04/15/2020" }, // minus number day
  { id: 69, byday: "MO, -2SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "10/02/2020" }, // straight day and minus number day
  { id: 70, byday: "MO, 3SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "10/02/2020" }, // straight day and number day
  { id: 71, byday: "MO, 3MO, -2SA", opensAt: "12:59", closesAt: "13:40", bymonthday: "", validFrom: "12/25/2019", validTo: "10/02/2020" }, // straight day, number day, minus number day
  // testing "monthday" value cases
  { id: 72, byday: "", opensAt: "12:59", closesAt: "13:40", bymonthday: "21", validFrom: "12/25/2019", validTo: "10/01/2020" }, // straight day, number day, minus number day
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

// helper function takes in validFrom or validTo array value and returns number representing milliseconds since 01/01/1970
function validGetTime(validDateArray) {
  // if (!arrayOfNums[2])
  let dateInstance = new Date(validDateArray[2], (validDateArray[0] - 1),
    validDateArray[1]);
  return dateInstance.getTime();
}

// helper function verifies whether current dateTime is between validFrom and validTo dates.
function isValidFromTo(scheduleItem, dateTime) {
  // if there are no values in either validFrom or validTo, return to main function.
  if (!scheduleItem["validFrom"] && !scheduleItem["validTo"]) return true;
  // split validFrom and validTo string values into arrays separated by /
  let validFromArr = scheduleItem["validFrom"].split("/").map(element =>
    Number(element));
  let validToArr = scheduleItem["validTo"].split("/").map(element =>
    Number(element));

  // if validFromArr has value and validToArr === []
  if ((validFromArr.length > 1) && (validToArr.length === 1)) {
    // if validFromArr === [month, day], push in current year value
    if (validFromArr[2] === undefined) {
      validFromArr.push(dateTime.getFullYear());
    }
    // return whether validFrom is before or equal to current dateTime
    return (validGetTime(validFromArr) <= dateTime.getTime());

  } else if ((validFromArr.length === 1) && (validToArr.length > 1)) { // if validFrom === [], but validTo has value
    // if validToArr === [month, day], push in current year value
    if (validToArr[2] === undefined) validToArr.push(dateTime.getFullYear());
    // return whether validTo is greater than or equal to current dateTime
    return (validGetTime(validToArr) >= dateTime.getTime());

  } else { // if both validFrom and validTo have dates in schedule table
    // if both validFromArr and validToArr have only [month, day]
    if ((validFromArr[2] === undefined) && (validToArr[2] === undefined)) {
      // push in current year value
      validFromArr.push(dateTime.getFullYear());
      validToArr.push(dateTime.getFullYear());
    }
    // convert both to milliseconds since 01/01/1970
    let validFromGetTime = validGetTime(validFromArr);
    let validToGetTime = validGetTime(validToArr);
    // if validFrom is less than validTo, return whether dateTime falls between these
    if (validFromGetTime < validToGetTime) {
      return (dateTime.getTime() >= validFromGetTime && dateTime.getTime() <=
        validToGetTime);
    } else {
      // if validFrom is greater than validTo, return false if dateTime falls between these
      return !(dateTime.getTime() >= validFromGetTime && dateTime.getTime() <=
        validToGetTime);
    }
  }
}

// helper funct splits byday, then filters and verifies day elements
function isValidDay(scheduleItem, monthDay, weekday, year, month) {
  let bydayArray = scheduleItem["byday"].split(', ');
  let bydayMatchCurrentDay = bydayArray.filter(itemDay =>
    itemDay.includes(WEEKDAYS_OBJ[weekday]));
  if (bydayMatchCurrentDay.length > 0) {
    for (let day of bydayMatchCurrentDay) {
      if (day.search(/[0-5]/) === -1) return true;
      if (Number.parseInt(day, 10) === Math.ceil(monthDay / 7)) return true;
      if (Math.sign(Number.parseInt(day, 10)) === -1) {
        let rawDateLastDayOfMonth = new Date(year, month, 0);
        let lastDayNumOfMonth = rawDateLastDayOfMonth.getDate();
        if ((monthDay > lastDayNumOfMonth + (Number.parseInt(day, 10) * 7)) &&
          (lastDayNumOfMonth + (Number.parseInt(day, 10) + 1) * 7 >= monthDay)) {
          return true;
        }
      }
    }
  }
  return false;
}

function isValidMonthDay(scheduleItem, monthDay) {
  let byMonthDayArray = scheduleItem["bymonthday"].split(', ').map(stringNum => Number(stringNum));
  for (let byMonthDay of byMonthDayArray) {
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
function isValidTime(scheduleItem, hour, minute) {
  let openingMinute = getExactMinute(scheduleItem["opensAt"]);
  let closingMinute = getExactMinute(scheduleItem["closesAt"]);
  let minuteOfDay = (hour * MINS_PER_HR) + minute;
  return (minuteOfDay >= openingMinute && minuteOfDay <= closingMinute);
}

// main function - return boolean showing whether item in schedule table is open
function isOpen(scheduleItem, dateTimeString) {
  let dateTime = new Date(dateTimeString);
  let year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1; //   (Date.getMonth() starts at 0 so add 1)
  let weekday = dateTime.getDay() + 1; //   (Date.getDay() starts at 0 so add 1)
  let monthDay = dateTime.getDate(); //   (Date.getDate() starts at 1)
  let hour = dateTime.getHours(); //   (Date.getHours() starts at 0)
  let minute = dateTime.getMinutes(); //   (Date.getMinutes() starts at 0)

  // if there is validFrom and validTo fields, verify date falls between these?
  if (!isValidFromTo(scheduleItem, dateTime)) return false;
  // if value/s in the byday column, check if correlates to the current day?
  if (scheduleItem["byday"] !== "") {
    if (isValidDay(scheduleItem, monthDay, weekday, year, month)) {
      return isValidTime(scheduleItem, hour, minute);
    }
  } else if (isValidMonthDay(scheduleItem, monthDay)) {
    return isValidTime(scheduleItem, hour, minute);
  }
  return false;
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
    });
  });
}

// run test
test(servicesObjects, dateTimeObjects, WEEKDAYS_OBJ);
