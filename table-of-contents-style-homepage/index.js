"use strict"
$(document).ready(function() {
  const Airtable = require('airtable');

  // Read-only key
  const apiKey = "keyMmAL4mVBSORkGc";
  // const base = new Airtable({apiKey: apiKey}).base('appj3UWymNh6FgtGR');
  // Experimental table
  const base = new Airtable({apiKey: apiKey}).base('appLwxkByQzFlBeVo');

  // await has to be inside async function, anonymous in this case
	(async () => {
    const categoryTable = await dalGetCategoryTable(base);
    const catSubcatTable = await dalGetCatSubcatTable(base);
    const placeTable = await dalGetPlaceTable(base);
    console.log(categoryTable);

    const categoryTree = mergeTables(categoryTable, catSubcatTable, placeTable);
    initDomToc(categoryTree);

    // const element = $("#all");
    const element = document.getElementById("all");
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
      initDomAll(categoryTree);
    }
	})()
});

function initDomToc(categoryTree) {
  let html = categoryTree.reduce(function (accum, record) {
    // Create category
    accum += '<div class="category">';
      // <h2 class="category-name h123-reset"><a href="#">Basic Needs</a></h2>
    accum += `<h2 class="category-name h123-reset"><a href="#">${record.Name}</a></h2>`;
    // length 1 means only has "No subcategories" placeholder
    console.log(record.Name, record.Subcategories.length)
    if (record.Subcategories.length != 1) {
      accum += '<div class="subcategory">';
      accum += '<ul>';
      accum += record.Subcategories.reduce(function(accum, record) {
        // Create subcategory
        if (record.Places.length > 0) {
          accum += `<li>${record.Name}</li>`;
        }
        return accum;
        // END - Create subcategory
      }, '');
      accum += '</ul>';
      accum += '</div>'; //subcategory
    }
    accum += '</div>'; //category
    return accum;
    // END - Create category
  }, '');
  // $("#table-of-contents").append(html);
  $("#table-of-contents").prepend(html);

  // Grab the template script
  let theTemplateScript = $("#toc-template").html();
  // Compile the template
  let theTemplate = Handlebars.compile(theTemplateScript);
  // Pass our data to the template
  let theCompiledHtml = theTemplate({categories : categoryTree});
  // console.log(categoryTree);
  // console.log("html:", theCompiledHtml);
  // Add the compiled html to the page
  $('#table-of-contents-handlebars').prepend(theCompiledHtml);
}

function initDomAll(categoryTree) {
  let html = categoryTree.reduce(function (accum, record) {
    accum += `<h3>${record.Name} ${record.NameSpanish}, ${record.Order}, ${record.Subcategories.length}</h3>`;
    accum += record.Subcategories.reduce(function(accum, record) {
      if (record.Places.length > 0) {
        accum += `<p><b>${record.Name} - ${record.NameSpanish}, ${record.Order}, ${record.Places.length}</b></p>`;
        accum += record.Places.reduce(function(accum, record) {
          return accum + `${record.get('Name')}<br>`;
        }, '');
      }
      return accum;
    }, '');
    return accum;
  }, '');
  $("#all").append(html);
}

function mergeTables(categoryTable, catSubcatTable, placeTable) {
  //
  // CATEGORIES
  //
  // Initialize a no-subcategory subcategory bucket for places with no subcategories at index 0.
  let noneSubcategoryRecord;
  categoryTable.forEach(function(record) {
    noneSubcategoryRecord = {'CategoryId' : record.Id, 'SubcategoryId' : undefined, 'Name' : 'No subcategories', 'NameSpanish' : 'No hay subcategorias', 'Order' : 0, 'Places' : []};
    record.Subcategories.push(noneSubcategoryRecord);
  });
  let categoryTree = categoryTable;
  //
  // SUBCATEGORIES
  //
  console.log('*** Processing subcategories');
  // Fold into the Category table
  catSubcatTable.forEach(function(record) {
    let categoryId = record.CategoryId;
    if (categoryId) {
      let subcategoryId = record.SubcategoryId;
      if (subcategoryId) {
        let categoryIndex = categoryTree.findIndex(category => category.Id == categoryId);
        // console.log(categoryIndex, record.Name);
        console.log("pushing", record.CatSubcatName, categoryTree[categoryIndex].Subcategories.length);
        categoryTree[categoryIndex].Subcategories.push(record);
        console.log("  ", categoryTree[categoryIndex].Subcategories.length);
      } else {
        categoryTree[0].Subcategories.CatSubcatId = record.CatSubcatId;
        categoryTree[0].Subcategories.CatSubcatName = record.CatSubcatName;
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });

  //
  // PROVIDERS
  //
  console.log('*** Processing places');
  // Fold into the Category table
  placeTable.forEach(function(record) {
    let categoryId = record.get('Category');
    if (categoryId) {
      let categoryIndex = categoryTree.findIndex(category => category.Id == categoryId);
      if (categoryIndex >= 0) {
        let subcategoryId = record.get('Subcategory');
        if (subcategoryId) {
          let subcategoryIndex = categoryTree[categoryIndex].Subcategories.findIndex(subcategory => subcategory.SubcategoryId == subcategoryId);
          if (subcategoryIndex >= 0) {
            categoryTree[categoryIndex].Subcategories[subcategoryIndex].Places.push(record);
          } else {
            console.log('no subcategory index', record.get('Name'), subcategoryId, "THIS SHOULDN'T OCCUR");
          }
        } else {
          console.log('no subcategory id', record.get('Name'));
          let subcategoryIndex = 0;
          categoryTree[categoryIndex].Subcategories[subcategoryIndex].Places.push(record);
        }
      } else {
        // If no subcategory, throw in the no-subcategory subcategory bucket at index 0
        console.log('no category index', record.get('Name'), "THIS SHOULDN'T OCCUR");
      }
    } else {
      console.log('no category id', record.get('Name'), "THIS SHOULDN'T OCCUR");
    }
  });

  console.log(categoryTree);
  return categoryTree;
}
