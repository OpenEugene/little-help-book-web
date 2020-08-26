"use strict"
function tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable) {
  let categoryTree = tocMakeCategoryTree(categoryTable, catSubcatTable);
  //
  // PROVIDERS
  //
  console.log('*** Processing places');
  // Fold into the Category table
  placeTable.forEach(function(record) {
    let categoryId = record.category;
    if (categoryId) {
      let categoryIndex = categoryTree.findIndex(category => category.id == categoryId);
      if (categoryIndex >= 0) {
        let subcategoryId = record.subcategory;
        if (subcategoryId) {
          let subcategoryIndex = categoryTree[categoryIndex].subcategories.findIndex(subcategory => subcategory.subcategoryId == subcategoryId);
          if (subcategoryIndex >= 0) {
            categoryTree[categoryIndex].subcategories[subcategoryIndex].places.push(record);
          } else {
            console.log('no subcategory index', record.name, subcategoryId, "THIS SHOULDN'T OCCUR");
          }
        } else {
          console.log('no subcategory id', record.name);
          let subcategoryIndex = 0;
          categoryTree[categoryIndex].subcategories[subcategoryIndex].places.push(record);
        }
      } else {
        console.log('no category index', record.name, "THIS SHOULDN'T OCCUR");
      }
    } else {
      console.log('no category id', record.name, "THIS SHOULDN'T OCCUR");
    }
  });

  // console.log(categoryTree);
  return categoryTree;
}

function tocMakeCategoryTree(categoryTable, catSubcatTable) {
  //
  // CATEGORIES
  //
  console.log('tocMergeTables BEGIN');
  // Initialize a no-subcategory subcategory bucket for places with no subcategories at index 0.
  categoryTable.forEach(function(record) {
    let noneSubcategoryRecord;
    noneSubcategoryRecord = {'categoryId' : record.id, 'subcategoryId' : undefined, 'name' : 'No subcategories', 'nameSpanish' : 'No hay subcategorias', 'order' : 0, 'places' : []};
    // console.log('record.subcategories', record.subcategories);
    record.subcategories = [];
    record.subcategories.push(noneSubcategoryRecord);
  });
  let categoryTree = categoryTable;
  //
  // SUBCATEGORIES
  //
  console.log('*** Processing subcategories');
  // Fold into the Category table
  catSubcatTable.sort((a, b) => (a.order - b.order));
  catSubcatTable.forEach(function(record) {
    let categoryId = record.categoryId;
    if (categoryId) {
      let subcategoryId = record.subcategoryId;
      if (subcategoryId) {
        let categoryIndex = categoryTree.findIndex(category => category.id == categoryId);
        // console.log(categoryIndex, record.Name);
        // console.log("pushing", record.catSubcatName, categoryTree[categoryIndex].subcategories.length);
        categoryTree[categoryIndex].subcategories.push(record);
        // console.log("  ", categoryTree[categoryIndex].subcategories.length);
      } else {
        categoryTree[0].subcategories.catSubcatId = record.catSubcatId;
        categoryTree[0].subcategories.catSubcatName = record.catSubcatName;
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });
  // console.log(categoryTree);
  console.log('tocMergeTables END');
  return categoryTree;
}
