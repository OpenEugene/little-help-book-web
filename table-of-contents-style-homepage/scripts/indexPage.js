let savedHtml;
"use strict"
$(document).ready(function() {
    savedHtml = $('#hardcoded-epilogue').html();
    $('#hardcoded-epilogue').empty();
    initData(false, false, false);
});

function updateDom() {
    let availableCatSubcatIds = [];
    nbc.availablePlaces.forEach(record => {
        record.catSubcatId.forEach(id => {
            if (!availableCatSubcatIds.includes(id)) {
                availableCatSubcatIds.push(id);
            }
        })
    });
    let availableCatSubcats = [];
    catSubcatTable.forEach(record => {
            if (availableCatSubcatIds.includes(record.catSubcatId)) {
                availableCatSubcats.push(record);
            }
    });

    const categoryTree = tocMakeCategoryTree(nbc.availableCategories, availableCatSubcats, nbc.focused.city);
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }

    // Handle the table-of-contents templating
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

    // Handle the alerts templating
    // Grab the template script
    theTemplateScript = $("#alert-template").html();
    // Compile the template
    theTemplate = Handlebars.compile(theTemplateScript);
    // Convert Markdown in note to Html before building template
    let convertedAlerts = convertMarkdown({alerts : nbc.alertTable});
    // Pass our data to the template
    compiledHtml = theTemplate(convertedAlerts);
    // Add the compiled html to the page
    $('#alert-container').empty().append(compiledHtml);
}

// The popup description appears when someone clicks the blue crisis text 
// Not sure why the listener function didn't work, but using the onclick in the html does work 

// let crisis = document.getElementById("crisis");
// crisis.addEventListener("click", crisisPopup);

function crisisPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }


// Showdown Javascript Markdown to HTML converter
// Receives the Alert Table reference and converts the Note from Markdown to Html 
function convertMarkdown(alertTable) {
    // Simplify by selecting alerts from the table
    let alerts = alertTable.alerts;
    // Create the Showdown Converter
    var converter = new showdown.Converter({
        openLinksInNewWindow: true,
    });
    // For each note in alerts
    for (let i = 0; i < alerts.length; i++) {
        // Convert Markdown to HTML
        let html = converter.makeHtml(alerts[i].note);
        // Replace the Markdown note with the HTML Note
        alerts[i].note = html;
    }
    console.log(alertTable);
    return alertTable;
}