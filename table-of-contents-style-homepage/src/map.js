/*
This line will find a div element with an id of "mapid" to initialize in to and
set the starting view coordinates to Eugene, Oregon. It also sets the map data
to a variable called "mymap".
*/
const mymap = L.map('mapid').setView([44.0521,-123.0868], 12);
/*
The markers array contains objects that contain the marker (m) and the html for
the popup (text) that appears on the marker when clicked on.
*/
markers = [];
// The invalidMarkers array contains the id of places with invalid lat/long values
invalidMarkers = [];

// This function will add the tileset and attributions to the map in "mymap".
function mapInit() {
	let attribution = '&copy; <a href="https://carto.com/">Carto</a>';
	let tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
		{ attribution });
	tiles.addTo(mymap);
}

// This is the parent function that handles setting markers.
function setMarkers(placesArray) {
	removeMarkers();
	pa = placesArray.filter(x => isValidCoord(x["latitude"], x["longitude"]));
	invalidMarkers = placesArray.filter(x => !isValidCoord(x["latitude"], x["longitude"]));
	for (let i = 0; i < pa.length; i++) {
		createMarker(pa[i]);
	}
	for (let i = 0; i < markers.length; i++) {
		markers[i].m.addTo(mymap).bindPopup(markers[i].text);
	}
}

/*
This function checks to see if a lat/long pair is a valid set of coordinates.
if they are set to 0, have null values, or exceed the values that are
reasonable for placement on the map, they are not valid and returns false.
Otherwise, it returns true.
*/
function isValidCoord(lat, long) {
	if (lat == 0 && long == 0) {
		return false;
	}
	else if (lat == null || long == null) {
		return false;
	}
	else if (lat > 90 || lat < -90) {
		return false;
	}
	else if (long > 180 || long < -180) {
		return false;
	}
	return true;
}

/*
This function adds an object to markers array based on a place object.
This object contains 2 values:
	m - The Leaflet marker object that contains the data needed to create a map
		marker
	text - The html string used by the popup object that's bound to the marker.
		This displays the provider's data when a marker is clicked on.
*/
function createMarker(placeInfo) {
	let la = placeInfo.latitude;
	let lo = placeInfo.longitude;
	let marker = L.marker([la,lo], {draggable: false})
	markers.push({m: marker, text: generatePopUpHtml(placeInfo)});
}

/*
This is the function that generates the html for a marker's popup. This
template can be changed whenever we want to update the design.
*/
function generatePopUpHtml(placeInfo) {
	return `<h3>${placeInfo.name}</h3>
			<p>${(placeInfo.phone != null) ? placeInfo.phone : "No phone number provided"}</p>
			<p>${(placeInfo.address != null) ? placeInfo.address : "No address provided"}</p>
			<p>${(placeInfo.hours != null) ? "Hours: " + placeInfo.hours : "No hours provided"}</p>`
}

/*
This function iterates through the markers array and uses that data to remove
the markers from the map. Don't alter the marker array directly unless you know
what you are doing.
*/
function removeMarkers() {
	markers.forEach(m => {
		mymap.removeLayer(m.m);
	});
	markers = [];
	invalidMarkers = [];
}

// This function is used to set the centered view of the map.
function setView(coordArray, zoom) {
	mymap.setView(coordArray, zoom);
}

mapInit();