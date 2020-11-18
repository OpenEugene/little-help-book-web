let savedHtml;
"use strict"
$(document).ready(function() {
// <<<<<<< feature/clearDuplicatedCode
    savedHtml = $('#hardcoded-epilogue').html();
    $('#hardcoded-epilogue').empty();
    initData(false, false, false);
// =======
//   // await has to be inside async function, anonymous in this case
//     (async () => {
//         /*
//         Save the hard-coded stuff to prepend later
//         */
//         savedHtml = $('#hardcoded-epilogue').html();
//         $('#hardcoded-epilogue').empty();

//         /*
//         Pull data from Airtable using the dal.js functions.
//         Also, populate additional elements at the top of each list to
//         represent an option to not filter on that item.
//         */
//         cityTable = await dalGetCityTable();
//         cityValue = cityTable[0].id;
//         // cityValue = "";
//         cityTable.splice(0, 0, {id: "NA", name: "Lane County, Oregon"})

//         categoryTable = await dalGetCategoryTable();
//         subcatTable = await dalGetSubcategoryTable();
//         placeTable = await dalGetPlaceTable();
//         nbc = new NavBreadcrumb(cityTable, categoryTable, subcatTable, placeTable);

//         /*
//         Generate and place option element HTML to place into each appropriate
//         select box, based on the data that was passed into our NavBreadcrumb object.
//         */
//         nbc.placeOptionElements("citySelect", nbc.generateOptionElements(nbc.cities));
//         // Assign the appropriate events handlers to the select elements
//         nbc.assignCitySelectEvent(cityboxId, citySelectEvent);

//         catSubcatTable = await dalGetCatSubcatTable();
//         // categoryTree = tocMakeCategoryTree(categoryTable, catSubcatTable, cityValue);

//         document.getElementById(cityboxId).value = cityValue;
//         citySelectEvent();

//         // updateDomToc(categoryTree, savedHtml);
//         // updateDomToc(categoryTree);
//     })()
// >>>>>>> develop
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

//  The popup description appears when someone clicks the blue crisis text 

// let crisis = document.getElementById("crisis");
// crisis.addEventListener("click", crisisPopup);

function crisisPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }