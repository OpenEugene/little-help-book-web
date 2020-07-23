jQuery(document).ready(function() {
  console.log('test_airtable')

  // Read-only key
	var my_api_key = "keyMmAL4mVBSORkGc";
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: my_api_key}).base('appj3UWymNh6FgtGR');

	base('Help Services').select({
			// Selecting the first 3 records in Grid view:
			maxRecords: 3,
			//maxRecords: 1000,
			view: "Grid view"
	}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.

			records.forEach(function(record) {
					console.log('Retrieved', record.get('Name'));
			});

			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();

	}, function done(err) {
			if (err) { console.error(err); return; }
	});
  console.log('last line')
});
