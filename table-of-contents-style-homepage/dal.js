
"use strict"
async function dalGetCategoryTable(base) {
  const categoryTableRaw = await dalGetTable('Categories', base);
  categoryTableRaw.sort((a, b) => (a.get('Order') - b.get('Order')));
  let categoryTable = categoryTableRaw.map(function(record) {
    let categoryName = record.get('Name');
    let categoryId = record.id;
    return {
      'Id' : categoryId, 'Name' : categoryName, 'NameSpanish' : record.get('Name-ES'), 'Order' : record.get('Order'), 'Subcategories' : []
    };
  });
  return categoryTable;
}

async function dalGetSubcategoryTable(base) {
  const subcategoryTable = await dalGetTable('Subcategories', base);
  return subcategoryTable;
}

async function dalGetCatSubcatTable(base) {
  const catSubcatTableRaw = await dalGetTable('CatSubcats', base);
  catSubcatTableRaw.sort((a, b) => (a.get('Order') - b.get('Order')));
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
      'CatSubcatId': catSubcatId, 'CatSubcatName': catSubcatName, 'CategoryId' : categoryId, 'SubcategoryId' : subcategoryId, 'Name' : subcategoryName, 'NameSpanish' : subcategoryNameSpanish, 'Order' : record.get('Order'), 'Places' : []
    };
  });
  return catSubcatTable;
}

async function dalGetPlaceTable(base) {
  const placeTableRaw = await dalGetTable('Help Services', base);
  placeTableRaw.sort(function(a, b){
    if(a.Name < b.Name) { return -1; }
    if(a.Name > b.Name) { return 1; }
    return 0;
  });
  const placeTable = placeTableRaw;
  return placeTable;
}

function dalGetTable(tablename, base) {
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
