const cityboxId = "citySelect";
const catboxId = "catSelect";
const subcatboxId = "subcatSelect";
const cityboxMobId = "citySelect-mobile";
var cityTable;
var categoryTable;
var subcatTable;
var placeTable;
var catSubcatTable;
var nbc;
var availData = {cat: false, subcat: false};
"use strict"
function initData(hasCat, hasSubcat, hasMap) {
  // await has to be inside async function, anonymous in this case
    (async () => {
        /*
        Pull data from Airtable using the dal.js functions.
        Also, populate additional elements at the top of each list to
        represent an option to not filter on that item.
        */
        availData.cat = hasCat;
        availData.subcat = hasSubcat;
        cityTable = await dalGetCityTable();
        categoryTable = await dalGetCategoryTable();
        subcatTable = await dalGetSubcategoryTable();
        placeTable = await dalGetPlaceTable();

        cityTable.splice(0, 0, {id: "NA", name: "Lane County, Oregon"});

        if (hasCat) {
            categoryTable.splice(0, 0, {id: "NA", name: "All Categories"});
        }
        if (hasSubcat) {
            subcatTable.splice(0, 0, {id: "NA", name: "All Services"});
        }

        // remove the Wildfire Support element from categories
        categoryTable = categoryTable.filter(x => x.id != "recxvFI6Cc7hpuYBi");
        // remove the Essential Crisis Lines element from categories
        categoryTable = categoryTable.filter(x => x.id !=  "recRckNwH09CWFAys");
       

        nbc = (hasMap) ?
            new NavBreadcrumb(cityTable, categoryTable, subcatTable, placeTable, mymap) :
            new NavBreadcrumb(cityTable, categoryTable, subcatTable, placeTable);

        /*
        Generate and place option element HTML to place into each appropriate
        select box, based on the data that was passed into our NavBreadcrumb object.
        */
        nbc.placeOptionElements(cityboxId, nbc.generateOptionElements(nbc.cities));

        // Assign the appropriate events handlers to the select elements
        nbc.assignCitySelectEvent(cityboxId, citySelectEvent);

        if (document.getElementById(cityboxMobId) != null) {
            nbc.placeOptionElements(cityboxMobId, nbc.generateOptionElements(nbc.cities));
            nbc.assignCitySelectEvent(cityboxMobId, citySelectEvent);
        }

        if (hasCat) {
            nbc.placeOptionElements(catboxId, nbc.generateOptionElements(nbc.categories));
            nbc.assignCategorySelectEvent(catboxId, categorySelectEvent);
        }

		if (hasSubcat) {
	        nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.subcats));
	        nbc.assignSubcatSelectEvent(subcatboxId, subcatSelectEvent);
		}

        catSubcatTable = await dalGetCatSubcatTable();

        initLanguage();
        console.log(placeTable);

        /*
        Look at the URL search parameters. If they exist, pull them in and use
        them to inform the initial data on the page.
        */
        let urlParams = new URLSearchParams(window.location.search);
        let cityValue = (urlParams.has('city') ? urlParams.get('city') : 'NA');
        let categoryValue;
        let subcatValue;

        // Show the city-category-subcategory from the query in the navigation
        document.getElementById(cityboxId).value = cityValue;
        citySelectEvent();
        

        if (hasCat) {
            categoryValue = (urlParams.has('category') ? urlParams.get('category') : 'NA')
            document.getElementById(catboxId).value = categoryValue;
            categorySelectEvent();
        }

        if (hasSubcat) {
            subcatValue = (urlParams.has('subcategory') ? urlParams.get('subcategory') : 'NA');
        	document.getElementById(subcatboxId).value = subcatValue;
        	subcatSelectEvent();
        }
    })()
}

function initLanguage() {
    placeTable.forEach(function(record) {
        record["hours_en"] = record["hours"];
        record["name_en"] = record["name"];
        record["description_en"] = record["description"];
    });
    categoryTable.forEach(function(record) {
        record["name_en"] = record["name"];
    });
    subcatTable.forEach(function(record) {
        record["name_en"] = record["name"];
    });
    catSubcatTable.forEach(function(record) {
        record["name_en"] = record["name"];
    });
}

let theButton = document.querySelector('#languageToggle');
theButton.addEventListener("click", toggleLanguage);

function toggleLanguage() {
    // console.log("toggleLanguage");
    const spanishStr = "Español";
    const englishStr = "English";
    const spanishCode = "es";
    const englishCode = "en";
    let buttonStr = theButton.innerHTML;

    let newLanguageCode = englishCode;
    let newLanguageStr = spanishStr;
    if (buttonStr == "Español") {
        newLanguageCode = spanishCode;
        newLanguageStr = englishStr;
    }
    theButton.innerHTML = newLanguageStr;

    placeTable.forEach(function(record) {
        record["hours"] = record["hours"+"_"+newLanguageCode];
        // record["name"] = record["name"+"_"+newLanguageCode];
        record["description"] = record["description"+"_"+newLanguageCode];
    });
    categoryTable.forEach(function(record) {
        record["name"] = record["name"+"_"+newLanguageCode];
    });
    subcatTable.forEach(function(record) {
        record["name"] = record["name"+"_"+newLanguageCode];
    });
    catSubcatTable.forEach(function(record) {
        record["name"] = record["name"+"_"+newLanguageCode];
    });

    updateDom();
}

// Create the appropriate event handlers for the select elements.
function citySelectEvent() {
    // find the city by id, and set the focused city to it.
    if (this.id == cityboxId) {
        nbc.focused.city = nbc.cities.find(x => x.id === document.getElementById(cityboxId).value).id;        
    }
    if (this.id == cityboxMobId) {
        nbc.focused.city = nbc.cities.find(x => x.id === document.getElementById(cityboxMobId).value).id;
    }

    // Reset the category selection back to "Select Category" when new city is selected.
    nbc.focused.category = "NA";
    // Reset the subcat selection back to all when city is changed.
    nbc.focused.subcat = "NA";
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    nbc.availableCategories = nbc.filterCategoryOptions();
    // Change available categories to select from when city changes
    if (availData.cat) {
        nbc.placeOptionElements(catboxId, nbc.generateOptionElements(nbc.availableCategories));   
    }
    nbc.availableSubcats = nbc.filterSubcatOptions();
    if (availData.subcat) {
        nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));   
    }
    updateDom();
}

function categorySelectEvent() {
    // find the category by id, and set the focused category to it.
    nbc.focused.category = nbc.categories.find(x => x.id === document.getElementById(catboxId).value).id;
    // Reset the subcat selection back to all when category is changed.
    nbc.focused.subcat = "NA";
    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    nbc.availableSubcats = nbc.filterSubcatOptions();
    if (availData.subcat) {
        nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));
    }
    updateDom();
}

function subcatSelectEvent() {
    //find the subcategory by id, and set the focused subcatgory to it.
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