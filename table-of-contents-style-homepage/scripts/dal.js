"use strict"

const Airtable = require('airtable');
const accessMethods = {
  STATIC: 'static',
  AIRTABLE_JS: 'airtableJs',
  SWAGGER: 'swagger',
};
// const accessMethod = accessMethods.STATIC;
// const accessMethod = accessMethods.AIRTABLE_JS;
const accessMethod = accessMethods.SWAGGER;

// Read-only key
const apiKey = "keyMmAL4mVBSORkGc";
// Production table
const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');

// const swaggerUrl = "https://littlehelpbook.com/";
const swaggerUrl = "https://localhost:5001/";

let compareDebug = false;

async function dalGetPlaceTable() {
  let placeTable;
  let placeTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      console.log(placesTableCached);
      return placesTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      placeTableRaw = await dalGetTable('Help Services', base);
      placeTable = placeTableRaw.map(function(record) {
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
      // placeTable.sort((a, b) => { compareNames(a,b); });
      placeTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      return placeTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER places')
      placeTableRaw = await dalGetTableSwagger('Place');
      console.log("placeTableRaw:", placeTableRaw);
      placeTable = placeTableRaw.map(function(record) {
        // Pull the ids from the objects as that's all we use, and to be like the
        // data we get using the Airtable API. 
        const category = record.categoryList.map(record => record.id);
        const subcategory = record.subcategoryList.map(record => record.id);
        const catSubcat = record.catSubcatList.map(record => record.id);
        const city = record.cityList.map(record => record.id);
        return {
          'id' : record.id,
          'name' : record.name,
          'name_es' : record.nameSpanish,
          // 'catSubcatId' : record.CatSubcat,
          'catSubcatId' : catSubcat,
          'city' : city,
          'category' : category,
          'subcategory' : subcategory,
          'phone' : record.phone,
          'address' : record.address,
          'latitude' : record.latitude,
          'longitude' : record.longitude,
          'url' : record.url,
          'email' : record.email,
          'hours' : record.hours,
          'hours_es' : record.hoursSpanish,
          'description' : record.description,
          'description_es' : record.descriptionSpanish,
          'wheelchair' : record.wheelchair,
          'languageHelp' : record.languageHelp
        };
      });
      // placeTable.sort((a, b) => { compareNames(a,b); });
      placeTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      console.log("placeTable:", placeTable);
      // console.log("foo", placeTable[0].id, placeTable[0].name, placeTable[0].hours_es);
      console.log("placeTable category", placeTable[0].category[0], placeTable[0].category[0].id);
      console.log("placesTableCached category", placesTableCached[0].category[0]);
      console.log("placesTable city", placeTable[0].city);
      console.log("placesTableCached city", placesTableCached[0].city);
      return placeTable;
      // return placesTableCached;
  }
}

async function dalGetCategoryTable() {
  let categoryTable;
  let categoryTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return categoryTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      categoryTableRaw = await dalGetTable('Categories', base);
      console.log('before', categoryTableRaw)
      // categoryTableRaw.sort((a, b) => { compareNamesOrig(a,b); });
      console.log('after', categoryTableRaw)
      categoryTable = categoryTableRaw.map(function(record) {
        // empty arrays come in as null, so no need to convert to []
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
      console.log('before', categoryTable)
      // categoryTable.sort((a, b) => { compareNames(a,b); });
      categoryTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      console.log('after', categoryTable)
      return categoryTable;
    case accessMethods.SWAGGER:
      compareDebug = true;
      console.log('SWAGGER category')
      categoryTableRaw = await dalGetTableSwagger('Category');
      // categoryTableRaw.sort((a, b) => { compareNames(a,b); });
      categoryTable = await categoryTableRaw.map(function(record) {
        let subcategories = record.subcategories;
        return {
          'id' : record.id,
          'name' : record.name,
          'name_es' : record.nameSpanish,
          'subcategories' : record.subcategories,
        };
      });
      console.log('before', categoryTable)
      console.log(categoryTable[0])
      console.log(compareDebug)
      // categoryTable.sort((a, b) => { compareNames(a,b); });
      categoryTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      console.log('after', categoryTable)
      // console.log('after foo', foo)

      compareDebug = false;

      console.log("categoryTable:", categoryTable)
      return categoryTable;
  }
}

async function dalGetSubcategoryTable() {
  let subcategoryTable;
  let subcategoryTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return subcategoryTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      subcategoryTableRaw = await dalGetTable('Subcategories', base);
      subcategoryTable = subcategoryTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'categoryId' : record.get('Category'),
          'name' : record.get('Name'),
          'name_es' : record.get('Name-ES'),
        };
      });
      // subcategoryTable.sort((a, b) => { compareNames(a,b); });
      subcategoryTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      return subcategoryTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER subcategory')
      subcategoryTableRaw = await dalGetTableSwagger('Subcategory');
      subcategoryTable = subcategoryTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'categoryId' : record.category,
          'name' : record.name,
          'name_es' : record.nameSpanish,
        };
      });
      // subcategoryTable.sort((a, b) => { compareNames(a,b); });
      subcategoryTable.sort((a,b) => (a.name > b.name) ? 1:-1);
      console.log("subcategoryTable:", subcategoryTable)
      return subcategoryTable;
  }
}

