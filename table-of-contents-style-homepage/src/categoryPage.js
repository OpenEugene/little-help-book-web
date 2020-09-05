const cityboxId = "citySelect";
const catboxId = "catSelect";
const subcatboxId = "subcatSelect";
var cityTable;
var categoryTable;
var subcatTable;
var placeTable;
var nbc;
let categoryTree;
let selectedCategory;
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
        categoryTable = await dalGetCategoryTable();
        subcatTable = await dalGetSubcategoryTable();
        placeTable = await dalGetPlaceTable();

        selectedCategory = categoryTable[0].id;

        cityTable.splice(0, 0, {id: "NA", name: "All"})
        categoryTable.splice(0, 0, {id: "NA", name: "All"});
        subcatTable.splice(0, 0, {id: "NA", name: "All"});

        nbc = new NavBreadcrumb(cityTable, categoryTable, subcatTable, placeTable);

        /*
        Generate and place option element HTML to place into each appropriate
        select box, based on the data that was passed into our NavBreadcrumb object.
        */
        nbc.placeOptionElements(cityboxId, nbc.generateOptionElements(nbc.cities));
        nbc.placeOptionElements(catboxId, nbc.generateOptionElements(nbc.categories));
        nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.subcats));

        // Assign the appropriate events handlers to the select elements
        nbc.assignCitySelectEvent(cityboxId, citySelectEvent);
        nbc.assignCategorySelectEvent(catboxId, categorySelectEvent);
        nbc.assignSubcatSelectEvent(subcatboxId, subcatSelectEvent);

        catSubcatTable = await dalGetCatSubcatTable();
        categoryTree = await dalGetCategoryTable();
        categoryTree = tocMakeCategoryTreeAll(categoryTree, catSubcatTable, placeTable);
        updateDom();
        console.log(categoryTable)
    })()
});

// functions used to generate the service tiles using the data.
// These functions were moved from generateServiceTile.js
function generateServiceTiles(objArray) {
    let objString = "";
    for (let i = 0; i < objArray.length; i++) {
        objString += generateServiceTile(objArray[i]);
    }
    return objString;
}

// Create the appropriate event handlers for the select elements.
function citySelectEvent() {
    // find the city by id, and set the focused city to it.
    nbc.focused.city = nbc.cities.find(x => x.id === this.value).id;
    // Reset the category selection back to "Select Category" when new city is selected.
    nbc.focused.category = "NA";
    // Reset the subcat selection back to all when city is changed.
    nbc.focused.subcat = "NA";
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    // Change available categories to select from when city changes
    nbc.availableCategories = nbc.filterCategoryOptions();
    nbc.placeOptionElements(catboxId, nbc.generateOptionElements(nbc.availableCategories));
    nbc.availableSubcats = nbc.filterSubcatOptions();
    nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));

    const categoryTree = tocMakeCategoryTreeAll(categoryTable, catSubcatTable, placeTable);

    updateDom();
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }
}
function categorySelectEvent() {
    // find the category by id, and set the focused category to it.
    nbc.focused.category = nbc.categories.find(x => x.id === this.value).id;
    // Reset the subcat selection back to all when category is changed.
    nbc.focused.subcat = "NA";
    nbc.availableSubcats = nbc.filterSubcatOptions();
    console.log(nbc.availableSubcats);
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));
    updateDom();
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }
}
function subcatSelectEvent() {
    //find the subcategory by id, and set the focused subcatgory to it.
    nbc.focused.subcat = nbc.subcats.find(x => x.id === this.value).id;
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    document.getElementsByClassName("category-page-name")[0].innerHTML = nbc.subcats.find(x => x.id === this.value).name;
    updateDom();
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }
}

function updateDom() {
    let categoryBranch = categoryTree.find(category => category.id == selectedCategory);
    // Grab the template script
    let theTemplateScript = $("#provider-list-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    let compiledHtml = theTemplate({subcategories : categoryBranch.subcategories});
    // Add the compiled html to the page
    $('#provider-list').empty().append(compiledHtml);
}
