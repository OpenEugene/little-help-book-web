"use strict"
$(document).ready(function() {
  // await has to be inside async function, anonymous in this case
	(async () => {
    const categoryTable = await dalGetCategoryTable();
    const catSubcatTable = await dalGetCatSubcatTable();
    const placeTable = await dalGetPlaceTable();
    console.log(categoryTable);

    const categoryTree = tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable);
    initDomToc(categoryTree);
	})()
});

function initDomToc(categoryTree) {
  // Grab the template script
  let theTemplateScript = $("#table-of-contents-template").html();
  // Compile the template
  let theTemplate = Handlebars.compile(theTemplateScript);
  // Pass our data to the template
  let theCompiledHtml = theTemplate({categories : categoryTree});
  // Add the compiled html to the page
  $('#table-of-contents').prepend(theCompiledHtml);
}