async function dalGetCatSubcatTable() {
  let catSubcatTable;
  let catSubcatTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return catSubcatTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      catSubcatTableRaw = await dalGetTable('CatSubcats', base);
      catSubcatTable = catSubcatTableRaw.map(function(record) {
        let catSubcatId = record.id;
        let catSubcatName = record.get('Name');

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
      console.log('SWAGGER catSubcat')
      catSubcatTableRaw = await dalGetTableSwagger('CatSubcat');
      catSubcatTable = catSubcatTableRaw.map(function(record) {
        let catSubcatId = record.id;
        let catSubcatName = record.name;
        let categoryId = record.categoryId;
        categoryId = categoryId[0];

        let subcategoryId = record.subcategoryId;
        let subcategoryName;
        let subcategoryNameSpanish;
        if (subcategoryId) {
          subcategoryId = subcategoryId[0];
          subcategoryName = record.subcategoryString[0];
          subcategoryNameSpanish = record.subcategoryNameSpanish[0];
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
      console.log("catSubcatTableRaw:", catSubcatTableRaw)
      console.log("catSubcatTableCached:", catSubcatTableCached)
      console.log("catSubcatTable:", catSubcatTable)

      console.log("catSubcatTableRaw:", catSubcatTableRaw[0])
      console.log("catSubcatTableCached:", catSubcatTableCached[0])
      console.log("catSubcatTable:", catSubcatTable[0])
      // return catSubcatTableCached;
      return catSubcatTable;
  }
}

async function dalGetCityTable() {
  let cityTable;
  let cityTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return cityTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      cityTableRaw = await dalGetTable('Cities', base);
      cityTable = cityTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'name' : record.get('Name'),
        };
      });
      return cityTable;
    case accessMethods.SWAGGER:
      console.log('SWAGGER cities')
      // cityTableRaw = await dalGetTableSwagger('Cities');
      cityTableRaw = await dalGetTableSwagger('City');
      console.log("cityTableRaw", cityTableRaw)
      cityTable = cityTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'name' : record.name,
        };
      });
      console.log('cityTable', cityTable)
      return cityTable;
      // return cityTableCached;
  }
}

async function dalGetAlertTable() {
  let alertTable;
  let alertTableRaw;
  switch(accessMethod) {
    case accessMethods.STATIC:
      console.log('STATIC');
      return alertTableCached;
    case accessMethods.AIRTABLE_JS:
      console.log('AIRTABLE_JS')
      alertTableRaw = await dalGetTable('Alerts', base);
      alertTable = alertTableRaw.map(function(record) {
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
      alertTableRaw = await dalGetTableSwagger('Alerts', base);
      alertTable = alertTableRaw.map(function(record) {
        return {
          'id' : record.id,
          'title' : record.title,
          'start_date' : record.startDate,
          'end_date' : record.endDate,
          'note' : record.notes,
        };
      });
      console.log('alertTable:', alertTable)
      return alertTable;
      // return alertTableCached;
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

// curl "https://littlehelpbook.com/Category" -H  "accept: text/plain"
function dalGetTableSwagger(tablename) {
  return new Promise(function(resolve) {
    let data;
    jQuery.ajax({
      url: swaggerUrl + tablename,
      headers: {
        'accept': 'text/plain'
      },
      type: 'GET',
      success: function (response) {
        resolve(response);
      },
      error: function() {
        console.log('Error loading db.');
      }
    });
  })
}

// function compareNames(a, b) {
//   let aName = a.name.toLowerCase();
//   let bName = b.name.toLowerCase();
//   let result = 0;
//   if(aName < bName) { result = -1; }
//   else if(aName > bName) { result = 1; }
//   if (compareDebug) {
//     console.log(aName, '-', bName, result)
//   }
//   return result;
// }

// function compareNamesOrig(a, b) {
//   let aName = a.get('Name').toLowerCase();
//   let bName = b.get('Name').toLowerCase();
//   let result = 0;
//   if(aName < bName) { result = -1; }
//   else if(aName > bName) { result = 1; }
//   if (compareDebug) {
//     console.log(aName, '-', bName, result)
//   }
//   return result;
// }