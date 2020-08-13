"use strict"
$(document).ready(function() {
  // await has to be inside async function, anonymous in this case
	(async () => {
    const categoryTable = await dalGetCategoryTable();
    const catSubcatTable = await dalGetCatSubcatTable();
    const placeTable = await dalGetPlaceTable();
    console.log(categoryTable);

    const categoryTree = tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable);
    initDomAll(categoryTree);
	})()
});

function initDomAll(categoryTree) {
  let html = categoryTree.reduce(function (accum, record) {
    accum += `<h3>${record.Name} ${record.NameSpanish}, ${record.Order}, ${record.Subcategories.length}</h3>`;
    accum += record.Subcategories.reduce(function(accum, record) {
      if (record.Places.length > 0) {
        accum += `<p><b>${record.Name} - ${record.NameSpanish}, ${record.Order}, ${record.Places.length}</b></p>`;
        accum += record.Places.reduce(function(accum, record) {
          return accum + `${record.Name}<br>`;
        }, '');
      }
      return accum;
    }, '');
    return accum;
  }, '');
  $("#all").append(html);
}
