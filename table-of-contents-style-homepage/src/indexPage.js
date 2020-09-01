var cityTable;
var categoryTable;
var subcatTable;
var placeTable;
var nbc;
var categoryTree;
var catSubcatTable;
var savedHtml;
"use strict"
$(document).ready(function() {
  // await has to be inside async function, anonymous in this case
    (async () => {
        /*
        Pull data from Airtable using the dal.js functions.
        Also, populate additional elements at the top of each list to
        represent an option to not filter on that item.
        */
        cityTable = await dalGetCityTable();
        cityTable.splice(0, 0, {id: "NA", name: "Find my City"})

        categoryTable = await dalGetCategoryTable();
        subcatTable = await dalGetSubcategoryTable();
        placeTable = await dalGetPlaceTable();
        nbc = new NavBreadcrumb(cityTable, categoryTable, subcatTable, placeTable);

        /*
        Generate and place option element HTML to place into each appropriate
        select box, based on the data that was passed into our NavBreadcrumb object.
        */
        nbc.placeOptionElements("citySelect", nbc.generateOptionElements(nbc.cities));
        // Assign the appropriate events handlers to the select elements
        // nbc.assignCitySelectEvent(cityboxId, citySelectEvent);

        catSubcatTable = await dalGetCatSubcatTable();
        categoryTree = tocMakeCategoryTree(categoryTable, catSubcatTable);

        /*
        Save the hard-coded stuff to prepend later
        */
        savedHtml = $('#table-of-contents').html();
        updateDomToc(categoryTree, savedHtml);
    })()
});

function updateDomToc(categoryTree, savedHtml) {
    // Grab the template script
    let theTemplateScript = $("#table-of-contents-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    let compiledHtml = theTemplate({categories : categoryTree});
    // Add the compiled html to the page
    $('#table-of-contents').empty().append(compiledHtml);
    // Add the saved bits to the end
    $('#table-of-contents').append(savedHtml);
}
