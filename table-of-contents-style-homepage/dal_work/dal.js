"use strict"

const Airtable = require('airtable');
// Read-only key
const apiKey = "keyMmAL4mVBSORkGc";
// Experimental table
// const base = new Airtable({apiKey: apiKey}).base('appLwxkByQzFlBeVo');
// Production table
const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');

// async function dalGetPlaceTable(base) {
async function dalGetPlaceTable() {
  const placeTableRaw = await dalGetTable('Help Services', base);
  placeTableRaw.sort(function(a, b){
    if(a.Name < b.Name) { return -1; }
    if(a.Name > b.Name) { return 1; }
    return 0;
  });
  let placeTable = placeTableRaw.map(function(record) {
    return {
      'Id' : record.id,
      'Name' : record.get('Name'),
      'NameSpanish' : record.get('Name-ES'),
      'Category' : record.get('Category'),
      'Subcategory' : record.get('Subcategory'),
      'Phone' : record.get('Phone'),
      'Address' : record.get('Physical Address'),
      'Latitude' : record.get('Latitude'),
      'Longitude' : record.get('Longitude'),
      'URL' : record.get('Web Address'),
      'Email' : record.get('Email Address'),
      'Hours' : record.get('Hours of Operation'),
      'Description' : record.get('Description')
    };
  });
  return placeTable;
}

// async function dalGetCategoryTable(base) {
async function dalGetCategoryTable() {
  const categoryTableRaw = await dalGetTable('Categories', base);
  categoryTableRaw.sort((a, b) => (a.get('Order') - b.get('Order')));
  let categoryTable = categoryTableRaw.map(function(record) {
    return {
      'Id' : record.id,
      'Name' : record.get('Name'),
      'NameSpanish' : record.get('Name-ES'),
      'Subcategories' : [],
      'Order' : record.get('Order')
    };
  });
  return categoryTable;
}

// async function dalGetSubcategoryTable(base) {
async function dalGetSubcategoryTable() {
  const subcategoryTableRaw = await dalGetTable('Subcategories', base);
  let subcategoryTable = subcategoryTableRaw.map(function(record) {
    return {
      'Id' : record.id,
      'Name' : record.get('Name'),
      'NameSpanish' : record.get('Name-ES'),
      'Order' : record.get('Order')
    };
  });
  return subcategoryTable;
}

// async function dalGetCatSubcatTable(base) {
async function dalGetCatSubcatTable() {
  const catSubcatTableRaw = await dalGetTable('CatSubcats', base);
  let catSubcatTable = catSubcatTableRaw.map(function(record) {
    let catSubcatName = record.get('Name');
    let catSubcatId = record.id;

    // !!!NOTE misspelling. Correct in table?
    // let categoryId = record.get('Catagory');
    let categoryId = record.get('Category');
    if (categoryId) {
      categoryId = categoryId[0];
    } else  {
      console.log('Subcategory', subcategory, 'has no category.', "THIS SHOULDN'T OCCUR");
    }

    let subcategoryId = record.get('Subcategory');
    let subcategoryName;
    let subcategoryNameSpanish;
    if (subcategoryId) {
      subcategoryId = subcategoryId[0];
      subcategoryName = record.get('SubcategoryString');
      subcategoryNameSpanish = record.get('Subcategory-ES')[0];
    } else {
      subcategoryName = 'No subcategories';
      subcategoryNameSpanish = 'No hay subcategorias';
    }
    return {
      'CatSubcatId': catSubcatId,
      'CatSubcatName': catSubcatName,
      'CategoryId' : categoryId,
      'SubcategoryId' : subcategoryId,
      'Name' : subcategoryName,
      'NameSpanish' : subcategoryNameSpanish,
      'Order' : record.get('Order'),
      'Places' : []
    };
  });
  return catSubcatTable;
}

// function dalGetTable(tablename, base) {
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
