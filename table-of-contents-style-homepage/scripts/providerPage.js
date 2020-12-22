let placeId;
let cityId;
let catId;
let subcatId;
"use strict"
$(document).ready(init);

async function init() {
    loadProviderInfo();
    await initData(true, true, true);
    replaceEvents();
}

function loadProviderInfo() {
    let urlParams = new URLSearchParams(window.location.search);
    placeId = (urlParams.has('place') ? urlParams.get('place') : 'NA');
    cityId = (urlParams.has('city') ? urlParams.get('city') : 'NA');
    catId = (urlParams.has('category') ? urlParams.get('category') : 'NA');
    subcatId = (urlParams.has('subcategory') ? urlParams.get('subcategory') : 'NA');
    console.log("inside of loadProviderInfo");
}

function replaceEvents() {
    let citybox = document.getElementById(cityboxId);
    citybox.removeEventListener("change", citySelectEvent);
    citybox.addEventListener("change", redirect);

    let catbox = document.getElementById(catboxId);
    catbox.removeEventListener("change", categorySelectEvent);
    catbox.addEventListener("change", redirect);

    let subcatbox = document.getElementById(subcatboxId);
    subcatbox.removeEventListener("change", subcatSelectEvent);
    subcatbox.addEventListener("change", redirect);

    let cityboxMob = document.getElementById(cityboxMobId);
    cityboxMob.removeEventListener("change", citySelectEvent);
    cityboxMob.addEventListener("change", redirect);
}

function redirect() {
    let cityValue = document.getElementById(cityboxId).value;
    let catValue = (this.id != cityboxId) ? document.getElementById(catboxId).value : "NA";
    let subcatValue = (this.id == subcatboxId) ? document.getElementById(subcatboxId).value : "NA";
    localStorage.setItem("city", cityValue);
    localStorage.setItem("cat", catValue);
    localStorage.setItem("subcat", subcatValue);
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
    // Pasted from Airtable API for retrieving one provider record
    let providerData = nbc.places.find(x => x.id === placeId);

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
        if (providerData.latitude != 0 && providerData.latitude != null) {
            setView([providerData.latitude, providerData.longitude], 14);
        }
    }
}

// upon pressing print create a PDF and open the printer dialog box
let printButton = document.querySelector("#print");

printButton.addEventListener("click", display);

function display() {
    window.print();
}