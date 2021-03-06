"use strict"

const Airtable = require('airtable');
const useCache = true;
// Read-only key
const apiKey = "keyMmAL4mVBSORkGc";
// Production table
const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');

async function dalGetPlaceTable() {
  if (useCache) {
    // console.log('CACHE');
    return placesTableCached;
  }
  console.log('NO CACHE')

  const placeTableRaw = await dalGetTable('Help Services', base);
  placeTableRaw.sort((a, b) => { compareNames(a,b); });
  let placeTable = placeTableRaw.map(function(record) {
    return {
      'id' : record.id,
      'name' : record.get('Name'),
      'name_es' : record.get('Name-ES'),
      'catSubcatId' : record.get('CatSubcat'),
      'city' : record.get('City'),
      'category' : record.get('Category'),
      'subcategory' : record.get('Subcategory'),
      'phone' : record.get('Phone Number'),
      'address' : record.get('Physical Address'),
      'latitude' : record.get('Latitude'),
      'longitude' : record.get('Longitude'),
      'url' : record.get('Web address'),
      'email' : record.get('Email Address'),
      'hours' : record.get('Hours of operation'),
      'hours_es' : record.get('Hours of operation-es'),
      'description' : record.get('Description'),
      'description_es' : record.get('Description-ES'),
      'wheelchair' : record.get('Wheelchair access (y)'),
      'languageHelp' : record.get('Language Help (y)'),
      'schedule' : record.get('schedule')
    };
  });
  return placeTable;
}

async function dalGetScheduleTable() {
  if (useCache) {
    // console.log('CACHE');
    return scheduleTableCached;
  }
}

async function dalGetCategoryTable() {
  if (useCache) {
    // console.log('CACHE');
    return categoryTableCached;
  }
  // console.log('NO CACHE')

  const categoryTableRaw = await dalGetTable('Categories', base);
  categoryTableRaw.sort((a, b) => { compareNames(a,b); });
  let categoryTable = categoryTableRaw.map(function(record) {
    let subcategories = record.get('Subcategories');
    if (!subcategories) {
      subcategories = [];
    }
    return {
      'id' : record.id,
      'name' : record.get('Name'),
      'name_es' : record.get('Name-ES'),
      'subcategories' : subcategories,
    };
  });
  return categoryTable;
}

async function dalGetSubcategoryTable() {
  if (useCache) {
    // console.log('CACHE');
    return subcategoryTableCached;
  }
  // console.log('NO CACHE')

  const subcategoryTableRaw = await dalGetTable('Subcategories', base);
  subcategoryTableRaw.sort((a, b) => { compareNames(a,b); });
  let subcategoryTable = subcategoryTableRaw.map(function(record) {
    return {
      'id' : record.id,
      'categoryId' : record.get('Category'),
      'name' : record.get('Name'),
      'name_es' : record.get('Name-ES'),
    };
  });
  return subcategoryTable;
}

async function dalGetCatSubcatTable() {
  if (useCache) {
    // console.log('CACHE');
    return catSubcatTableCached;
  }
  // console.log('NO CACHE')

  const catSubcatTableRaw = await dalGetTable('CatSubcats', base);
  let catSubcatTable = catSubcatTableRaw.map(function(record) {
    let catSubcatName = record.get('Name');
    let catSubcatId = record.id;

    let categoryId = record.get('Category');
    categoryId = categoryId[0];

    let subcategoryId = record.get('Subcategory');
    let subcategoryName;
    let subcategoryNameSpanish;
    if (subcategoryId) {
      subcategoryId = subcategoryId[0];
      subcategoryName = record.get('SubcategoryString')[0];
      subcategoryNameSpanish = record.get('Subcategory-ES')[0];
    } else {
      subcategoryName = '';
      subcategoryNameSpanish = '';
    }
    return {
      'catSubcatId': catSubcatId,
      'catSubcatName': catSubcatName,
      'categoryId' : categoryId,
      'subcategoryId' : subcategoryId,
      'name' : subcategoryName,
      'name_es' : subcategoryNameSpanish,
      'places' : []
    };
  });
  return catSubcatTable;
}

async function dalGetCityTable() {
  if (useCache) {
    // console.log('CACHE');
    return cityTableCached;
  }
  // console.log('NO CACHE')

  const cityTableRaw = await dalGetTable('Cities', base);
  let cityTable = cityTableRaw.map(function(record) {
    return {
      'id' : record.id,
      'name' : record.get('Name'),
    };
  });
  return cityTable;
}

async function dalGetAlertTable() {
  if (useCache) {
    // console.log('CACHE');
    return alertTableCached;
  }
  // console.log('NO CACHE')

  const alertTableRaw = await dalGetTable('Alerts', base);
  let alertTable = alertTableRaw.map(function(record) {
    return {
      'id' : record.id,
      'title' : record.get('Title'),
      'displayDate' : record.get('Display Date'),
      'startDate' : record.get('StartDate'),
      'endDate' : record.get('EndDate'),
      'note' : record.get('Notes'),
    };
  });
  return alertTable;
}

function dalGetTable(tablename) {
  return new Promise(function (resolve) {
    let recordsBuffer = [];
		base(tablename).select({
			// maxRecords: 3,
			maxRecords: 1000,
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.
			records.forEach(function(record) {
				recordsBuffer.push(record);
			});
			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();
    }, function done(err) {
			if (err) { console.error(err); return; }
			resolve(recordsBuffer);
		})
  })
}

function compareNames(a, b) {
  let aName = a.get('Name').toLowerCase();
  let bName = b.get('Name').toLowerCase();
  let result = 0;
  if(aName < bName) { result = -1; }
  else if(aName > bName) { result = 1; }
  return result;
}