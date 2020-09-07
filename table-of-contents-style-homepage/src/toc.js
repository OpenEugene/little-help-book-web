"use strict"
function tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable, selectedCity) {
  let categoryTree = tocMakeCategoryTree(categoryTable, catSubcatTable, selectedCity);
  //
  // PROVIDERS
  //
  categoryTree.forEach(function(catRecord) {
    catRecord.subcategories.forEach(function(subcatRecord) {
      // The only records that shouldn't pass this condition are the no-subcategory buckets that are empty.
      if (subcatRecord.catSubcatId) {
        let placesFiltered = placeTable.filter(placeRecord => placeRecord.catSubcatId.includes(subcatRecord.catSubcatId));
        subcatRecord.places = placesFiltered;
      }
    });
  });
  return categoryTree;
}

function tocMakeCategoryTree(categoryTable, catSubcatTable, selectedCity) {
  //
  // CATEGORIES
  //
  // console.log('tocMergeTables BEGIN');
  // Initialize a no-subcategory subcategory bucket for places with no subcategories at index 0.
  let categoryTree = [];
  categoryTable.forEach(function(record) {
    let noneSubcategoryRecord;
    noneSubcategoryRecord = {'catSubcatId' : undefined, 'catSubcatName' : undefined, 'categoryId' : record.id, 'subcategoryId' : undefined, 'name' : 'No subcategories', 'nameSpanish' : 'No hay subcategorias', 'places' : [], 'selectedCity' : selectedCity};
    record.selectedCity = selectedCity;
    record.subcategories = [];
    record.subcategories.push(noneSubcategoryRecord);
    categoryTree.push(record);
  });
  // let categoryTree = categoryTable;
  //
  // SUBCATEGORIES
  //
  // console.log('*** Processing subcategories');
  // Fold into the Category table
  catSubcatTable.forEach(function(record) {
    let categoryId = record.categoryId;
    if (categoryId) {
      let categoryIndex = categoryTree.findIndex(category => category.id == categoryId);

      let subcategoryId = record.subcategoryId;
      if (subcategoryId) {
        record.selectedCity = selectedCity;
        categoryTree[categoryIndex].subcategories.push(record);
      }
      else {
        categoryTree[categoryIndex].subcategories[0].catSubcatId = record.catSubcatId;
        categoryTree[categoryIndex].subcategories[0].catSubcatName = record.catSubcatName;
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });
  // console.log('tocMergeTables END');
  // console.log(categoryTree)
  return categoryTree;
}