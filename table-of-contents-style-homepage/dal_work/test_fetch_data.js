"use strict"
$(document).ready(function() {
  // await has to be inside async function, anonymous in this case
	(async () => {
    const categoryTable = await dalGetCategoryTable();
    const catSubcatTable = await dalGetCatSubcatTable();
    const placeTable = await dalGetPlaceTable();
    // console.log(categoryTable);

    const categoryTree = tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable);
    console.log('categoryTree', categoryTree);
    initDomAll(categoryTree);
	})()
});

function initDomAll(categoryTree) {
  let html = categoryTree.reduce(function (accum, record) {
    accum += `<h3>${record.name} ${record.nameSpanish}, ${record.subcategories.length}</h3>`;
    accum += record.subcategories.reduce(function(accum, record) {
      if (record.places.length > 0) {
        accum += `<p><b>${record.name} - ${record.nameSpanish}, ${record.places.length}</b></p>`;
        accum += record.places.reduce(function(accum, record) {
          return accum + `${record.name}<br>`;
        }, '');
      }
      return accum;
    }, '');
    return accum;
  }, '');
  $("#all").append(html);
}
