const mymap = L.map('mapid').setView([44.0521,-123.0868], 7);
markers = [];

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

function createMarker(placeInfo) {
	let la = placeInfo.latitude;
	let lo = placeInfo.longitude;
	if (la != 0 && la != null && lo != 0 && lo != null) {
		let marker = L.marker([placeInfo.latitude,placeInfo.longitude], {draggable: false})
		markers.push(marker);
	}
}

function generatePopUpHtml(placeInfo) {
	return `<h3>${placeInfo.name}</h3><br />
			<p>${(placeInfo.phone != null) ? placeInfo.phone : "No phone number provided"}</p><br />
			<p>${(placeInfo.address != null) ? placeInfo.address : "No address provided"}</p><br />
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