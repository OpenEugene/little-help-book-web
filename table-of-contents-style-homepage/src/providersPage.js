const cityboxId = "citySelect";
const catboxId = "catSelect";
const subcatboxId = "subcatSelect";
var cityTable;
var categoryTable;
var subcatTable;
var placeTable;
var nbc;
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

        /*
        Look at the URL search parameters. If they exist, pull them in and use
        them to inform the initial data on the page.
        */
        let urlParams = new URLSearchParams(window.location.search);
        let cityValue = (urlParams.has('city') ? urlParams.get('city') : 'NA');
        let categoryValue = (urlParams.has('category') ? urlParams.get('category') : 'NA');
        let subcatValue = (urlParams.has('subcategory') ? urlParams.get('subcategory') : 'NA');

        // Show the city-category-subcategory from the query in the navigation
        document.getElementById(cityboxId).value = cityValue;
        citySelectEvent();
        document.getElementById(catboxId).value = categoryValue;
        categorySelectEvent();
        document.getElementById(subcatboxId).value = subcatValue;
        subcatSelectEvent();

        $('#loading-placeholder').empty();
    })()
});

// Create the appropriate event handlers for the select elements.
function citySelectEvent() {
    // find the city by id, and set the focused city to it.
    nbc.focused.city = nbc.cities.find(x => x.id === document.getElementById(cityboxId).value).id;
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
    updateDom();
}

function categorySelectEvent() {
    // find the category by id, and set the focused category to it.
    nbc.focused.category = nbc.categories.find(x => x.id === document.getElementById(catboxId).value).id;
    // Reset the subcat selection back to all when category is changed.
    nbc.focused.subcat = "NA";
    nbc.availableSubcats = nbc.filterSubcatOptions();
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));
    updateDom();
}

function subcatSelectEvent() {
    //find the subcategory by id, and set the focused subcategory to it.
    nbc.focused.subcat = nbc.subcats.find(x => x.id === document.getElementById(subcatboxId).value).id;

    //Update the category when chosing a subcategory - primarily for when category is "All"
    if (nbc.focused.subcat != "NA") {
        let catSubcatRecord = catSubcatTable.find(x => x.subcategoryId == nbc.focused.subcat);
        let catId = catSubcatRecord.categoryId;
        //Update the category listbox
        document.getElementById(catboxId).value = catId;
        nbc.focused.category = catId;
    }

    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    updateDom();
}

function updateDom() {
    // Grab the template script
    let theTemplateScript = $("#provider-tiles-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);

    let filteredPlaces = nbc.availablePlaces.filter(record => record.name[0].toLowerCase() >= '0' && record.name[0].toLowerCase() <= '9')
    // Pass our data to the template
    let compiledHtml = theTemplate({places : filteredPlaces});
    // Add the compiled html to the page
    $('#num-providers').empty().append(compiledHtml);

    for(let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i += 1) {
        let theLetter = String.fromCharCode(i);
        console.log(theLetter)
        filteredPlaces = nbc.availablePlaces.filter(record => record.name[0].toLowerCase() === theLetter);
        // Pass our data to the template
        compiledHtml = theTemplate({places : filteredPlaces});
        // Add the compiled html to the page
        $('#'+theLetter+'-providers').empty().append(compiledHtml);
    }
    // for(let theLetter = 'a'; theLetter <= 'z'; theLetter += 1) {
    //     console.log(theLetter)
    // }
}

Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,550);
    return new Handlebars.SafeString(theString)
});