"use strict"
$(document).ready(function() {
  console.log('test_airtable');
  const Airtable = require('airtable');

  // Read-only key
  const api_key = "keyMmAL4mVBSORkGc";
  // const base = new Airtable({apiKey: api_key}).base('appj3UWymNh6FgtGR');
  // Experimental table
  const base = new Airtable({apiKey: api_key}).base('appLwxkByQzFlBeVo');

  // await has to be inside async function, anonymous in this case
	(async () => {
    const {category_records, subcategory_records, provider_records} = await get_tables(base)
    const category_data = merge_tables(category_records, subcategory_records, provider_records);
    init_dom_toc(category_data);

    // const element = $("#all"); //document.getElementById("all");
    const element = document.getElementById("all");
    //If it isn't "undefined" and it isn't "null", then it exists.
    if(typeof(element) != 'undefined' && element != null){
      init_dom_all(category_data);
    }
	})()
});

function init_dom_toc(category_data) {
  let html = category_data.reduce(function (accum, record) {
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
        if (record.Providers.length > 0) {
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
  let theCompiledHtml = theTemplate({categories : category_data});
  // console.log(category_data);
  // console.log("html:", theCompiledHtml);
  // Add the compiled html to the page
  $('#table-of-contents-handlebars').prepend(theCompiledHtml);
}

// function init_dom_toc(category_data) {
//   let html = category_data.reduce(function (accum, record) {
//     accum += ` <h2>${record.Name}</h2>`;
//     accum += record.Subcategories.reduce(function(accum, record) {
//       if (record.Providers.length > 0) {
//         accum += `${record.Name}<br>`;
//       }
//       return accum;
//     }, '');
//     return accum;
//   }, '');
//   $("#table-of-contents").append(html);
// }

function init_dom_all(category_data) {
  let html = category_data.reduce(function (accum, record) {
    accum += `<h3>${record.Name} ${record.NameES}, ${record.Order}, ${record.Subcategories.length}</h3>`;
    accum += record.Subcategories.reduce(function(accum, record) {
      if (record.Providers.length > 0) {
        accum += `<p><b>${record.Name} - ${record.NameES}, ${record.Order}, ${record.Providers.length}</b></p>`;
        accum += record.Providers.reduce(function(accum, record) {
          return accum + `${record.get('Name')}<br>`;
        }, '');
      }
      return accum;
    }, '');
    return accum;
  }, '');
  $("#all").append(html);
}

function merge_tables(category_records, subcategory_records, provider_records) {
  //
  // CATEGORIES
  //
  category_records.sort((a, b) => (a.get('Order') - b.get('Order')));
  let category_data = category_records.map(function(record) {
    let category_name = record.get('Name');
    let category_id = record.id;
    // Initialize a no-subcategory subcategory bucket for providers with no subcategories at index 0.
    let none_subcategory_record = {'CategoryID' : category_id, 'SubcategoryID' : undefined, 'Name' : 'No subcategories', 'NameES' : 'No hay subcategorias', 'Order' : 0, 'Providers' : []};
    return {
      // 'ID' : category_id, 'Name' : category_name, 'NameES' : record.get('Name-ES'), 'Order' : record.get('Order'), 'Subcategories' : []
      'ID' : category_id, 'Name' : category_name, 'NameES' : record.get('Name-ES'), 'Order' : record.get('Order'), 'Subcategories' : [none_subcategory_record]
    };
  });

  //
  // SUBCATEGORIES
  //
  console.log('*** Processing subcategories');
  subcategory_records.sort((a, b) => (a.get('Order') - b.get('Order')));
  let subcategory_data = subcategory_records.map(function(record) {
    // console.log('***')
    let cat_subcat_name = record.get('Name');
    let cat_subcat_id = record.id;

    // !!!NOTE misspelling. Correct in table?
    // let category = record.get('Catagory');
    let category_id = record.get('Category');
    if (category_id) {
      category_id = category_id[0];
    } else  {
      console.log('Subcategory', subcategory, 'has no category.', "THIS SHOULDN'T OCCUR");
    }

    let subcategory_id = record.get('Subcategory');
    let subcategory_name;
    let subcategory_name_es;
    if (subcategory_id) {
      subcategory_id = subcategory_id[0];
      subcategory_name = record.get('SubcategoryString');
      subcategory_name_es = record.get('Subcategory-ES')[0];
    } else {
      subcategory_name = 'No subcategories';
      subcategory_name_es = 'No hay subcategorias';
    }
    return {
      'CatSubcatID': cat_subcat_id, 'CatSubcatName': cat_subcat_name, 'CategoryID' : category_id, 'SubcategoryID' : subcategory_id, 'Name' : subcategory_name, 'NameES' : subcategory_name_es, 'Order' : record.get('Order'), 'Providers' : []
    };
  });
  // Fold into the Category table
  subcategory_data.forEach(function(record) {
    let category_id = record.CategoryID;
    if (category_id) {
      let subcategory_id = record.SubcategoryID;
      if (subcategory_id) {
        let category_index = category_data.findIndex(category => category.ID == category_id);
        // console.log(category_index, record.Name);
        console.log("pushing", record.CatSubcatName, category_data[category_index].Subcategories.length);
        category_data[category_index].Subcategories.push(record);
        console.log("  ", category_data[category_index].Subcategories.length);
      } else {
        category_data[0].Subcategories.CatSubcatID = record.CatSubcatID;
        category_data[0].Subcategories.CatSubcatName = record.CatSubcatName;
      }
    } else {
      console.log('no category id', record.Name, "THIS SHOULDN'T OCCUR");
    }
  });

  //
  // PROVIDERS
  //
  console.log('*** Processing providers');
  provider_records.sort(function(a, b){
    if(a.Name < b.Name) { return -1; }
    if(a.Name > b.Name) { return 1; }
    return 0;
  });
  // Fold into the Category table
  provider_records.forEach(function(record) {
    let category_id = record.get('Category');
    // console.log(category_id);
    if (category_id) {
      let category_index = category_data.findIndex(category => category.ID == category_id);
      if (category_index >= 0) {
        let subcategory_id = record.get('Subcategory');
        // let subcategory_id = record.get('SubcategoryOrig');
        if (subcategory_id) {
          // console.log("subcategory_id", subcategory_id);
          let subcategory_index = category_data[category_index].Subcategories.findIndex(subcategory => subcategory.SubcategoryID == subcategory_id);
          // let subcategory_index = category_data[category_index].Subcategories.findIndex(subcategory => subcategory.Name == subcategory_id);
          if (subcategory_index >= 0) {
            category_data[category_index].Subcategories[subcategory_index].Providers.push(record);
          } else {
            console.log('no subcategory index', record.get('Name'), subcategory_id, "THIS SHOULDN'T OCCUR");
          }
        } else {
          console.log('no subcategory id', record.get('Name'));
          let subcategory_index = 0;
          category_data[category_index].Subcategories[subcategory_index].Providers.push(record);
        }
      } else {
        // If no subcategory, throw in the no-subcategory subcategory bucket at index 0
        console.log('no category index', record.get('Name'), "THIS SHOULDN'T OCCUR");
      }
    } else {
      console.log('no category id', record.get('Name'), "THIS SHOULDN'T OCCUR");
    }
  });

  console.log(category_data);
  console.log(subcategory_data);
  return category_data;
}

async function get_tables(base) {
  const category_records = await get_table('Categories', base);
  // const subcategory_records = await get_table('Subcategories', base);
  const subcategory_records = await get_table('CatSubcats', base);
  const provider_records = await get_table('Help Services', base);
  return {category_records, subcategory_records, provider_records};
}

function get_table(tablename, base) {
  return new Promise(function (resolve) {
    let records_buffer = [];
		base(tablename).select({
			// Selecting the first 3 records in Grid view:
			// maxRecords: 3,
			maxRecords: 1000,
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.
			records.forEach(function(record) {
				records_buffer.push(record);
			});
			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();
    }, function done(err) {
			if (err) { console.error(err); return; }
			resolve(records_buffer);
		})
  })
}
