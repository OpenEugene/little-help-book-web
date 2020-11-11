"use strict"
$(document).ready(function() {
  // await has to be inside async function, anonymous in this case
    initData(true, true, false);
    $('#loading-placeholder').empty();
});

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

// This is to fix the alphabet selector on-screen when scrolling down the page:

window.onscroll = function() {classChange()};

function classChange() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 145) {
    document.getElementById("alphabet").className = "a-z-fixed";
    document.getElementById("scrolling").className = "scrolling-providers";
    document.getElementById("mobile").className = "alphabet-fixed";
  } else {
    document.getElementById("alphabet").className = "";
    document.getElementById("scrolling").className = "";
    document.getElementById("mobile").className = "";
  }
}
