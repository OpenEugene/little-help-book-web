"use strict"
function tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable) {
  let categoryTree = tocMakeCategoryTree(categoryTable, catSubcatTable);
  //
  // PROVIDERS
  //
  console.log('*** Processing places');
  // Fold into the Category table
  placeTable.forEach(function(record) {
    let categoryId = record.Category;
    if (categoryId) {
      let categoryIndex = categoryTree.findIndex(category => category.Id == categoryId);
      if (categoryIndex >= 0) {
        let subcategoryId = record.Subcategory;
        if (subcategoryId) {
          let subcategoryIndex = categoryTree[categoryIndex].Subcategories.findIndex(subcategory => subcategory.SubcategoryId == subcategoryId);
          if (subcategoryIndex >= 0) {
            categoryTree[categoryIndex].Subcategories[subcategoryIndex].Places.push(record);
          } else {
            console.log('no subcategory index', record.Name, subcategoryId, "THIS SHOULDN'T OCCUR");
          }
        } else {
          console.log('no subcategory id', record.Name);
          let subcategoryIndex = 0;
          categoryTree[categoryIndex].Subcategories[subcategoryIndex].Places.push(record);
        }
      } else {
        console.log('no category index', record.Name, "THIS SHOULDN'T OCCUR");
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });

  console.log(categoryTree);
  return categoryTree;
}

function tocMakeCategoryTree(categoryTable, catSubcatTable) {
  //
  // CATEGORIES
  //
  console.log('tocMergeTables BEGIN');
  // Initialize a no-subcategory subcategory bucket for places with no subcategories at index 0.
  let noneSubcategoryRecord;
  categoryTable.forEach(function(record) {
    noneSubcategoryRecord = {'CategoryId' : record.Id, 'SubcategoryId' : undefined, 'Name' : 'No subcategories', 'NameSpanish' : 'No hay subcategorias', 'Order' : 0, 'Places' : []};
    record.Subcategories.push(noneSubcategoryRecord);
  });
  let categoryTree = categoryTable;
  //
  // SUBCATEGORIES
  //
  console.log('*** Processing subcategories');
  // Fold into the Category table
  catSubcatTable.sort((a, b) => (a.Order - b.Order));
  catSubcatTable.forEach(function(record) {
    let categoryId = record.CategoryId;
    if (categoryId) {
      let subcategoryId = record.SubcategoryId;
      if (subcategoryId) {
        let categoryIndex = categoryTree.findIndex(category => category.Id == categoryId);
        // console.log(categoryIndex, record.Name);
        console.log("pushing", record.CatSubcatName, categoryTree[categoryIndex].Subcategories.length);
        categoryTree[categoryIndex].Subcategories.push(record);
        console.log("  ", categoryTree[categoryIndex].Subcategories.length);
      } else {
        categoryTree[0].Subcategories.CatSubcatId = record.CatSubcatId;
        categoryTree[0].Subcategories.CatSubcatName = record.CatSubcatName;
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });
  console.log(categoryTree);
  console.log('tocMergeTables END');
  return categoryTree;
}
