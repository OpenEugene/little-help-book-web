const mymap = L.map('mapid').setView([51.505, -0.09], 13);
markers = [];

function mapInit() {
	let attribution = '&copy; <a href="https://carto.com/">Carto</a>';
	let tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
		{ attribution });
	tiles.addTo(mymap);
}

function setMarkers(placesArray) {
	for (let i = 0; i < placesArray.length; i++) {
		createMarker(placesArray[i]);
	}
	removeMarkers();
	for (let i = 0; i < placesArray.length; i++) {
		mymap.addLayer(markers[i]);
	}
}

function createMarker(placeInfo) {
	if (placeInfo.latitude != 0 || placeInfo.longitude != 0) {
		let marker = new L.marker([placeInfo.latitude,placeInfo.longitude], {draggable: false})
		marker.bindPopUp(generatePopUpHtml(placeInfo));
		marker.on('click', () => {this.openPopUp();})
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