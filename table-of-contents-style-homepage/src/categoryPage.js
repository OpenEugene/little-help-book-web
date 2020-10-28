"use strict"
$(document).ready(initData(true, true, false));

function updateDom() {
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
    let categoryData =  {subcategories : availableCatSubcats};
    document.getElementsByClassName("category-page-name")[0].innerHTML = nbc.categories.find(x => x.id === nbc.focused.category).name;
    if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }
    // Grab the template script
    let theTemplateScript = $("#provider-list-template").html();
    // Compile the template
    let theTemplate = Handlebars.compile(theTemplateScript);
    // Pass our data to the template
    let compiledHtml = theTemplate({subcategories : categoryData.subcategories});
    // Add the compiled html to the page
    $('#provider-list').empty().append(compiledHtml);
}
