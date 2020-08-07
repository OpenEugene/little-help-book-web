function mapInit() {
	//const airtable = require('airtable');
	//airtable.configure({ endpointUrl: "https://api.airtable.com", apiKey: process.env.api_Key })
	let mymap = L.map('mapid').setView([51.505, -0.09], 13);
	var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
	var tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png", { attribution });
	tiles.addTo(mymap);
}

mapInit();