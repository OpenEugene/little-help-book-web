"use strict"
$(document).ready(initData(true, true, true));

function updateDom() {
    // Change the subcategory focused in the body
    document.getElementsByClassName("category-page-name")[0].innerHTML = nbc.subcats.find(x => x.id === nbc.focused.subcat).name;

    // If a map is passed into the navigation class, update the markers
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }

    // Grab the template script
    let theTemplateScript = $("#provider-tiles-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    let compiledHtml = theTemplate({places : nbc.availablePlaces});
    // Add the compiled html to the page
    $('#provider-tiles').empty().append(compiledHtml);
}

Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,550);
    return new Handlebars.SafeString(theString)
});