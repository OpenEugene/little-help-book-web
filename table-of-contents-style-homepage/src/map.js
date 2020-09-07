const mymap = L.map('mapid').setView([44.0521,-123.0868], 7);
markers = [];
invalidMarkers = [];

function mapInit() {
	let attribution = '&copy; <a href="https://carto.com/">Carto</a>';
	let tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
		{ attribution });
	tiles.addTo(mymap);
}

function setMarkers(placesArray) {
	removeMarkers();
	for (let i = 0; i < placesArray.length; i++) {
		createMarker(placesArray[i]);
	}
	for (let i = 0; i < markers.length; i++) {
		markers[i].addTo(mymap).bindPopup(generatePopUpHtml(placesArray[i]));
	}
}

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

function createMarker(placeInfo) {
	let la = placeInfo.latitude;
	let lo = placeInfo.longitude;
	if (isValidCoord(la, lo)) {
		let marker = L.marker([placeInfo.latitude,placeInfo.longitude], {draggable: false})
		markers.push(marker);
	}
	else {
		invalidMarkers = [];
		invalidMarkers.push(placeInfo.id);
	}
}

function generatePopUpHtml(placeInfo) {
	return `<h3>${placeInfo.name}</h3>
			<p>${(placeInfo.phone != null) ? placeInfo.phone : "No phone number provided"}</p>
			<p>${(placeInfo.address != null) ? placeInfo.address : "No address provided"}</p>
			<p>${(placeInfo.hours != null) ? "Hours: " + placeInfo.hours : "No hours provided"}</p>`
}

function removeMarkers() {
	markers.forEach(m => {
		mymap.removeLayer(m);
	});
	markers = [];
}

function setView(coordArray, zoom) {
	mymap.setView(coordArray, zoom);
}

mapInit();