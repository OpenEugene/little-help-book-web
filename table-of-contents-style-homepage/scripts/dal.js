"use strict"

const Airtable = require('airtable');
const accessMethods = {
  STATIC: 'static',
  AIRTABLE_JS: 'airtableJs',
  SWAGGER: 'swagger',
};
// const accessMethod = accessMethods.STATIC;
const accessMethod = accessMethods.AIRTABLE_JS;
// const accessMethod = accessMethods.SWAGGER;

// Read-only key
const apiKey = "keyMmAL4mVBSORkGc";
// Production table
const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');

async function dalGetPlaceTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return placesTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')

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
          'languageHelp' : record.get('Language Help (y)')
        };
      });
      return placeTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
}

async function dalGetCategoryTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return categoryTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
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
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
}

async function dalGetSubcategoryTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return subcategoryTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
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
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
}

async function dalGetCatSubcatTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return catSubcatTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
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
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
}

async function dalGetCityTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return cityTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      const cityTableRaw = await dalGetTable('Cities', base);
      let cityTable = cityTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'name' : record.get('Name'),
        };
      });
      return cityTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
}

async function dalGetAlertTable() {
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return alertTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      const alertTableRaw = await dalGetTable('Alerts', base);
      let alertTable = alertTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'title' : record.get('Title'),
          'start_date' : record.get('StartDate'),
          'end_date' : record.get('EndDate'),
          'note' : record.get('Notes'),
        };
      });
      return alertTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER')
  }
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