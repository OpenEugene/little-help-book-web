"use strict"
$(document).ready(function() {
  const Airtable = require('airtable');

  // Read-only key
  const apiKey = "keyMmAL4mVBSORkGc";
  // const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');
  // Experimental table
  const base = new Airtable({apiKey: apiKey}).base('appLwxkByQzFlBeVo');

  // await has to be inside async function, anonymous in this case
	(async () => {
    const categoryTable = await dalGetCategoryTable(base);
    const catSubcatTable = await dalGetCatSubcatTable(base);
    const placeTable = await dalGetPlaceTable(base);
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
