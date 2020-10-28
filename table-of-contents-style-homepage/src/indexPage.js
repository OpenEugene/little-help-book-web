let savedHtml;
"use strict"
$(document).ready(function() {
    savedHtml = $('#hardcoded-epilogue').html();
    $('#hardcoded-epilogue').empty();
    initData(false, false, false);
});

// function updateDomToc(categoryTree, savedHtml) {
// function updateDomToc(categoryTree) {
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
