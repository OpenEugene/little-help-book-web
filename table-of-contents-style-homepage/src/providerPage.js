let placeId;
"use strict"
$(document).ready(() => {initData(true, true, true); loadProviderInfo();});

function loadProviderInfo() {
    let urlParams = new URLSearchParams(window.location.search);
    placeId = (urlParams.has('place') ? urlParams.get('place') : 'NA');
    replaceEvents();
    updateDom();
}

function replaceEvents() {
    let citybox = document.getElementById(cityboxId);
    let catbox = document.getElementById(catboxId);
    let subcatbox = document.getElementById(subcatboxId);

    citybox.removeEventListener("change", citySelectEvent);
    catbox.removeEventListener("change", categorySelectEvent);
    subcatbox.removeEventListener("change", subcatSelectEvent);

    citybox.addEventListener("change", redirect);
    catbox.addEventListener("change", redirect);
    subcatbox.addEventListener("change", redirect);
}

function redirect() {
    let cityValue = document.getElementById(cityboxId).value;
    let catValue = document.getElementById(catboxId).value;
    let subcatValue = document.getElementById(subcatboxId).value;
    let proto = window.location.protocol;
    let host = "";
    let filepath = "";
    let params = "?city=" + cityValue + "&category=" + catValue + "&subcategory=" + subcatValue;
    let isFile = proto == "file:";

    if (isFile) {
        host = window.location.pathname.replace("/provider.html", "");
    } else {
        filepath = "/table-of-contents-style-homepage";
        host = window.location.hostname;
    }
    if (this.id == cityboxId || this.id == catboxId) {
        filepath += "/category.html";
    } else {
        filepath += "/subcategory.html";
    }
    if (isFile) {
        window.location.replace(proto + "//" + host + filepath + params);
    } else {
        window.location.replace(filepath + params);
    }
}

function updateDom() {
    /*
    let availableCatSubcatIds = [];
    let catSubcatPlaces = []
    nbc.availablePlaces.forEach(record => {
        record.catSubcatId.forEach(id => {
            if (!availableCatSubcatIds.includes(id)) {
                availableCatSubcatIds.push(id);
                catSubcatPlaces.push([record]);
            } else {
                let index = availableCatSubcatIds.findIndex(value => value == id);
                catSubcatPlaces[index].push(record);
            }
        })
    });
    let availableCatSubcats = [];
    catSubcatTable.forEach(record => {
        let proceed = true;
        if (nbc.focused.category != 'NA') {
            proceed = false;
            if (record.categoryId == nbc.focused.category) {
                proceed = true;
            }
            if (proceed) {
                if (nbc.focused.subcat != 'NA') {
                    proceed = false;
                    if (record.subcategoryId == nbc.focused.subcat) {
                        proceed = true;
                    }
                }
            }
        } else {
            // This else clause is for the case where category is set to "All", and subcategory isn't, i.e.
            // is set to something specific.
            if (nbc.focused.subcat != 'NA') {
                proceed = false;
                if (record.subcategoryId == nbc.focused.subcat) {
                    proceed = true;
                }
            }
        }
        if (proceed) {
            if (availableCatSubcatIds.includes(record.catSubcatId)) {
                let index = availableCatSubcatIds.findIndex(value => value == record.catSubcatId);
                record.places = catSubcatPlaces[index];
                availableCatSubcats.push(record);
            }
        }
    });
    */

    // Pasted from Airtable API for retrieving one provider record
    let providerData = placeTable.find(x => x.id === placeId);

    // Handlebars boilerplate
    // Grab the template script
    let theTemplateScript = $("#provider-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    let compiledHtml = theTemplate({ place: providerData });
    // Add the compiled html to the page
    $('#provider-info').empty().append(compiledHtml);

    if (nbc.mymap != null) {
        setMarkers([providerData]);
        setView([providerData.latitude, providerData.longitude]);
    }
}

// upon pressing print create a PDF and open the printer dialog box
let printButton = document.querySelector("#print");

printButton.addEventListener("click", display);

function display() {
    window.print();
}