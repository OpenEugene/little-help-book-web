const cityboxId = "citySelect";
const catboxId = "catSelect";
const subcatboxId = "subcatSelect";
const cityboxMobId = "citySelect-mobile";

const spanishStr = "Español";
const englishStr = "English";
const spanishCode = "es";
const englishCode = "en";
const localStorageLangVar = "lhbLang";
const localStorageNavVar = {city: "city", cat: "cat", subcat: "subcat"}

var nbc;
var catSubcatTable;
var availData = {cat: false, subcat: false};
"use strict"
async function initData(hasCat, hasSubcat, hasMap) {
    if (!localStorage.getItem(localStorageLangVar)) {
        localStorage.setItem(localStorageLangVar, englishCode);
    }
    // await has to be inside async function, anonymous in this case
    await (async () => {
        /*
        Pull data from Airtable using the dal.js functions.
        Also, populate additional elements at the top of each list to
        represent an option to not filter on that item.
        */
        availData.cat = hasCat;
        availData.subcat = hasSubcat;
        let cityTable = await dalGetCityTable();
        let categoryTable = await dalGetCategoryTable();
        let subcatTable = await dalGetSubcategoryTable();
        let placeTable = await dalGetPlaceTable();

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

        /*
        Look at the URL search parameters. If they exist, pull them in and use
        them to inform the initial data on the page.
        */
        let urlParams = new URLSearchParams(window.location.search);
        let hasSearch = urlParams.has("search");
        if (hasSearch) {
            let searchParams = urlParams.get("search");
            nbc.availablePlaces = filterSearch(searchParams.replaceAll("%20", " "), nbc.places);
            nbc.focused.subcat = "Search";
        } else {
            let cityValue = 'NA';
            if (urlParams.has('city')) {
                cityValue = urlParams.get('city');
            }
            else {
                let tempCity = localStorage.getItem(localStorageNavVar.city);
                if (tempCity) {
                    cityValue = tempCity;
                }
            }
            // Show the city-category-subcategory from the query in the navigation
            document.getElementById(cityboxId).value = cityValue;
            nbc.focused.city = cityValue;
            localStorage.setItem(localStorageNavVar.city, cityValue);
            nbc.availablePlaces = nbc.filterOnCity(nbc.places);
            nbc.availableCategories = nbc.filterCategoryOptions();
            if (hasCat) {
                nbc.placeOptionElements(catboxId, nbc.generateOptionElements(nbc.availableCategories));   
            }

            let categoryValue = 'NA';
            if (hasCat) {
                if (urlParams.has('category')) {
                    categoryValue = urlParams.get('category');
                }
                else {
                    let temp = localStorage.getItem(localStorageNavVar.cat);
                    if (temp) {
                        categoryValue = temp;
                    }
                }
            }
            nbc.focused.category = categoryValue;
            localStorage.setItem(localStorageNavVar.cat, categoryValue);
            nbc.availablePlaces = nbc.filterOnCategory(nbc.availablePlaces);
            nbc.availableSubcats = nbc.filterSubcatOptions();
            if (availData.subcat) {
                nbc.placeOptionElements(subcatboxId, nbc.generateOptionElements(nbc.availableSubcats));
            }

            let subcatValue = 'NA';
            if (hasSubcat) {
                if (urlParams.has('subcategory')) {
                    subcatValue = urlParams.get('subcategory');
                }
                else {
                    let temp = localStorage.getItem(localStorageNavVar.subcat);
                    if (temp) {
                        subcatValue = temp;
                    }
                }
            }
            nbc.focused.subcat = subcatValue;
            localStorage.setItem(localStorageNavVar.subcat, subcatValue);
            nbc.availablePlaces = nbc.filterOnSubcat(nbc.availablePlaces);
            document.getElementById(cityboxId).value = cityValue;
            if (hasCat) {
                document.getElementById(catboxId).value = categoryValue;
            }
            if (hasSubcat) {
                document.getElementById(subcatboxId).value = subcatValue;
            }
        }
        updateDom();
        setLanguage();
    })();
}

function initLanguage() {
    nbc.places.forEach(function(record) {
        record["hours_en"] = record["hours"];
        record["name_en"] = record["name"];
        record["description_en"] = record["description"];
    });
    nbc.categories.forEach(function(record) {
        record["name_en"] = record["name"];
    });
    nbc.subcats.forEach(function(record) {
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
    let languageCode = localStorage.getItem(localStorageLangVar);
    newLanguageCode = englishCode;
    if (languageCode == englishCode) {
        newLanguageCode = spanishCode;
    }
    localStorage.setItem(localStorageLangVar, newLanguageCode);
    setLanguage();
}

function setLanguage() {
    let languageCode = localStorage.getItem(localStorageLangVar);
    let buttonStr = englishStr
    if (languageCode == 'en') {
        buttonStr = spanishStr
    }
    theButton.innerHTML = buttonStr;

    nbc.places.forEach(function(record) {
        record["hours"] = record["hours"+"_"+languageCode];
        // record["name"] = record["name"+"_"+languageCode];
        record["description"] = record["description"+"_"+languageCode];
    });
    nbc.categories.forEach(function(record) {
        record["name"] = record["name"+"_"+languageCode];
    });
    nbc.subcats.forEach(function(record) {
        record["name"] = record["name"+"_"+languageCode];
    });
    catSubcatTable.forEach(function(record) {
        record["name"] = record["name"+"_"+languageCode];
    });
    updateDom();
}

// Create the appropriate event handlers for the select elements.
function citySelectEvent() {
    nbc.focused.city = nbc.cities.find(x => x.id === document.getElementById(this.id).value).id;
    // Reset the category selection back to "Select Category" when new city is selected.
    nbc.focused.category = "NA";
    // Reset the subcat selection back to all when city is changed.
    nbc.focused.subcat = "NA";

    localStorage.setItem(localStorageNavVar.city, nbc.focused.city);
    localStorage.setItem(localStorageNavVar.cat, nbc.focused.category);
    localStorage.setItem(localStorageNavVar.subcat, nbc.focused.subcat);
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
    localStorage.setItem(localStorageNavVar.cat, nbc.focused.category);
    localStorage.setItem(localStorageNavVar.subcat, nbc.focused.subcat);
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
        localStorage.setItem(localStorageNavVar.subcat, nbc.focused.subcat);
    }

    /*
    This function chain checks for a selected city, category and subcategory.
    It then will filter the list of places on the selected items.
    */
    nbc.availablePlaces = nbc.filterOnSubcat(nbc.filterOnCategory(nbc.filterOnCity(nbc.places)));
    updateDom();
}