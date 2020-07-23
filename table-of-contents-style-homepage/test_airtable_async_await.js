jQuery(document).ready(function() {
  console.log('test_airtable')

  // Read-only key
	var my_api_key = "keyMmAL4mVBSORkGc";
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: my_api_key}).base('appj3UWymNh6FgtGR');

	  var records = [];
	  var helprecords = [];

	  async function getHelpTable() {	
		return new Promise(function (resolve) {
		 base('Help Services').select({
				// Selecting the first 3 records in Grid view:
				maxRecords: 3,
				//maxRecords: 1000,
				view: "Grid view"
			}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.

			records.forEach(function(record) {
					console.log('Retrieved', record.get('Name'));
					helprecords.push(record);
			});

			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();

	}, function done(err) {
			if (err) { console.error(err); return; }
			resolve();
		})})}
		
	  	

	async function sayBye() {
		console.log('help table then ', helprecords.length)
	}

	(async () => { // await has to be inside async function, anonymous in this case
		await getHelpTable() 
		sayBye()
	  })()

  console.log('last line', records.length);
});
